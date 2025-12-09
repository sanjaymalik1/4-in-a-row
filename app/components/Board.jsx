"use client"
import React, { useState } from 'react'
import { initialBoard } from '../lib/gameLogic';

export default function Board({board}) {

    return (
        <div className='h-full w-full bg-gray-800 rounded-2xl md:rounded-3xl 2xl:rounded-t-4xl pt-1 px-1 md:pt-1.5 md:px-1.5 2xl:pt-2 2xl:px-2'>
            <div className='grid grid-cols-7 grid-rows-6'>
                {board.map((row, rowId) =>
                    row.map((cell, cellId) => (
                        <div key={`${rowId}-${cellId}`} className='w-10 h-10 md:w-14 md:h-14 2xl:w-20 2xl:h-20 flex items-center justify-center'>
                            <div className={`${cell === "A" && "bg-red-700"} ${cell=== "B" &&  "bg-yellow-500"} bg-gray-950 md:w-12 md:h-12 2xl:w-18 2xl:h-18 w-8 h-8 border rounded-full`}>
                        </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}
