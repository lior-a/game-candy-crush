import { useState, useEffect } from 'react';

const GAME_TIME = 5;

const ClockCounter = ({setIsGamerOver}) => {
    const [seconds, setSeconds] = useState(GAME_TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);

        // console.log('sec: ' , seconds);

        if(seconds <= 0) {
            setIsGamerOver(true);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div className="clock-counter">
            <h2>Time: {seconds}</h2>
        </div>
    )
}

export default ClockCounter;