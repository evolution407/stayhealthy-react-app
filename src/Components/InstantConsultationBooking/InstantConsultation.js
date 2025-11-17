import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

// ✅ Doktè lokal pou lè API ekstèn nan pa mache
const LOCAL_DOCTORS = [
  {
    name: "Dr. Jiao Yang",
    speciality: "Dentist",
    experience: 9,
    ratings: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Dr. Anita Rao",
    speciality: "Dermatologist",
    experience: 7,
    ratings: "⭐⭐⭐⭐",
  },
  {
    name: "Dr. Mark Lewis",
    speciality: "General Physician",
    experience: 12,
    ratings: "⭐⭐⭐⭐⭐",
  },
];

const DATA_URL = "https://api.npoint.io/9a5543d36f1460da2f63";

const InstantConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => {
        console.log(
          "Error when calling API, using local doctors instead:",
          err
        );
        // ⛑️ Si API a tonbe, nou sèvi ak lis lokal la
        setDoctors(LOCAL_DOCTORS);
      });
  };

  // 🔎 Fonksyon rechèch
  const handleSearch = (searchText) => {
    const text = searchText.trim().toLowerCase();

    if (!text) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(text)
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  return (
    <center>
      <div className="searchpage-container">
        {/* pase handleSearch bay ba rechèch la */}
        <FindDoctorSearchIC onSearch={handleSearch} />

        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>{filteredDoctors.length} doctors found</h2>
              <h3>Book appointments with minimum wait-time &amp; verified details</h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            "" // pa montre anyen si user poko fè rechèch
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
