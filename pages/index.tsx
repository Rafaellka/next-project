import type {NextPage} from 'next';
import styles from '../styles/Home.module.scss';
import React from "react";
import {Check} from "../components/Check/Check";
import {CheckBox} from "../components/CheckBox/CheckBox";

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
    isRight: boolean;
}

const Home: NextPage = () => {

    return (
        <div className={styles.container}>
        </div>

    )
}

export default Home
