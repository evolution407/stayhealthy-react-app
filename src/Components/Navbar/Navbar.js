import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "./Navbar.css";
import logoSH from "./images/logoSH.png"; // ✅ Import logo

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  // ✅ Fonksyon pou ouvri/fèmen meni a (hamburger icon)
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav>
      {/* ✅ Logo ak tèks */}
      <div className="nav__logo">
        <Link to="/">
          <span>StayHealthy</span>
          <img src={logoSH} alt="StayHealthy logo" className="nav__img" />
        </Link>
        <span>.</span>
      </div>

      {/* ✅ Icon pou mobile toggle */}
      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${isActive ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* ✅ Lis meni yo */}
      <ul className={`nav__links ${isActive ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="#">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/signup">
            <button className="btn1">Sign Up</button>
          </Link>
        </li>
        <li className="link">
          <Link to="/login">
            <button className="btn1">Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
