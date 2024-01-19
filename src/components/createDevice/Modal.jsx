// Modal.js
import React from "react";
import "./modal.scss";

const Modal = ({ show, handleClose, children }) => {
  const modalClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={modalClassName}>
      <div className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
