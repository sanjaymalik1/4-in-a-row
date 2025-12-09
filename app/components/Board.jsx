"use client"
import React, { useState } from 'react'
import { initialBoard } from '../lib/gameLogic';

export default function Board({board}) {

    return (
        <div className='h-full w-full bg-gray-800 rounded-2xl sm:rounded-t-4xl pt-1 px-1 sm:pt-2 sm:px-2'>
            <div className='grid grid-cols-7 grid-rows-6'>
                {board.map((row, rowId) =>
                    row.map((cell, cellId) => (
                        <div key={`${rowId}-${cellId}`} className='w-10 h-10 sm:w-20 sm:h-20 flex items-center justify-center'>
                            <div className={`${cell === "A" && "bg-red-700"} ${cell=== "B" &&  "bg-yellow-500"} bg-gray-950 sm:w-18 sm:h-18 w-8 h-8 border rounded-full`}>
                        </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}
