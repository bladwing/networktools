import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  // faUsers,
  // faTools,
  // faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./topmenu.scss";

interface TopMenuProps {
  isOpen: boolean;
  openModal: (content: string, onModuleAdded?: () => void) => void;
}

const TopMenu: React.FC<TopMenuProps> = ({ isOpen, openModal }) => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const renderMenuItems = () => {
    switch (location.pathname) {
      case `/tools-list`:
        return (
          <>
            <Link to="/arubawcaprename" className="top-menu-item">Aruba WC AP - Rename</Link>
            <Link to="/aruballdp2name" className="top-menu-item">Aruba Switch lldp2int</Link>
            <Link to="/ruckusbssid-mac2wired-mac" className="top-menu-item">BSSID Mac2WiredMac</Link>
            <h2 className="Page-Title-Top-Menu">
              <FontAwesomeIcon icon={faFileAlt} /> Tools List
            </h2>
          </>
        );

      case `/ruckusbssid-mac2wired-mac`:
        return (
          <>
            <Link to="/tools-list" className="top-menu-item"> Back</Link>
            <h2 className="Page-Title-Top-Menu">
              <FontAwesomeIcon icon={faFileAlt} /> Ruckus BSSID Mac2WiredMac
            </h2>
          </>
        );

      case `/arubawcaprename`:
        return (
          <>
            <Link to="/tools-list" className="top-menu-item">Back</Link>
            <h2 className="Page-Title-Top-Menu">
              <FontAwesomeIcon icon={faFileAlt} /> Aruba WC - Rename
            </h2>
          </>
        );

      case `/aruballdp2name`:
        return (
          <>
            <Link to="/tools-list" className="top-menu-item">Back</Link>
            <h2 className="Page-Title-Top-Menu">
              <FontAwesomeIcon icon={faFileAlt} /> Aruba Switch lldp2int
            </h2>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`top-menu ${isOpen ? "open" : "closed"}`}>
      {renderMenuItems()}
    </div>
  );
};

export default TopMenu;
