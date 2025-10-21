import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch doktè yo yon sèl fwa
  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  };

  // ✅ Fonksyon rechèch
  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>{filteredDoctors.length} doctors found</h2>
              <h3>Book appointments with minimum wait-time & verified details</h3>
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
            ''
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
