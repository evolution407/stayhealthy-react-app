import React, { useEffect, useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <div className="profilecard-page">
      <div className="profilecard">
        <h3 className="profilecard-title">Your Profile</h3>

        <div className="profilecard-row">
          <span className="profilecard-label">Email:</span>
          <span className="profilecard-value">{email || "Not Logged In"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
