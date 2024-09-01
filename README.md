
# Chess.com

## Overview

This project is a real-time multiplayer chess game developed using Node.js, Socket.IO, and Chess.js. The game allows two players to play chess online with real-time updates. Features include drag-and-drop functionality for moving chess pieces, a board that can be flipped for different player perspectives, and support for spectators.

### Key Features

- **Real-Time Multiplayer**: Play chess with another player in real-time using Socket.IO.
- **Drag-and-Drop**: Move pieces on the chessboard using drag-and-drop.
- **Board Flipping**: The chessboard flips to show the black player's perspective.
- **Chess Logic**: Basic chess rules and move validation using Chess.js.
- **Spectator Support**: Additional players can watch the game as spectators.

## Installation

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) and npm (Node Package Manager).

### Setup

1. **Clone the Repository**

   Open your terminal and clone the repository:

   ```bash
   git clone <repository-url>
   cd chess-game
   ```

2. **Install Dependencies**

   Install the required npm packages:

   ```bash
   npm install
   ```

3. **Start the Server**

   Launch the server:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

1. **Accessing the Game**

   Open your web browser and navigate to `http://localhost:3000`.

2. **Playing the Game**

   - The first player to connect will be assigned the white pieces.
   - The second player to connect will be assigned the black pieces.
   - Additional players will join as spectators and can observe the game.
   - Players can drag and drop pieces to make moves on the board.
   - The chessboard will automatically flip to show the perspective of the black player.

3. **Game Interface**

   - **Chessboard**: Displays the game board with alternating light and dark squares.
   - **Pieces**: Represented by chess symbols; draggable for movement.
   - **Flipping**: The board flips based on the player’s role.

## File Structure

- `index.ejs`: The main HTML template that renders the game interface.
- `public/css/style.css`: Contains styles for the chessboard and pieces.
- `public/js/chessgame.js`: JavaScript file handling game logic and interactions.
- `server.js`: Node.js server handling game logic, socket connections, and serving static files.

## Technologies Used

- **Node.js**: JavaScript runtime used for the server-side logic.
- **Express.js**: Web framework for building the server and handling requests.
- **Socket.IO**: Library for real-time, bidirectional communication between the server and clients.
- **Chess.js**: Library for chess game logic and move validation.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

## Contributing

Contributions are welcome! To contribute to this project:
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your modifications and test them thoroughly.
4. Submit a pull request with a description of your changes.

