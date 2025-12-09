"use client"

import { useEffect, useState } from "react";
import Board from "./components/Board";
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay";
import { checkDraw, checkWinner, initialBoard, placeToken } from "./lib/gameLogic";
import { RotateCcw } from 'lucide-react';

export default function page() {
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(initialBoard)
  const [alert, setAlert] = useState("")
  const [isDraw, setIsDraw] = useState(false);


  useEffect(() => {
    const savedBoard = JSON.parse(localStorage.getItem("board"))
    const savedPlayer = localStorage.getItem("currentPlayer")
    const savedWinner = localStorage.getItem("winner")
    const savedIsDraw = JSON.stringify(localStorage.getItem("isDraw"))

    if (savedBoard) {
      setBoard(savedBoard)
    }
    if (savedPlayer) {
      setCurrentPlayer(savedPlayer)
    }
    if (savedWinner === "A" || savedWinner === "B") {
      setWinner(savedWinner)
    }
    if (savedIsDraw === true) {
      setIsDraw(true);
    }

  }, [])


  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board))
    localStorage.setItem("currentPlayer", currentPlayer)
    localStorage.setItem("winner", winner)
    localStorage.setItem("isDraw",JSON.stringify(isDraw))

  }, [board, currentPlayer, winner,isDraw])



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

    if (checkDraw(newBoard)) {
      setIsDraw(true)
      return;
    }

    setCurrentPlayer(currentPlayer === "A" ? "B" : "A");
  }

  function restartGame() {
    setBoard(initialBoard);
    setCurrentPlayer("A");
    setWinner(null);
    setIsDraw(false);
    setAlert("");
  }

  return (
    <div className='h-dvh sm:min-h-screen w-screen bg-gray-950 text-white flex flex-col items-center overflow-hidden'>
      <h1 className=" mt-6 text-3xl sm:mt-10 sm:text-5xl font-bold tracking-wider">4 In A Row</h1>
      {
        winner && <h2 className="text-xl sm:text-2xl font-bold tracking-wide sm:mt-12 mt-8">Player {winner} wins!</h2>
      }
      {
        isDraw && <h2 className="text-xl sm:text-2xl font-bold tracking-wide sm:mt-12 mt-8">Match Drawn!</h2>
      }
      <div className="flex-1 mt-6 w-full flex justify-center relative">

        <div className="sm:w-144 sm:h-122 w-72 h-61 self-end mb-2 sm:mb-0">
          <Board board={board} />
        </div>
        {
          !isDraw && !winner && currentPlayer === "A" && <CurrentPlayerDisplay player={"A"} color={"red"} handleChance={handleChance} alert={alert} setAlert={setAlert} />
        }
        {
          !isDraw && !winner && currentPlayer === "B" && <CurrentPlayerDisplay player={"B"} color={"yellow"} handleChance={handleChance} alert={alert} setAlert={setAlert} />
        }
        <button
          onClick={restartGame}
          className="hidden sm:block absolute bottom-12 left-8 bg-gray-200 text-red-700 font-bold px-4 py-2 rounded cursor-pointer hover:bg-gray-400">
          Restart Game
        </button>

        
          
      </div>
      <button onClick={restartGame}
          className="block sm:hidden absolute top-6 left-4 text-red-700 bg-gray-200 p-2 rounded-md cursor-pointer">
            <RotateCcw />
        </button>
    </div>
  )
}
