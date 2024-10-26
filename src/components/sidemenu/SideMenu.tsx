import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { menuItems } from "./menuConfig.ts";
import { Link } from "react-router-dom";
import "./SidebarMenu.scss";

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
      </div>
      <div className="menu-content">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className="menu-item">
            <FontAwesomeIcon icon={item.icon} className="icon" />
            <span className={`text ${isOpen ? "show" : "hide"}`}>{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;
