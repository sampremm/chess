const socket = io(); 

socket.emit("game");
socket.on("connectiontoall", ()=>{
    console.log("connectedtoallXD")
})