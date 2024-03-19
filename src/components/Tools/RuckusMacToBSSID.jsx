import React, { useState, useEffect } from 'react';

const RuckusMacToBSSID = () => {
  const [macAddress, setMacAddress] = useState('');
  const [bssids24, setBssids24] = useState([]);
  const [bssids5, setBssids5] = useState([]);
  const [copiedMessage, setCopiedMessage] = useState('');

  useEffect(() => {
    const convertMacToBssids = (mac) => {
      // Splitting the MAC address into octets
      const octets = mac.split(':');
      
      // Converting the last octet to hexadecimal
      let lastOctet = parseInt(octets[5], 16);
      
      // Creating BSSIDs based on the pattern for 2.4GHz
      const bssids24 = [];
      for (let i = 0; i < 4; i++) {
        // Incrementing the last octet by 8
        lastOctet += 8;
        // Pushing the modified MAC address into the array
        bssids24.push(`${octets.slice(0, 5).join(':')}:${(lastOctet % 256).toString(16).toUpperCase().padStart(2, '0')}`);
      }
      
      // Resetting the last octet for the 5GHz BSSIDs
      lastOctet = parseInt(octets[5], 16);
      
      // Creating BSSIDs based on the pattern for 5GHz
      const bssids5 = [];
      for (let i = 0; i < 4; i++) {
        // Incrementing the last octet by 9
        lastOctet += 9;
        // Pushing the modified MAC address into the array
        bssids5.push(`${octets.slice(0, 5).join(':')}:${(lastOctet % 256).toString(16).toUpperCase().padStart(2, '0')}`);
      }
    
      return { bssids24, bssids5 };
    };
    
    
    if (macAddress) {
      const { bssids24, bssids5 } = convertMacToBssids(macAddress);
      setBssids24(bssids24);
      setBssids5(bssids5);
    } else {
      setBssids24([]);
      setBssids5([]);
    }
  }, [macAddress]);

  const handleInputChange = (event) => {
    setMacAddress(event.target.value);
  };

  const handleDoubleClick = (bssid) => {
    const lastFourDigits = bssid.slice(-5);
    navigator.clipboard.writeText(lastFourDigits);
    setCopiedMessage('MAC copied');
    setTimeout(() => {
      setCopiedMessage('');
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>

<div style={{margin: "10px, auto", width: "300px", minHeight: "200px"}}>
<label>
        Enter MAC Address:
        <input
          type="text"
          value={macAddress}
          onChange={handleInputChange}
          placeholder="e.g., 8C:7A:15:03:57:A0"
        />
      </label>
      <div>
        <h2>2.4GHz BSSIDs:</h2>
        <ul>
          {bssids24.map((bssid, index) => (
            <li key={index} onDoubleClick={() => handleDoubleClick(bssid)}>{bssid}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>5GHz BSSIDs:</h2>
        <ul>
          {bssids5.map((bssid, index) => (
            <li key={index} onDoubleClick={() => handleDoubleClick(bssid)}>{bssid}</li>
          ))}
        </ul>
      </div>
      {copiedMessage && <p>{copiedMessage}</p>}
    </div>



      <div>
      <p>
  You can determine the Access Point (AP) advertising the Basic Service Set Identifiers (BSSIDs) seen based on the MAC addresses.
  BSSIDs vary according to the advertising AP radio and MAC address. The BSSIDs are generated based on the AP’s base MAC Address.
</p>
<p>
  For example, if the base MAC of an AP is 00:01:02:03:04:50 (note: the last 4 bits of the last octet are always 0 in a base MAC), 
  the BSSIDs of the first radio (2.4G) are as follows:
</p>
<ul>
  <li>00:01:02:03:04:58 (0x50 + 0x8)</li>
  <li>00:01:02:43:04:58</li>
  <li>00:01:02:83:04:58</li>
  <li>00:01:02:c3:04:58</li>
  <li>00:01:02:03:04:59 (0x50 + 0x9)</li>
  <li>00:01:02:43:04:59</li>
  <li>00:01:02:83:04:59</li>
  <li>00:01:02:c3:04:59</li>
</ul>
<p>
  And the BSSIDs for the second radio (5G) are:
</p>
<ul>
  <li>00:01:02:03:04:5c (0x50 + 0xc)</li>
  <li>00:01:02:43:04:5c</li>
  <li>00:01:02:83:04:5c</li>
  <li>00:01:02:c3:04:5c</li>
  <li>00:01:02:03:04:5d (0x50 + 0xd)</li>
  <li>00:01:02:43:04:5d</li>
  <li>00:01:02:83:04:5d</li>
  <li>00:01:02:c3:04:5d</li>
</ul>
<p>
  Note the bits change in the 4th octet. The bit format of the 4th octet in the base MAC is always 00xxxxxx.
</p>
<p>
  For Ethernet MAC addresses, they are (Base MAC +3) to (Base MAC +7).
</p>
      </div>
    </div>
  );
};

export default RuckusMacToBSSID;
