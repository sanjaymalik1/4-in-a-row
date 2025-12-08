"use client"

import { useState } from "react";
import Board from "./components/Board";

export default function page() {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return (
    <div className='h-screen w-screen bg-gray-950 text-white flex flex-col items-center'>
      <h1 className="mt-10 text-5xl font-bold tracking-wider">4 In A Row</h1>
      <div className="border border-white flex-1 mt-6 w-full flex justify-center">
        <div className="w-144 h-122 self-end">
          <Board/>
        </div>
      </div>
    </div>
  )
}
