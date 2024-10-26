import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.scss";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate(`/login`);
  };
  return (
    <div className="topbar">
      <div className="left-section">
        <a href="/dashboard" rel="noopener noreferrer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHS2CnfRUtnTkQAuW_-bmB2IZsuq0YzPFXg&s"
            alt="site logo"
            className="site-logo"
          />
        </a>
        
        <span className="go-live">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Go Live
          </a>
        </span>
        
      </div>
      <span className="admin-panel">Admin Panel</span>
      <div className="right-section">
        <div className="profile" onClick={toggleMenu}>
          <img src="https://via.placeholder.com/40" alt="Profile" />
          {isMenuOpen && (
            <div className="profile-menu">
              <ul>
                <li>
                  <Link
                    to={`/user-profile`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/settings`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
