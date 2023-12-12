import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [cityNames, setCityNames] = useState('');
  const [temperatures, setTemperatures] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/weather/temperatures',
       { cities: cityNames.split(',') });
      setTemperatures(response.data);
    } catch (error) {
      console.error('Error fetching temperatures:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Temperature Fetcher</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Enter comma-separated US city names:</label>
          <input
            type="text"
            className="form-control"
            value={cityNames}
            onChange={(e) => setCityNames(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Fetch Temperatures
        </button>
      </form>
      <div className="mt-4">
        <h3>Temperatures:</h3>
        <ul className="list-unstyled">
          {temperatures.map((temp, index) => (
            <li key={index} className="mb-2">{temp.city} : {temp.temperature}°C</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
