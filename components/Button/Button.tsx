import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
    text: string;
    disabled: boolean;
    click: () => void;
}

export const Button: React.FC<IButtonProps> = ({ text, disabled, click}) => {
    const cancel = () => {
        return;
    }
    return (
        <div className={`${styles.button} ${disabled ? styles.disabled : ''}`} onClick={disabled ? cancel : click}>
            {text.toUpperCase()}
        </div>
    );
};