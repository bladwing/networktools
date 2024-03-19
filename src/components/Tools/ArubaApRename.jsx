import React, { useState } from 'react';

function formatMacAddress(macAddress) {
  if (!macAddress) return ''; // Handle empty input
  return macAddress.match(/.{1,2}/g).join(':');
}

function ArubaApRename() {
  const [values, setValues] = useState('');
  const [commands, setCommands] = useState([]);

  const handleInputChange = (event) => {
    setValues(event.target.value);
  };

  const generateCommands = () => {
    const lines = values.split('\n');
    const generatedCommands = lines.map((line) => {
      const [apName, macAddress] = line.split('\t');
      if (!apName || !macAddress) return ''; // Handle improperly formatted line
      const formattedMacAddress = formatMacAddress(macAddress);
      return `ap-rename wired-mac ${formattedMacAddress} ${apName}`;
    }).filter(command => command); // Remove empty commands
    setCommands(generatedCommands);
  };

  return (
    <div>
      <textarea
        placeholder="Enter values in the format: AP_NAME MAC_ADDRESS"
        value={values}
        onChange={handleInputChange}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={generateCommands}>Generate Commands</button>
      <br />
      <h2>Generated Commands:</h2>
      <pre>{commands.join('\n')}</pre>
    </div>
  );
}

export default ArubaApRename;


