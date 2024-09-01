const socket = io(); 
const chess = new Chess(); 
const boardElement = document.querySelector(".chessboard");
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board(); 
    boardElement.innerHTML = ""; // Clear board before rendering

    board.forEach((row, rowIndex) => {
        row.forEach((square, colIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square", 
                (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
            ); 
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = colIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerHTML = getPieceCode(square.type);

                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: colIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q"
    };

    // Send move to server or update game state locally
    console.log("Move:", move);

    // Update chess.js board state
    const result = chess.move(move);
    if (result) {
        renderBoard(); // Update board after move
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

// Assuming socket.io emits "playerRole" event with the role (w or b)
socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

// Initial board rendering
renderBoard();
