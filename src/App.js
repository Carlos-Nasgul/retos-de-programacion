import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const createEmptyBoard = () => {
  const rows = 6;
  const cols = 7;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push(new Array(cols).fill(null));
  }
  return board;
};

const App = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ red: 0, yellow: 0 });

  const checkWinner = (board) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal derecha abajo
      [1, -1] // diagonal izquierda abajo
    ];

    const inBounds = (x, y) => x >= 0 && x < 6 && y >= 0 && y < 7;

    const checkDirection = (x, y, dx, dy, player) => {
      let count = 0;
      for (let step = 0; step < 4; step++) {
        const newX = x + step * dx;
        const newY = y + step * dy;
        if (inBounds(newX, newY) && board[newX][newY] === player) {
          count++;
        } else {
          break;
        }
      }
      return count === 4;
    };

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col]) {
          for (let [dx, dy] of directions) {
            if (checkDirection(row, col, dx, dy, board[row][col])) {
              return board[row][col];
            }
          }
        }
      }
    }
    return null;
  };


  const handleCellClick = (col) => {
    if (winner) return;

    const newBoard = board.slice();
    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = isRedTurn ? 'R' : 'Y';
        break;
      }
    }

    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore(prevScore => ({
        ...prevScore,
        [gameWinner === 'R' ? 'red' : 'yellow']: prevScore[gameWinner === 'R' ? 'red' : 'yellow'] + 1
      }));
    } else {
      setIsRedTurn(!isRedTurn);
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setIsRedTurn(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ red: 0, yellow: 0 });
    resetGame();
  };

  return (
    <div className="App">
      <h1>Connect Four</h1>
      <div id='board'>
        <Board board={board} onCellClick={handleCellClick} /></div>
      {winner && <h2>{winner === 'R' ? 'Red' : 'Yellow'} wins!</h2>}
      <div>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={resetScore}>Reset Score</button>
      </div>
      <div>
        <h3 id='score'>Score</h3>
        <p id='players'>Red: {score.red}</p>
        <p id='players'>Yellow: {score.yellow}</p>
      </div>
    </div>
  );
};

export default App;

