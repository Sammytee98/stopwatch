import React, { useState, useEffect, useRef}  from 'react'
import ButtonLists from './ButtonLists';

const Stopwatch = () => {
    const [isRunning, setIsRunning]  = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    let intervalIdRef = useRef(null);
    let startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning) {
            // Start interval  to update elapsed time every 10ms
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        else{
            // Clear interval when not running
            clearInterval(intervalIdRef.current)
        }
        // Cleanup function to clear intrval when component unmounts
        return () => clearInterval(intervalIdRef.current)
    }, [isRunning]); // Runs when 'isRunning' state changes 

    // Start button handler
    const start = () => {
        setIsRunning(true);
        // Adjust start time to keep elapsed time accurate on resume
        startTimeRef.current = Date.now() - elapsedTime;        
    }

    // Stop button handler
    const stop = () => {
        setIsRunning(false)
    }

    // Reset button handler
    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // Format elapsed time to HH:MM:SS.ms format
    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000 % 60);
        let ms = Math.floor((elapsedTime % 1000) / 10);

        // Ensure double digits for consistency (e.g., 01 instead of 1)
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        ms = String(ms).padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}:${ms}`
    }

    return (
    <div className='watch-container'>
        <span>{formatTime()}</span>
        <ButtonLists 
            start={start}
            stop={stop}
            reset={reset}
        />        
    </div>
    )
}

export default Stopwatch;