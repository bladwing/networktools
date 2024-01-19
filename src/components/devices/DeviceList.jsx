import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../utils/api';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch devices
    axios.get(api + 'createDevice.php')
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, []);

  const handleDelete = (deviceId) => {
    // Make a DELETE request to delete a device
    axios.delete(api + `createDevice.php?id=${deviceId}`)
      .then(response => {
        // Update the devices state after successful deletion
        setDevices(devices.filter(device => device.id !== deviceId));
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error deleting device:', error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Device List</h2>
      {devices.length === 0 ? (
        <p>No devices found....</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
            <th scope="col">Device Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Device</th>
              <th scope="col">OS</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr key={device.id}>
                <td>{device.deviceType}</td>
                <td>{device.deviceBrand}</td>
                <td>{device.deviceModel}</td>
                <td>{device.deviceOS}</td>
                <td>
                  <button onClick={() => handleDelete(device.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeviceList;
