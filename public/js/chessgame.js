const socket = io(); 
const chess=new Chess();
const boardElement=document.querySelector(".chessboard")

let draggedpiece =null;
let sourceSquare=null;
let playerRole=null;

const renderBoard=()=>{
    const board=chess.boad();
    
};
const handleMove=()=>{};
const getPieceCode=()=>{};