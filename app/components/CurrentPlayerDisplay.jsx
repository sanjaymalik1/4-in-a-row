import React, { useState } from 'react'

export default function CurrentPlayerDisplay({ player, color, handleChance, alert, setAlert }) {
    const [inputValue, setInputValue] = useState("")

    function handleSubmit() {
        const colNo = parseInt(inputValue) - 1;
        if (!isNaN(colNo) && colNo >= 0 && colNo < 7) {
            handleChance(colNo);
        }
        setInputValue("");
    }

    return (
        <div className={`absolute sm:top-18 sm:right-6 sm:w-sm flex flex-col items-center border border-gray-500 sm:rounded-2xl sm:py-8 sm:pb-22  w-68 py-4 pb-12 top-16 rounded-xl`}>
            <h2 style={{ color: color }} className='text-lg sm:text-2xl tracking-wide'>Player {player}'s Chance</h2>

            <div className='hidden sm:flex sm:items-center'>
                <input type="number" min={1} max={7}
                    placeholder='Enter column no. (1-7)'
                    className='w-48 p-2 mt-12 rounded border border-white'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }} />

                <button className=" mt-12 ml-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 cursor-pointer"
                    onClick={handleSubmit}>
                    Enter
                </button>
            </div>
            <span className=' mt-2 sm:mt-6 text-gray-400'><span className='hidden sm:inline'>or </span>choose column no. from</span>
            <div className="flex gap-3 sm:mt-6 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className="text-base sm:w-8 sm:h-8 w-6 h-6 sm:text-sm rounded-sm border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-black"
                        onClick={() => handleChance(num - 1)}>
                        {num}
                    </div>
                ))}
            </div>
            <span className='mt-4 sm:mt-6 text-red-700'>{alert}</span>
        </div>
    )
}
