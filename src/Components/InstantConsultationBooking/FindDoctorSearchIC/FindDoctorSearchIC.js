import React, { useState } from "react";
import "./FindDoctorSearchIC.css";
// ❌ pa bezwen useNavigate ankò
import doctorFinder from "../DoctorCardIC/images/doctor_finder.png";

const initSpeciality = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Ayurveda",
];

// ✅ resevwa onSearch kòm props
const FindDoctorSearchIC = ({ onSearch }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [specialities] = useState(initSpeciality);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // ✅ rele fonksyon rechèch la olye de navigate + reload
    if (onSearch) {
      onSearch(speciality);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchDoctor(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>

        {/* ✅ imaj pèsonalize ou a */}
        <div>
          <img
            src={doctorFinder}
            alt="Doctor Finder"
            style={{
              width: "300px",
              height: "300px",
              margin: "20px 0",
              objectFit: "contain",
            }}
          />
        </div>

        <div
          className="home-search-container"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={handleInputChange}
            />

            <div className="findiconimg">
              <img
                className="findIcon"
                src={process.env.PUBLIC_URL + "/images/search.svg"}
                alt=""
              />
            </div>

            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + "/images/search.svg"}
                      alt=""
                      style={{ height: "10px", width: "10px" }}
                    />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
