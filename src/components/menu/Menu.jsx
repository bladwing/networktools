import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./menu.scss";

const Menu = () => {
  return (
    <div className="container">
      <nav>
        <ul className="mcd-menu">
          <li>
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
          </li>
          <li>
            <Link to="/tools">
              <i className="fa fa-home"></i>
              <strong>Tools</strong>
              <small>Converters</small>
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
            <Link to="/devices">
              <i className="fa fa-comments-o"></i>
              <strong>Device's</strong>
              <small>All about us</small>
            </Link>
            {/* <li>
              
              <Link to="/blog/rewards">
                <i className="fa fa-trophy"></i>Rewards
              </Link>
            </li>
            <li>
              <Link to="/blog/certificates">
                <i className="fa fa-certificate"></i>Certificates
              </Link>
            </li> */}
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
         
              {/* <li>
                <Link to="/blog/team">
                <i className="fa fa-globe"></i>Create Brand
                </Link>
                <ul>
                  <li>
                    <Link to="/blog/team/leyla">
                      <i className="fa fa-female"></i>Leyla Sparks
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/team/gleb">
                      <i className="fa fa-male"></i>Gleb Ismailov
                    </Link>
                    <ul>
                      <li>
                        <Link to="/blog/team/gleb/about">
                          <i className="fa fa-leaf"></i>About
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog/team/gleb/skills">
                          <i className="fa fa-tasks"></i>Skills
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/blog/team/viktoria">
                      <i className="fa fa-female"></i>Viktoria Gibbers
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
