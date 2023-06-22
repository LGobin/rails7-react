import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom'

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <h1>Counter: {count}</h1>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Counter />, document.getElementById('counter'))
})

export default Counter;
