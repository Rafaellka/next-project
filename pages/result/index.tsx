import React, {useEffect, useState} from 'react';
import {store} from "../../store/store";
import {IAnswer} from "../index";

const Result = () => {
    let count = 0;

    const checkAnswers = (answers: IAnswer[], userAnswers: boolean[]) => {
        let isRightAnswer = true;
        answers.forEach((answer, index) => {
            if (answer.isRight !== userAnswers[index])
                isRightAnswer = false;
            if (isRightAnswer && answers.length - 1 === index)
                count++;
        })
        return isRightAnswer ? 'Правильно' : 'Ошибка';
    }

    useEffect( () => {
        const sendToDatabase = async () => {
            await fetch('http://localhost:3000/api/send', {
                method: 'POST',
                body: JSON.stringify(store.getState().testResult)
            })
        }
        sendToDatabase()
    }, []);
    return (
        <>
            {store.getState().testResult.map(
                (q, index) =>
                        <div key={index}>
                            {q.id + 1}: {checkAnswers(q.answers, q.userAnswers)}
                        </div>
            )}
            <div>Правильных ответов: {count}/{store.getState().testResult.length}</div>
        </>
    );
};

export default Result;