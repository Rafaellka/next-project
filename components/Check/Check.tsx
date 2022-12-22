import React from 'react';
import styles from './Check.module.scss';

interface IRadioProps {
    checked: boolean;
    disabled: boolean;
}


export const Check: React.FC<IRadioProps> = ({checked, disabled}) => {
    return (
        <div className={`${styles.checkbox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}></div>
    );
};
