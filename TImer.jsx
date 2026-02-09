import React, { useState, useEffect } from 'react';

function Timer({ onTick }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // 1. Decrease timer every second
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        // 2. Check if we need to advance the month
        if (prevTime <= 1) {
          onTick(); // Advance month
          return 60; // Reset timer for next month
        }
        return prevTime - 1;
      });
    }, 1000);

    // 3. Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [onTick]); // Only re-run if onTick changes

  return (
    <div className="card timer-container" style={{ textAlign: 'center' }}>
      <h3>Next Month In: <span style={{color: '#8b5cf6', fontSize: '1.2em'}}>{timeLeft}s</span></h3>
    </div>
  );
}

export default Timer;
