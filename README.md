# Terminal-Based Battleship Game

## Description
This project is a terminal-based implementation of the classic Battleship game. Players can enjoy a strategic naval warfare game right in their terminal, where the objective is to sink the opponent's ships before they sink yours.

## Features
- Play Battleship in the terminal.
- Manage game state and player data using Redis.
- Interactive user interface using command-line prompts.

## Prerequisites
- Node.js
- npm (Node package manager)
- Docker
- Redis

## Installation
1. Clone the repository:
   git clone [repository-url]
2. Run Redis on docker ``docker run --name redis-container -p 6379:6379 -d redis``
3. Install dependencies `` npm install ``
4. Run the project ``npm run dev ``

## Gameplay
Each player places their ships on the game board.
Players take turns to guess the coordinates of the opponent's ships.
The game continues until all ships of one player are sunk.
