import React, { useEffect } from 'react';

export default function QuizEnd({ name, score, duration, totalQ = 10 }) {

    useEffect(() => {
        console.log("duration: ", duration, "score: ", score);
        fetch("http://localhost:8222/",{ method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name, score, duration}) })
            .catch(error => {
                console.error(error);
            })
    },[])


    return (
        <div className="flex justify-center mt-5">
            <div
                className="w-full max-w-lg bg-zinc-900 rounded-2xl shadow-lg p-8 text-center"
            >
                <h2 className="text-4xl font-bold text-white underline mb-6">Result!</h2>

                <div className="text-2xl text-white mb-3">
                    Total Questions: {totalQ}
                </div>

                <div className="text-2xl text-green-400 mb-3">
                    Correct Answers: {score}
                </div>

                <div className="text-2xl text-red-400">
                    Wrong Answers: {totalQ - score}
                </div>

                <div className="text-lg text-white mb-3">
                    You took {duration}s to complete this round
                </div>
            </div>
        </div>
    );
}
