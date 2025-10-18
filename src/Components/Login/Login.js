import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login successful!");
      console.log("Login Data:", formData);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-login">
              Login
            </button>
            <button
              type="reset"
              className="btn btn-reset"
              onClick={() => {
                setFormData({ email: "", password: "" });
                setErrors({});
              }}
            >
              Reset
            </button>
          </div>

          <p className="signup-text">
            New member?{" "}
            <a href="/signup" style={{ color: "#000", fontWeight: "bold" }}>
              Sign Up Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
