import type {NextPage} from 'next';
import styles from '../styles/Home.module.scss';
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {Check} from "../components/Check/Check";
import {CheckBox} from "../components/CheckBox/CheckBox";
import {Button} from "../components/Button/Button";

export interface ITest {
    testid: number;
    time: number;
    testName: string;
    questions: IQuestion[];
}

export interface IQuestion {
    title?: string;
    time?: number;
    type?: string;
    answers: IAnswer[];
}

export interface IAnswer {
    text: string;
    isRight?: boolean;
}

const Home: NextPage = () => {
    const router = useRouter();

    /*useEffect(() => {
       router.push('/1/1')
    }, []);*/

    return (
        <div className={styles.container}>
            <Check checked={false} disabled={false} />
            <Check checked={true} disabled={false} />
            <CheckBox text={'123'} disabled={false} index={1} questionId={1} />
            <Button text={'text'} disabled={false} click={() => {}} />
            <Button text={'text'} disabled={true} click={() => {}} />
        </div>

    )
}

export default Home
