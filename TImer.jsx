import React, { useState, useEffect } from 'react';

function Timer({ onTick, advancing }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Pause timer if we are currently loading data
    if (advancing) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          onTick();
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTick, advancing]);

  return (
    <div className="card neon-border" style={{ textAlign: 'center', padding: '2rem', width: '250px' }}>
      <h3 style={{margin: 0, fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '2px'}}>SYSTEM TICK</h3>
      <span style={{
        color: advancing ? '#94a3b8' : '#38bdf8', 
        fontSize: '4.5rem', 
        fontWeight: 'bold', 
        display: 'block',
        margin: '0.5rem 0',
        textShadow: advancing ? 'none' : '0 0 20px rgba(56, 189, 248, 0.7)'
      }}>
        {timeLeft}s
      </span>
      <p style={{fontSize: '0.8rem', color: '#475569', margin: 0}}>MONTHLY DATA UPDATE</p>
    </div>
  );
}

export default Timer;