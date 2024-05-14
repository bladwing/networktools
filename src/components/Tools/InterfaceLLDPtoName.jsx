import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommandGenerator = () => {
  const [inputList, setInputList] = useState('');
  const [commands, setCommands] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [mode, setMode] = useState('commands'); // 'commands', 'names', or 'extract'

  const handleInputChange = (e) => {
    setInputList(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setCommands([]);
    setCopyMessage('');
  };

  const generateOutput = () => {
    const lines = inputList.split('\n');
    const newOutput = lines.map((line) => {
      const parts = line.split('|').map(part => part.trim());
      if (mode === 'commands' || mode === 'names') {
        if (parts.length < 2) {
          return null;
        }
        const intPart = parts[0].trim();
        const nameParts = parts[1].split(/\s{2,}/);
        const namePart = nameParts[nameParts.length - 1].trim();
        if (mode === 'commands') {
          return `int ${intPart}\nname ${namePart}\nexit`;
        } else if (mode === 'names') {
          return namePart;
        }
      } else if (mode === 'extract') {
        const nameMatch = line.match(/^name\s+(.+)$/);
        if (nameMatch) {
          return nameMatch[1].trim();
        }
      }
      return null;
    }).filter(output => output !== null);
    setCommands(newOutput);
    setCopyMessage('');
  };

  const handleDoubleClick = (e) => {
    const text = e.target.innerText;
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Text is copied');
      setTimeout(() => setCopyMessage(''), 2000); // Clear the message after 2 seconds
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Command Generator</h1>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="inputList" className="form-label">Enter your list here:</label>
          <textarea
            id="inputList"
            className="form-control"
            rows="10"
            value={inputList}
            onChange={handleInputChange}
            placeholder="Enter your list here..."
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="mode" className="form-label">Select Mode:</label>
          <select id="mode" className="form-select" value={mode} onChange={handleModeChange}>
            <option value="commands">Generate Commands</option>
            <option value="names">Extract Names</option>
            <option value="extract">Extract from Commands</option>
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-primary" onClick={generateOutput}>Generate Output</button>
        </div>
      </div>
      <h2>Generated Output:</h2>
      {copyMessage && <div className="alert alert-success">{copyMessage}</div>}
      <pre 
        className="bg-light p-3 rounded"
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }}
      >
        {commands.join(mode === 'commands' ? '\n\n' : '\n')}
      </pre>
    </div>
  );
};

export default CommandGenerator;
