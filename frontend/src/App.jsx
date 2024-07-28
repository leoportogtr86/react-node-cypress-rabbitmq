import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [testName, setTestName] = useState('');
  const [testUrl, setTestUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/tests', {
      name: testName,
      url: testUrl
    });
  };

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Nome do Teste"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
          />
          <input
              type="text"
              placeholder="URL do Teste"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
          />
          <button type="submit">Cadastrar Teste</button>
        </form>
      </div>
  );
}

export default App;
