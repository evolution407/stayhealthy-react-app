import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logoSH from "./images/logoSH.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ State pou detekte si user konekte
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // ✅ Dropdown state
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ✅ Fonksyon Logout
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/");
    window.location.reload();
  };

  // ✅ Efè pou verifye si gen user aktif
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");

    if (token && email) {
      setIsLoggedIn(true);

      const nameFromEmail = email.split("@")[0];
      setUsername(
        nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      );
    }
  }, []);

  // ✅ Fonksyon pou ouvri / fèmen meni (mobil)
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

  // ✅ Toggle dropdown
  const handleToggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <nav>
      {/* ✅ Logo */}
      <div className="nav__logo">
        <Link to="/">
          <span>StayHealthy</span>
          <img src={logoSH} alt="StayHealthy logo" className="nav__img" />
        </Link>
        <span>.</span>
      </div>

      {/* ✅ Icon pou mobile toggle */}
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-bars"></i>
      </div>

      {/* ✅ Meni navigasyon */}
      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>

        <li className="link">
          <a href="#">Appointments</a>
        </li>

        <li className="link">
          <Link to="/instant-consultation">
            <button className="btn1">Instant Consultation</button>
          </Link>
        </li>

        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            {/* ✅ Dropdown: Your Profile + Your Reports (jan lab la mande) */}
            <li className="link username-display profile-dropdown">
              <button
                type="button"
                onClick={handleToggleProfileMenu}
                className="btn1 profile-trigger"
              >
                Welcome, {username}
              </button>

              {showProfileMenu && (
                <div className="profile-menu">
                  <button
                    type="button"
                    className="profile-menu-item"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/profile");
                    }}
                  >
                    Your Profile
                  </button>

                  <button
                    type="button"
                    className="profile-menu-item"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/reports");
                    }}
                  >
                    Your Reports
                  </button>
                </div>
              )}
            </li>

            <li className="link">
              <button className="btn1 logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
