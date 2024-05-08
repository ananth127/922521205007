import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async (numberId) => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(response.data);
    } catch (error) {
      setError('Error fetching data from server');
    }
  };

  return (
    <div>
      <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
      <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
      <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
      <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>
      
      {error && <p>{error}</p>}
      
      {response && (
        <div>
          <h2>Window Prev State:</h2>
          <pre>{JSON.stringify(response.windowPrevState)}</pre>
          <h2>Window Curr State:</h2>
          <pre>{JSON.stringify(response.windowCurrState)}</pre>
          <h2>Numbers:</h2>
          <pre>{JSON.stringify(response.numbers)}</pre>
          <h2>Average:</h2>
          <p>{response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
