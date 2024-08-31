const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app); 
const io = socket(server);

const chess = new Chess();
  
let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (uniquesocket)=>{
    console.log("connected")

    if(!players.white){
        players.white=uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    }
    else if(!players.black){
        players.black=uniquesocket.id;
        uniquesocket.emit("playerRple","b");
    }
    else{
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect",()=>{
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if(uniquesocket.id === players.black){
            delete players.black;
        }
    });
    uniquesocket.on("move",(move)=>{
        try {
            if(chess.turn() === "w"& uniquesocket.id!==players.white)return;
            if(chess.turn() === "b"& uniquesocket.id!==players.white)return;  
            
            const result=chess.move(move);
            if(result){
                currentPlayer=chess.turn();
                io.emit("move",move);
                io.emit("bordstate",chess.fen()); 
                
            }    
            else{
                console.log("Invalid move:", move);
                uniquesocket.emit("invalidmove",move); 
            }
        }catch(error){
            console.log(err);
            uniquesocket.emit("Invalid move:", move);
        }
    })
});

server.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
