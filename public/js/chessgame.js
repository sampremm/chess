const socket = io(); 
const chess = new Chess(); 
const boardElement = document.querySelector(".chessboard");
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board(); 
    // boardElement.innerHTML = " "; // Ensure the board is cleared before rendering new content
    board.forEach((row, rowIndex) => {

        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square", 
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            ); 
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = " ";
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", function(e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
                boardElement.appendChild(squareElement);

      
            }); 
        });
    });
};

const handleMove = () => {
    constmove={
        from:`${String.fromCharCord(97+source.col)}${8 -source.row})`,
        to:`${String.fromCharCord(97+target.col)}${8 -target.row})`,
        promotion:"q"
    }
};

const getPieceCode = (type) => {
    switch(type) {
        case 'p': return '♙'; // Pawn
        case 'r': return '♖'; // Rook
        case 'n': return '♘'; // Knight
        case 'b': return '♗'; // Bishop
        case 'q': return '♕'; // Queen
        case 'k': return '♔'; // King
        default: return '';
    }
};
socket.on("playerRole",()=>{
    playerRole=role;
    renderBoard()
});
renderBoard();