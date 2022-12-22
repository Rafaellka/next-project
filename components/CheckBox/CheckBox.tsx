import React, {useState} from 'react';
import {Check} from "../Check/Check";
import styles from './CheckBox.module.scss';
import {useAppAction} from "../../hooks/redux";
import {store} from "../../store/store";

interface ITextProps {
    text: string;
    disabled: boolean;
    index: number;
}

export const CheckBox: React.FC<ITextProps> = ({text, disabled, index}) => {
    const [checked, setChecked] = useState(false);
    const {selectAnswer} = useAppAction();

    const click = () => {
        if (!disabled) {
            setChecked(!checked);
            selectAnswer({index, checked: !checked});
        }
    };

    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ''}`} onClick={click}>
            <Check checked={store.getState().answers[index]} disabled={disabled} />
            <div className={styles.unselectable}>{text}</div>
        </div>
    );
};