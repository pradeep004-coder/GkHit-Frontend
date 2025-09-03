"use client";
import React, { useEffect, useState } from "react";

const Leaderboard = ({name}) => {
    const [leaderboard, setLeaderboard] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8222/")
            .then(response => response.json())
            .then(data => {
                console.log("data: ", data, typeof (data));
                setLeaderboard(Array.isArray(data) ? data : [data]);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, [])


    return (
        <div className="text-white max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            <table className="w-full border-collapse text-center">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Duration</th>
                        <th className="border p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && leaderboard.map((entry, index) => (
                        <tr
                            key={index}
                            className={`${index === 0
                                ? "bg-yellow-900 font-semibold" // highlight 1st rank
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{entry.name + (entry.name===name && " (you)")}</td>
                            <td className="border p-2">{entry.duration}</td>
                            <td className="border p-2">{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <div className="text-center bg-gray-800">Loading...</div>}
            {!isLoading && !leaderboard.length && <div className="text-center bg-gray-800">Could not load Leaderboard!!!</div>}
        </div>
    );
};

export default Leaderboard;
