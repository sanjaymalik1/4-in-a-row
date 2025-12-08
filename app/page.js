"use client"

import { useState } from "react";
import Board from "./components/Board";
import CurrentPlayerDisplay from "./components/CurrentPlayerDisplay";
import { checkWinner, initialBoard, placeToken } from "./lib/gameLogic";

export default function page() {
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(initialBoard)

  function handleChance(colNo){
    if(winner) return;

    const {newBoard,success} = placeToken(colNo,board,currentPlayer);

    if(!success){
      alert("invalid move");
      return;
    }

    setBoard(newBoard);

    if(checkWinner(newBoard)){
      setWinner(currentPlayer);
      return;
    }

    setCurrentPlayer(currentPlayer === "A" ? "B" : "A");
  }

  return (
    <div className='h-screen w-screen bg-gray-950 text-white flex flex-col items-center'>
      <h1 className="mt-10 text-5xl font-bold tracking-wider">4 In A Row</h1>
      <div className="border border-white flex-1 mt-6 w-full flex justify-center relative">
        <div className="w-144 h-122 self-end">
          <Board board={board} />
        </div>
        {
          currentPlayer === "A" && <CurrentPlayerDisplay player={"A"} color={"red"} handleChance={handleChance}/>
        }
        {
          currentPlayer === "B" && <CurrentPlayerDisplay player={"B"} color={"yellow"} handleChance={handleChance}/>
        }
      </div>
    </div>
  )
}
