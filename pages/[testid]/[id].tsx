import {NextPage} from "next";
import styles from "./[id].module.scss";
import {IconWithText} from "../../components/IconWithText/IconWithText";
import {CheckBox} from "../../components/CheckBox/CheckBox";
import {Button} from "../../components/Button/Button";
import {useEffect, useState, FC} from "react";
import {ITest} from "../index";
import {useRouter} from "next/router";
import {getTest} from "../api/test";
import {Timer} from "../../components/Timer/Timer";
import {useAppAction} from "../../hooks/redux";
import {store} from "../../store/store";

//Чтобы посмотреть реализацию через fetch, раскомментируйте useState и useEffect
//Также закомментите getServerSideProps и вместо 13 строки вставьте это: const Test: NextPage = () => {
const Test: FC<{ test: ITest }> = ({test}) => {
    //const [test, setTest] = useState<ITest>();
    const {reset, addAnswer, changeAnswer} = useAppAction();
    const router = useRouter();
    const testid = Number(router.query.testid);
    const id = Number(router.query.id) - 1;

    const goToNextPage = async () => {
        const answer = {
            id,
            userAnswers: store.getState().answers,
            answers: test.questions[id].answers
        };

        !store.getState()
            .testResult
            .filter(question => question.id === id)
            .length
            ? addAnswer(answer)
            : changeAnswer(answer);

        reset();
        await router.push(`/${testid}/${id + 2}`);
    }

    const skip = async () => {
        reset();
        if (id + 1 >= test.questions.length) {
            await router.push(`/${testid}/${1}`);
        } else {
            await router.push(`/${testid}/${id + 2}`);
        }
    }

    const getResults = async () => {
        const answer = {
            id,
            userAnswers: store.getState().answers,
            answers: test.questions[id].answers
        };

        addAnswer(answer);
        reset();
        await router.push('/result');
    }

    /*useEffect(() => {
        const loadTest = async () => {

            const data = await fetch(`http://localhost:3000/api/test?testid=${testid}`);
            const test = await data.json() as ITest;
            setTest(test);
        };
        if (!isNaN(testid)) {
            loadTest();
        }
    }, [testid]);


    if (!test || !router.query.id || !router.query.testid) {
        return <div>Загрузка</div>
    }*/

    return (
        <div className={styles.container}>
            <div className={styles.questionsList}>
                <div className={styles.back}/>
                {test.questions?.map((q, index) =>
                    <div
                        onClick={() => router.push(`/${testid}/${index + 1}`)}
                        className={`${styles.question} ${styles.skipped}`} key={index}>
                        {index + 1}
                    </div>)}
            </div>
            <div className={styles.questionInfo}>
                <div className={styles.header}>
                    <div className={styles.icons}>
                        <IconWithText text={`${id + 1}/${test.questions.length}`} iconUrl={'/question.svg'}/>
                        <IconWithText text={`60:00`} iconUrl={'/hours.svg'}/>
                    </div>
                    <div className={styles.text}>{test.testName}</div>
                    <img src={'/logo.svg'} style={{alignSelf: "flex-end"}}/>
                </div>
                <div className={styles.timerContainer}>
                    <Timer startTime={test.time}/>
                </div>
                <div className={styles.main}>
                    <div className={styles.questionText}>
                        {test.questions[id].title}
                    </div>
                    <div className={styles.answers}>
                        {test.questions[id].answers.map((answer, index) =>
                            <CheckBox
                                text={answer.text}
                                disabled={false}
                                key={index}
                                index={index}
                            />)}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            text={'Ответить'}
                            disabled={false}
                            click={store.getState().testResult.length !== test.questions.length - 1
                                ? goToNextPage
                                : getResults
                            }/>
                        <Button text={'Пропустить'} disabled={false} click={skip}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;

export async function getServerSideProps(context: any) {
    const {params} = context;
    const test = await getTest(Number(params.testid));
    return {
        props: {
            test
        }
    }
}
