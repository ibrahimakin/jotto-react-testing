import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <div data-test="error-message" className={`error ${error ? '' : 'hidden'}`}>
        Error: the counter cannot go below 0
      </div>
      <button
        data-test="increment-button"
        onClick={() => { if (error) { setError(false); } setCount(count + 1) }}>
        Increment counter
      </button>
      <button
        data-test="decrement-button"
        onClick={() => { if (count > 0) { setCount(count - 1) } else { setError(true) } }}>
        Decrement counter
      </button>
    </div>
  );
}

export default App;
