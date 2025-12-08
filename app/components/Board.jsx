"use client"
import React, { useState } from 'react'
import { initialBoard } from '../lib/gameLogic';

export default function Board({board}) {

    return (
        <div className='h-full w-full bg-gray-800 rounded-t-4xl pt-2 px-2'>
            <div className='grid grid-cols-7 grid-rows-6'>
                {board.map((row, rowId) =>
                    row.map((cell, cellId) => (
                        <div key={`${rowId}-${cellId}`} className='w-20 h-20 flex items-center justify-center'>
                            <div className='bg-gray-950 w-18 h-18 border rounded-full'>
                            {cell}
                        </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}
