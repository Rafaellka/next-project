import React, {FC, useEffect} from 'react';
import {store} from "../../store/store";
import {IAnswer, ITest} from "../index";
import styles from './result.module.scss';
import {getTestWithAnswers} from "../api/test";


const Result: FC<{ test: ITest }> = ({test}) => {
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

    useEffect(() => {
        const sendToDatabase = async () => {
            await fetch('http://localhost:3000/api/send', {
                method: 'POST',
                body: JSON.stringify(store.getState().testResult)
            })
        }
        sendToDatabase()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.name}>{test.testName}</div>
            {store.getState().testResult.map(
                (q, index) =>
                    <div key={index}>
                        {q.id + 1}: {checkAnswers(test.questions[index].answers, q.userAnswers)}
                    </div>
            )}
            <div>Правильных ответов: {count}/{store.getState().testResult.length}</div>
        </div>
    );
};

export default Result;

export async function getServerSideProps(context: any) {
    const {query} = context;
    const test = await getTestWithAnswers(Number(query.testid));
    console.log(test)
    return {
        props: {
            test
        }
    }
}