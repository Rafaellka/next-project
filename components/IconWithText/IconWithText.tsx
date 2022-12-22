import React from 'react';
import styles from './IconWithText.module.scss';

interface Props {
    text: string;
    iconUrl: string;
}

export const IconWithText: React.FC<Props> = ({text, iconUrl}) => {
    return (
        <div className={styles.container}>
            <img src={iconUrl}/>

            <div className={styles.text}>{text}</div>
        </div>
    );
};