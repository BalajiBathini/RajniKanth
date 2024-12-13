import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [queryInput, setQueryInput] = useState('');
  const [resultText, setResultText] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryInput }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResultText(data.response || 'No response from API');
    } catch (error) {
      console.error('Error:', error);
      setResultText('Error fetching response');
    }
  };

  return (
    <div className="container text-center mt-5 p-4 bg-dark text-white rounded">
  <h1 className="display-4 mb-4" >
    Rajinikanth's Wisdom
  </h1>
  <p className="lead text-warning mb-4">
    "En vazhi thani vazhi" - Ask your questions and walk the unique path of knowledge!
  </p>
  <div className="mb-3 ">
    <input
      type="text"
      className="form-control form-control-lg"
      value={queryInput}
      onChange={(e) => setQueryInput(e.target.value)}
      placeholder="Enter your question"
    />
  </div>
  <button
    onClick={handleSubmit}
    className="btn btn-warning btn-lg px-5 mt-5 text-center shadow"
    style={{ fontWeight: 'bold' }}
  >
    Ask
  </button>
  <div className="result mt-4">
    {resultText && (
      <p className="text-light p-3 border border-warning rounded" style={{ fontStyle: 'italic' }}>
        {resultText}
      </p>
    )}
  </div>
</div>

  );
};

export default App;
