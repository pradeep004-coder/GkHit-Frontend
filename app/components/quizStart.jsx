import React from 'react';
import { useState } from 'react';

export default function QuizStart({ handleStart, setName }) {
    const [isNameOk, setIsNameOk] = useState(false);
    const nameRegex = /^[a-zA-Z\s']{4,}$/;

    const handleNameChange = (e) => {
        const value = e.target.value.trim()
        const capitalizedValue = value
            .split(" ")
            .map(item => item.charAt(0).toUpperCase() + item.slice(1))
            .join(" ")

        setName(capitalizedValue)
        if (nameRegex.test(value) && value.length >= 4 && !value.includes("  ")) {
            setIsNameOk(true);
        }
        else {
            setIsNameOk(false);
        }
    };
    return (
        <div className='h-[90vh] flex flex-col items-center gap-5'>
            <h2 className='text-white mt-10 text-8xl font-bold'>GkHit</h2>
            <div className='flex flex-col'>
                <input type='text' placeholder='enter your name...' onChange={handleNameChange} className='border border-zinc-200 text-white text-2xl p-2 rounded-lg' />
                {!isNameOk && (
                    <p className="text-zinc-400 text-sm">
                        Enter your real name (it will appear on leaderboard if you score well).
                    </p>
                )}
            </div>
            {isNameOk && <button className='px-3 py-1 rounded-2xl bg-green-700 text-white font-bold bigSmall' onClick={handleStart}>START</button>}
        </div>
    )
}