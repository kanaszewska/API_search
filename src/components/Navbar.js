import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="header">
      <h1>Turist</h1>
      <div className="icons">
        <span>
          <FaFacebookSquare />
        </span>
        <span>
          <FaTwitterSquare />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
