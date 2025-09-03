
import React from 'react';
import { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import QuizStart from './quizStart';
import QuizEnd from './quizEnd';
import Leaderboard from './Leaderboard';

export default function QuizBody() {

    const [num, setNum] = useState(0);  //  question number
    const [skipState, setSkipState] = useState(false); // is next button ready to work
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selectedQs, setSelectedQs] = useState([]); // set of 10 random numbers for questions
    const [scoreArr, setScoreArr] = useState([]);
    const [selectedOpt, setSelectedOpt] = useState("");
    const [startQuiz, setStartQuiz] = useState(false) // actives onclick on start button
    const [Name, setName] = useState("");
    const [startTime, setStartTime] = useState(null);
    const quizObj = quizQuestions[selectedQs[num < 10 ? num : 9]];

    useEffect(() => {
        fetch('/quizQuestions.json')
            .then(response => response.json())
            .then((data) => {
                setQuizQuestions(data);
                let tempQSet = new Set([]);
                let totalQuestions = data.length;

                for (let i = 0; tempQSet.size < 10; i++) {
                    tempQSet.add(Math.floor(Math.random() * totalQuestions));
                }
                setSelectedQs([...tempQSet]);
            })
    }, []);

    useEffect(() => {
        console.log(`now num is `, num);
    }, [num]);
    if (num === 10) console.log("num is 10 now");

    const handleStart = () => {
        setStartQuiz(true);
        setStartTime(Date.now());
    };

    const optClick = (evt) => {
        setSkipState(true);
        setSelectedOpt(evt.target.textContent.substring(3).trim());
    };


    const nxtClick = () => {
        if (skipState) {
            setScoreArr(prev => [...prev, selectedOpt === quizObj.answer ? 1 : 0]);
            setSkipState(false);
            setSelectedOpt("");
            setTimeout(() => {
                setNum(prev => prev + 1);
            });
        }
    };
    const prevClick = () => {
        if (num > 0) {
            setSelectedOpt("");
            setNum(num - 1);
            setSkipState(false);
            setScoreArr(scoreArr.slice(0, -1))
        }
    };

    if (quizQuestions.length === 0 || selectedQs.length === 0 ||  (num < 10 && selectedQs[num] === undefined)) {
        return <div className='mt-8 text-white text-5xl text-center'>Error 404!!</div>;
    }
    return (
        <>
            {!startQuiz && <QuizStart handleStart={handleStart} setName={setName} />}
            {startQuiz && num <= 9 && <QuizCard
                QNo={num + 1}
                quizObj={quizObj}
                selectedOpt={selectedOpt}
                skipState={skipState}
                optClick={optClick}
                nxtClick={nxtClick}
                prevClick={prevClick}
            />}
            {num === 10 && <>
                <QuizEnd score={scoreArr.filter(item => item === 1).length} name={Name} duration={Number((Date.now() - startTime) / 1000)} />
                <Leaderboard name={Name}/>
            </>}
        </>
    );
}