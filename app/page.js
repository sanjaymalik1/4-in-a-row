"use client"

import { useEffect, useState } from "react";
import Board from "./components/Board";
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay";
import { checkDraw, checkWinner, initialBoard, placeToken } from "./lib/gameLogic";

export default function page() {
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(initialBoard)
  const [alert, setAlert] = useState("")
  const [isDraw, setIsDraw] = useState(false);

  useEffect(()=>{
    localStorage.setItem("board",JSON.stringify(board))
    localStorage.setItem("currentPlayer",JSON.stringify(currentPlayer))
    localStorage.setItem("winner",JSON.stringify(winner))
    localStorage.setItem("isDraw",isDraw)

  },[board,currentPlayer,winner,isDraw])


  useEffect(()=>{
    const savedBoard = JSON.parse(localStorage.getItem("board"))
    const savedPlayer = JSON.parse(localStorage.getItem("currentPlayer"))
    const savedWinner = JSON.parse(localStorage.getItem("winner"))
    const savedIsDraw = JSON.parse(localStorage.getItem("isDraw"))

    if(savedBoard){
      setBoard(savedBoard)
    }
    if(savedPlayer){
      setCurrentPlayer(savedPlayer)
    }
    if(savedWinner){
      setWinner(savedWinner)
    }
    if(savedIsDraw){
      setIsDraw(savedIsDraw)
    }
    
  },[])


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
          !isDraw && !winner && currentPlayer === "A" && <CurrentPlayerDisplay player={"A"} color={"red"} handleChance={handleChance} alert={alert} setAlert={setAlert} />
        }
        {
          !isDraw && !winner && currentPlayer === "B" && <CurrentPlayerDisplay player={"B"} color={"yellow"} handleChance={handleChance} alert={alert} setAlert={setAlert} />
        }
        <button
          onClick={restartGame}
          className="absolute bottom-12 left-8 bg-gray-200 text-red-700 font-bold px-4 py-2 rounded cursor-pointer hover:bg-gray-400">
          Restart Game
        </button>

      </div>
    </div>
  )
}
