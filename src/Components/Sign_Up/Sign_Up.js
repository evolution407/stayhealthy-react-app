import React, { useState } from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  // État du formulaire
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // État pour erreurs de validation
  const [errors, setErrors] = useState({});

  // Gérer le changement des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation des champs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Sign up successful!");
      console.log("User Data:", formData);
    }
  };

  // Réinitialiser le formulaire
  const handleReset = () => {
    setFormData({
      role: "",
      name: "",
      phone: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?{" "}
          <a href="/login" style={{ color: "#2190FF" }}>
            Login
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Buttons */}
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign_Up;
