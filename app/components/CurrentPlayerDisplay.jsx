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
        <div className={`absolute md:top-12 md:left-1/2 md:-translate-x-1/2 xl:top-18 xl:left-auto xl:translate-x-0 xl:right-6 md:w-80 xl:w-92 flex flex-col items-center border border-gray-500 md:rounded-xl xl:rounded-2xl md:py-8 xl:py-8 w-68 py-8 top-16 rounded-xl`}>
            <h2 style={{ color: color }} className='text-lg md:text-xl xl:text-2xl tracking-wide'>Player {player}'s Chance</h2>

            <div className='hidden md:hidden xl:flex xl:items-center'>
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
            <span className=' mt-2 md:mt-4 xl:mt-6 text-gray-400'><span className='hidden md:hidden xl:inline'>or </span>choose column no. from</span>
            <div className="relative flex gap-3 md:gap-4 md:mt-5 xl:mt-6 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className="text-base md:w-7 md:h-7 xl:w-8 xl:h-8 w-6 h-6 md:text-sm xl:text-sm rounded-sm border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-black"
                        onClick={() => handleChance(num - 1)}>
                        {num}
                    </div>
                ))}
            </div>
            <span className='absolute bottom-1 mt-4 md:mt-5 xl:mt-6 text-red-700'>{alert}</span>
        </div>
    )
}
