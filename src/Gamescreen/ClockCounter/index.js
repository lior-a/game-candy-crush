import { useState, useEffect } from 'react';

const GAME_TIME = 10000;

const ClockCounter = ({gameOver}) => {
    const [seconds, setSeconds] = useState(GAME_TIME);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);


        if(seconds <= 0) {
            gameOver();
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