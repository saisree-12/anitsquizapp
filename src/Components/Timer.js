import React, { useState, useEffect } from 'react';

function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(props.minutes * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h1>00:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
    </div>
  );
}

export default Timer;
