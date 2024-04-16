import React, { useState } from 'react';

function RuckusSwitchIntConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const generateCommands = () => {
    const lines = input.split('\n');
    const interfaces = lines.map(line => {
      const parts = line.trim().split(/\s+/);
      return 'e ' + parts[0]; // assuming the interface identifier is always the first part
    });

    const interfacesString = interfaces.join(','); // Remove space after comma for each interface

    const baseVlan = `int vlan 104\nno untagged ${interfacesString}\nexit\n`;
    const targetVlan = `int vlan 101\nno tagged ${interfacesString}\nuntagged ${interfacesString}\n`;

    setOutput(baseVlan + targetVlan);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Ruckus Switch Interface Converter</h1>
      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control"
            value={input}
            onChange={handleInputChange}
            placeholder="Paste your interface list here..."
            rows="10"
          ></textarea>
        </div>
        <div className="col-md-6">
          <pre className="bg-light p-3 border rounded">{output}</pre>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={generateCommands}>Generate Commands</button>
    </div>
  );
}

export default RuckusSwitchIntConverter;
