import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logoSH from "./images/logoSH.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ State pou detekte si user konekte
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // ✅ NEW: dropdown state pou Profile
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ✅ Fonksyon Logout
  const handleLogout = () => {
    sessionStorage.clear(); // efase tout done sesyon
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

      // ekstrè non an soti nan email la anvan "@"
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

  // ✅ NEW: toggle dropdown
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

        {/* ✅ Nou ajoute bouton Instant Consultation la */}
        <li className="link">
          <Link to="/instant-consultation">
            <button className="btn1">Instant Consultation</button>
          </Link>
        </li>

        {/* ✅ Si user pa konekte */}
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
            {/* ✅ NEW: Dropdown Profile (jan lab la mande a) */}
            <li className="link username-display" style={{ position: "relative" }}>
              <button
                type="button"
                onClick={handleToggleProfileMenu}
                className="btn1"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span>Welcome, {username}</span>
              </button>

              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "38px",
                    left: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    minWidth: "160px",
                    padding: "10px",
                    zIndex: 9999,
                  }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    Your Profile
                  </Link>
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
