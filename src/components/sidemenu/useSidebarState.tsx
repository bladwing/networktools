import { useState, useEffect } from "react";

const useSidebarState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed");
  };

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebarState");
    setIsOpen(sidebarState === "open");
  }, []);

  return { isOpen, toggleMenu };
};

export default useSidebarState;
