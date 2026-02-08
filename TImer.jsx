import React, { useEffect } from "react";

function Timer({ onTick }) {
  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <div>Time Accelerating... (1 minute = 1 month)</div>;
}

export default Timer;
