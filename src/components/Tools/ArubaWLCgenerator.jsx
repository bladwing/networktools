import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ArubaApRename from "./ArubaApRename"
import "./wc.scss"

function ArubaWLCgenerator() {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState([]);
  const [useColons, setUseColons] = useState(true);
  const [commandType, setCommandType] = useState('modify');
  const [selectedGroup, setSelectedGroup] = useState('ROOM');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatMacAddress = (mac, useColons) => {
    if (!mac) return '';
    const regexPattern = useColons ? /(.{1,2})/g : /(.{1,4})/g;
    const match = mac.toUpperCase().match(regexPattern);
    return match ? match.join(useColons ? ':' : '') : '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const auditTrailCommand = "show audit-trail 1";
    const lines = input.split('\n');
    const newCommands = lines
      .filter(line => line.trim() !== '')
      .map((line) => {
        const [apName, mac] = line.split('\t').map(item => item.trim());
        const formattedMac = formatMacAddress(mac, useColons);
        if (!formattedMac) return '';
        const commandAction = commandType === 'add' ? 'add' : 'modify';
        return `whitelist-db cpsec ${commandAction} mac-address ${formattedMac} ap-name ${apName} ap-group ${selectedGroup} ${commandType === 'add' ? '' : 'state approved-ready-for-cert'}\n${auditTrailCommand}`;
      })
      .filter(command => command !== '');

    setCommands(newCommands);
  };

  const isLargeScreen = windowWidth >= 768;

  return (
    <div className={`container mt-3 ${isLargeScreen ? '' : 'px-2'}`} >


      <form onSubmit={handleSubmit} className='interface-container'>
<div className='Input'>
        <div className="mb-3">
          <label htmlFor="inputTextArea" className="form-label">
            Input (AP name and MAC address pairs, separated by a newline):
          </label>
          <textarea
            id="inputTextArea"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={isLargeScreen ? "10" : "5"}
          />
        </div>

        </div>

        <div className='Input-Switcher'>
        <div className="mb-3 form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="formatSwitch"
            checked={useColons}
            onChange={(e) => setUseColons(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="formatSwitch">
            Format MAC Address with colons
          </label>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="commandTypeOptions"
              id="modifyOption"
              value="modify"
              checked={commandType === 'modify'}
              onChange={(e) => setCommandType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="modifyOption">
              MODIFY Command
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="commandTypeOptions"
              id="addOption"
              value="add"
              checked={commandType === 'add'}
              onChange={(e) => setCommandType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="addOption">
              ADD Command
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="groupSelect" className="form-label">Select Group:</label>
          <select
            id="groupSelect"
            style={{width: "100px"}}
            className="form-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="BOH">BOH</option>
            <option value="CONFERENCE">CONFERENCE</option>
            <option value="ROOM">ROOM</option>
            <option value="PUBLIC">PUBLIC</option>
          </select>
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Generate Commands</button>
      </form>
      {commands.length > 0 && (
        <div className="mt-3">
          <p>Commands:</p>
          <pre>{commands.join('\n')}</pre>
        </div>
      )}
    </div>
  );

}




export default ArubaWLCgenerator;
