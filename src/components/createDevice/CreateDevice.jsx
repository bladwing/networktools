// CreateDevice.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createdevice.scss";
import { api } from "../../utils/api";
import Modal from "./Modal";


const CreateDevice = () => {
  const [formData, setFormData] = useState({
    deviceBrand: "",
    deviceModel: "",
    deviceOS: "",
    deviceType: "",
  });
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(api + "Brand.php");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    
    if (name === "deviceBrand" && value === "Create Brand") {
      handleModalOpen();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(api + "createDevice.php", formData);
      console.log(response.data);
      alert("Form submitted successfully!");
      setTimeout(() => {
        navigate("/devices");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCreateBrand = async () => {
    try {
      setShowModal(false);
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  const deviceTypes = ["Switch", "Router", "Wireless Controller"];

  return (
    <>
      <h2>Create Device</h2>

      <form onSubmit={handleSubmit} className="mt-3 device-container">
        <div className="mb-3">
          <label htmlFor="deviceBrand" className="form-label">
            Device Brand:
          </label>
          <div className="input-group">
            <select
              className="form-control"
              id="deviceBrand"
              name="deviceBrand"
              value={formData.deviceBrand}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
              <option value="Create Brand">Create Brand</option>
            </select>
            <span className="input-group-text">
              <i className="bi bi-box"></i>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="deviceType" className="form-label">
            Device Type:
          </label>
          <div className="input-group">
            <select
              className="form-control"
              id="deviceType"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {deviceTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="input-group-text">
              <i className="bi bi-gear"></i>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="deviceModel" className="form-label">
            Device Model:
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="deviceModel"
              name="deviceModel"
              value={formData.deviceModel}
              onChange={handleChange}
            />
            <span className="input-group-text">
              <i className="bi bi-laptop"></i>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="deviceOS" className="form-label">
            Device OS:
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="deviceOS"
              name="deviceOS"
              value={formData.deviceOS}
              onChange={handleChange}
            />
            <span className="input-group-text">
              <i className="bi bi-cpu"></i>
            </span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Modal for creating a new brand */}
      <Modal show={showModal} handleClose={handleModalClose}>
        <h3>Create Brand</h3>
        <input
          type="text"
          placeholder="Brand Name"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
        />
        <button onClick={handleCreateBrand}>Create Brand</button>
      </Modal>
    </>
  );
};

export default CreateDevice;
