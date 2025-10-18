import React from "react";
import "./Navbar.css";
import logoSH from "./images/logoSH.png"; // Import logo a

const Navbar = () => {
  // Fonksyon pou ouvri/fèmen meni a (hamburger icon)
  const handleClick = () => {
    const navLinks = document.querySelector(".nav__links");
    const navIcon = document.querySelector(".nav__icon i");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      navIcon.classList.remove("fa-bars");
      navIcon.classList.add("fa-times");
    } else {
      navIcon.classList.remove("fa-times");
      navIcon.classList.add("fa-bars");
    }
  };

  return (
    <nav>
      {/* ✅ Logo ak tèks */}
      <div className="nav__logo">
        <a href="/">
          <span>StayHealthy</span>
          <img src={logoSH} alt="StayHealthy logo" className="nav__img" />
        </a>
        <span>.</span>
      </div>

      {/* ✅ Icon pou mobile toggle */}
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-bars"></i>
      </div>

      {/* ✅ Lis meni yo */}
      <ul className="nav__links active">
        <li className="link">
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        <li className="link">
          <a href="../Sign_Up/Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
