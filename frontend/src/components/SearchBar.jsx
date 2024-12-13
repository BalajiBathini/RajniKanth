import React, { useState } from 'react';
import ResultArea from './ResultArea'; // Import ResultArea component

const SearchBar = ({ queryInput, onInputChange, onSubmitQuery }) => {
  // State to store the API response
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the request is made
    try {
      // Call the API with a POST request
      const response = await fetch('http://127.0.0.1:5000/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryInput, // Send queryInput as the query parameter
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data); // Store the response data in the state
    } catch (error) {
      console.error('There was an error!', error);
      setResponseData({ error: 'There was an error fetching the response.' });
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }

    // Optionally call the onSubmitQuery handler passed as a prop
    if (onSubmitQuery) {
      onSubmitQuery(queryInput);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={queryInput}
        placeholder="Ask me anything..."
        onChange={onInputChange} // Changed to onChange
      />
      <button onClick={handleSubmit} disabled={loading}>Ask Bhaskhar</button>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Pass the responseData to ResultArea component */}
      <ResultArea resultText={responseData} />
    </div>
  );
};

export default SearchBar;
