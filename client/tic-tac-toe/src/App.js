import React, { useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';
import { PlayButton } from "./components/PlayButton";
import agente1API from "./APIS/agente1API";
import agente2API from "./APIS/agente2API";

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = async () => {
    if (gameOver) return;

    let response = null;
    try {
      if (xPlaying) {
        let res = await agente1API.get('/');
        if (board[res.data.position] === null) {
          response = res.data.position;
        } else {
          res = await agente1API.get('/');
        }
      } else {
        let res = await agente2API.get('/');
        if (board[res.data.position] === null) {
          response = res.data.position;
        } else {
          res = await agente2API.get('/');
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }

    const updatedBoard = board.map((value, idx) => {
      if (idx === response) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    const checkWinner = (board) => {
      for (let i = 0; i < WIN_CONDITIONS.length; i++) {
        const [x, y, z] = WIN_CONDITIONS[i];
        if (board[x] && board[x] === board[y] && board[y] === board[z]) {
          return board[x];
        }
      }
      return null;
    };

    const winner = checkWinner(updatedBoard);

    if (winner) {
      setGameOver(true);
      if (winner === "O") {
        setScores((prevScores) => ({ ...prevScores, oScore: prevScores.oScore + 1 }));
      } else {
        setScores((prevScores) => ({ ...prevScores, xScore: prevScores.xScore + 1 }));
      }
    } else {
      setXPlaying(!xPlaying);
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <PlayButton play={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
};

export default App;