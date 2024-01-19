import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../utils/api';

const BrandForm = () => {
  const [brandName, setBrandName] = useState('');

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make Axios POST request to PHP backend
      const response = await axios.post(api + 'Brand.php', {
        deviceBrand: brandName,
      });

      console.log(response.data); // Log the response from the PHP server
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Brand Name:
        <input
          type="text"
          value={brandName}
          onChange={handleBrandNameChange}
        />
      </label>
      <button type="submit">Create Brand</button>
    </form>
  );
};

export default BrandForm;
