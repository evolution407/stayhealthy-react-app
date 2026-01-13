import React, { useState } from "react";
import "./FindDoctorSearch.css";

const FindDoctorSearch = ({ onSearch }) => {
  const [searchDoctor, setSearchDoctor] = useState("");
  const [showList, setShowList] = useState(false);

  const specialities = [
    "Dentist",
    "Dermatologist",
    "Cardiologist",
    "Neurologist",
    "General Physician",
    "ENT Specialist",
    "Gynecologist",
    "Orthopedic",
  ];

  const handleFocus = () => {
    setShowList(true);
  };

  const handleBlur = () => {
    // Sere ti reta pou ka klike sou opsyon an avan li disparèt
    setTimeout(() => setShowList(false), 150);
  };

  // ✅ Lè user chwazi yon speciality
  const handleSelect = (spec) => {
    setSearchDoctor(spec);
    setShowList(false);

    // 🔑 SA A SE PI ENPÒTAN AN (connect ak BookingConsultation)
    if (onSearch) {
      onSearch(spec);
    }
  };

  // ✅ Opsyonèl: si user tape epi peze Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchDoctor);
      setShowList(false);
    }
  };

  return (
    <div className="find-doctor-container">
      <h1>Find a Doctor</h1>

      <div className="search-box">
        <input
          type="text"
          value={searchDoctor}
          placeholder="Search doctors by specialty..."
          onChange={(e) => setSearchDoctor(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}   // ✅ ajout minim
        />

        {showList && (
          <ul className="dropdown-list">
            {specialities
              .filter((s) =>
                s.toLowerCase().includes(searchDoctor.toLowerCase())
              )
              .map((spec, i) => (
                <li key={i} onMouseDown={() => handleSelect(spec)}>
                  {spec}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
