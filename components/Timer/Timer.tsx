import React, {useEffect, useState} from 'react';
import styles from './Timer.module.scss';

interface ITimerProps {
    startTime: number;
}

const getPadTime = (time: number) => time.toString().padStart(2, '0');

export const Timer: React.FC<ITimerProps> = ({startTime}) => {
    const [timeLeft, setTimeLeft] = useState(startTime);
    const minutes = getPadTime(Math.floor(timeLeft / 60));
    const seconds = getPadTime(timeLeft - Math.floor(timeLeft / 60) * 60);

    const getTimeFraction = () => {
        if (timeLeft <= 1) {
            return 0;
        }
        const rawTimeFraction = timeLeft / startTime;

        return rawTimeFraction - (1 / startTime) * (1 - rawTimeFraction);
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0);
        }, 1000);
        console.log(timeLeft)
        return () => {
            clearInterval(timerInterval)
        }
    }, [timeLeft]);

    return (
        <div className={styles.baseTimer}>
            <svg className={styles.baseTimerSvg} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <g className={styles.baseTimerCircle}>
                    <circle
                        className={styles.baseTimerPathElapsed}
                        cx={60}
                        cy={60}
                        r={58}
                        style={{strokeDasharray: `${364 * getTimeFraction()} 364`}}
                    />
                </g>
            </svg>
            <span className={styles.text}>{minutes}:{seconds}</span>
        </div>
    );
};