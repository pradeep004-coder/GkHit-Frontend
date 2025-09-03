import React from 'react';

export default function QuizCard({ quizObj, QNo, selectedOpt, skipState, optClick, prevClick, nxtClick }) {
  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-6">
        
        {/* Question Number */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-white">
            Question: {QNo} of 10
          </p>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h5 className="text-xl font-bold text-white">{quizObj.quest}</h5>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-6">
          {quizObj.options.map((opt, index) => (
            <button
              key={index}
              onClick={optClick}
              className={`w-full px-4 py-2 text-left rounded-lg ${selectedOpt === opt? 'bg-zinc-500':'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-all`}
            >
              {String.fromCharCode(97 + index)}) {opt} 
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevClick}
            disabled={QNo === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              QNo === 1
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-green-900 text-white hover:bg-green-700"
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nxtClick}
            className={`px-4 py-2 rounded-lg font-semibold ${skipState ? 'bg-green-900 text-white hover:bg-green-700' : 'bg-gray-500 text-gray-300 cursor-not-allowed'} transition`}
          >
            {QNo < 10 ? "Next" : "See Result"}
          </button>
        </div>
      </div>
    </div>
  );
}
