import React, { useState } from 'react';

function SwitchConfigurator() {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const generateCommands = () => {
    const lines = input.split('\n');
    const interfaces = lines.filter(line => line.trim() !== '').map(line => 'e ' + line.split(/\s+/)[0]);
    const interfaceList = interfaces.join(' ');

    const vlan104Command = `vlan 104\nno untagged ${interfaceList}\nexit\n`;
    const vlan101Command = `vlan 101\nno tagged ${interfaceList}\nuntagged ${interfaceList}\nexit\n`;
    const interfaceCommand = `int ${interfaceList}\nno inline power\ninline power\nexit\n`;

    setCommands(`${vlan104Command}\n${vlan101Command}\n${interfaceCommand}`);
  };

  const handleDoubleClick = async () => {
    try {
      await navigator.clipboard.writeText(commands);
      setCopySuccess('Commands copied!');
    } catch (err) {
      setCopySuccess('Failed to copy commands.');
    }
    setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <textarea className="form-control" value={input} onChange={handleInputChange} rows="10" placeholder="Paste your interface list here..."></textarea>
          <button className="btn btn-primary mt-3" onClick={generateCommands}>Generate Commands</button>
        </div>
        <div className="col-md-6">
          <h5>Generated Commands:</h5>
          <pre className="bg-light p-3 border" style={{ cursor: 'copy' }} onDoubleClick={handleDoubleClick}>{commands}</pre>
          {copySuccess && <div className="alert alert-success mt-2">{copySuccess}</div>}
        </div>
      </div>
    </div>
  );
}

export default SwitchConfigurator;
