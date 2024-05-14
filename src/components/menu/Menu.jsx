import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="container">
      <nav>
        <ul className="mcd-menu">
          {/* <li>
            <Link to="/">
              <i className="fa fa-home"></i>
              <strong>Home</strong>
              <small>sweet home</small>
            </Link>
          </li>
          <li>
            <Link to="/about" className="active">
              <i className="fa fa-edit"></i>
              <strong>About us</strong>
              <small>sweet home</small>
            </Link>
          </li> */}
          <li>
            <Link to="/tools">
              <i className="fa fa-home"></i>
              <strong>Ruckus Converters</strong>
              <small>BSSID Mac2WiredMac</small>
            </Link>
          </li>

          <li>
            <Link to="/tools2">
              <i className="fa fa-home"></i>
              <strong>Aruba WLC</strong>
              <small>Command Generator</small>
            </Link>
           
          </li>


          <li>
          <Link to="/tools3">
              <i className="fa fa-home"></i>
              <strong>Rucku Switch</strong>
              <small>Command Generator Vlan 104to101</small>
            </Link>
          </li>

          
          <li>
          <Link to="/tools4">
              <i className="fa fa-home"></i>
              <strong>Aruba LLDP2Name</strong>
              <small>lldp to int name</small>
            </Link>
          </li>
          {/* <li>
            <Link to="/devices">
              <i className="fa fa-comments-o"></i>
              <strong>Device's</strong>
              <small>All about us</small>
            </Link>
          
            <ul>
              <li>
                <Link to="create-device">
                  <i className="fa fa-globe"></i>Create Device
                </Link>
              </li>
              <li>
                <Link to="create-brand">
                  <i className="fa fa-globe"></i>Create Brand
                </Link>
              </li>
            </ul>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
