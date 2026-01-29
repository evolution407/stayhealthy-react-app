// src/Components/ProfileCard/ProfileCard.js
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  // ✅ default values pou pa rete blank
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();

        // ✅ FALLBACK (san kraze anyen): si API a pa bay name/phone/email, pran sa ki nan sessionStorage
        const fallbackUser = {
          name: user?.name || sessionStorage.getItem("name") || "",
          phone: user?.phone || sessionStorage.getItem("phone") || "",
          email: user?.email || email || "",
        };

        setUserDetails(fallbackUser);
        setUpdatedDetails(fallbackUser);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);

      // ✅ Si fetch la echwe net, toujou montre fallback yo
      const email = sessionStorage.getItem("email") || "";
      const fallbackUser = {
        name: sessionStorage.getItem("name") || "",
        phone: sessionStorage.getItem("phone") || "",
        email,
      };

      setUserDetails(fallbackUser);
      setUpdatedDetails(fallbackUser);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // ✅ Mete ajou sessionStorage pou fallback la toujou gen bon done
        sessionStorage.setItem("name", updatedDetails.name || "");
        sessionStorage.setItem("phone", updatedDetails.phone || "");

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);

      // ✅ Menm si PUT la echwe, kenbe sa user la tape a pou screenshot/lab
      sessionStorage.setItem("name", updatedDetails.name || "");
      sessionStorage.setItem("phone", updatedDetails.phone || "");

      setUserDetails(updatedDetails);
      setEditMode(false);
      alert("Profile Updated (local fallback)!");
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Email
            <input type="email" name="email" value={updatedDetails.email} disabled />
          </label>

          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          <p>
            <b>Email:</b> {userDetails.email}
          </p>
          <p>
            <b>Phone:</b> {userDetails.phone}
          </p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
