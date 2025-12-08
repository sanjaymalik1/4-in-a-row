"use client"

import { useState } from "react";
import Board from "./components/Board";
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay";
import { checkDraw, checkWinner, initialBoard, placeToken } from "./lib/gameLogic";

export default function page() {
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(initialBoard)
  const [alert, setAlert] = useState("")
  const [isDraw, setIsDraw] = useState(false);

  function handleChance(colNo) {
    setAlert("")
    if (winner || isDraw) return;

    const { newBoard, success } = placeToken(colNo, board, currentPlayer);

    if (!success) {
      setAlert("Invalid move. Try again!");
      return;
    }

    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setWinner(currentPlayer);
      return;
    }

    if(checkDraw(newBoard)){
      setIsDraw(true)
      return;
    }

    setCurrentPlayer(currentPlayer === "A" ? "B" : "A");
  }

  return (
    <div className='h-screen w-screen bg-gray-950 text-white flex flex-col items-center'>
      <h1 className="mt-10 text-5xl font-bold tracking-wider">4 In A Row</h1>
      {
        winner && <h2 className="text-2xl font-bold tracking-wide mt-12">Player {winner} wins!</h2>
      }
      {
        isDraw && <h2 className="text-2xl font-bold tracking-wide mt-12">Match Drawn!</h2>
      }
      <div className="flex-1 mt-6 w-full flex justify-center relative">

        <div className="w-144 h-122 self-end">
          <Board board={board} />
        </div>
        {
          !isDraw && !winner && currentPlayer === "A" && <CurrentPlayerDisplay player={"A"} color={"red"} handleChance={handleChance} alert={alert} />
        }
        {
          !isDraw && !winner && currentPlayer === "B" && <CurrentPlayerDisplay player={"B"} color={"yellow"} handleChance={handleChance} alert={alert} />
        }
      </div>
    </div>
  )
}
