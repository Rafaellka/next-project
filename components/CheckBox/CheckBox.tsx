import React, {useEffect, useState} from 'react';
import {Check} from "../Check/Check";
import styles from './CheckBox.module.scss';
import {useAppAction} from "../../hooks/redux";
import {store} from "../../store/store";

interface ITextProps {
    text: string;
    disabled: boolean;
    index: number;
    questionId: number;
}

export const CheckBox: React.FC<ITextProps> = ({text, disabled, index, questionId}) => {
    const [checked, setChecked] = useState(false);
    const {selectAnswer} = useAppAction();

    const click = () => {
        if (!disabled) {
            const state = store.getState().answers[index];
            setChecked(!checked);
            selectAnswer({index, checked: !state});
        }
    };

    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ''}`} onClick={click}>
            <Check checked={store.getState().testResult.find(elem => elem.id === questionId)
                //@ts-ignore
                ? store.getState().testResult.find(elem => elem.id === questionId).userAnswers[index]
                : store.getState().answers[index]} disabled={disabled} />
            <div className={styles.unselectable}>{text}</div>
        </div>
    );
};