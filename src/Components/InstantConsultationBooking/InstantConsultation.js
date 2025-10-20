import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch doktè yo depi nan API
  const getDoctorsDetails = async () => {
    try {
      const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
      const data = await response.json();

      if (searchParams.get('speciality')) {
        const speciality = searchParams.get('speciality').toLowerCase();
        const filtered = data.filter(
          (doctor) => doctor.speciality.toLowerCase() === speciality
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
      } else {
        setFilteredDoctors([]);
        setIsSearched(false);
      }

      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  // ✅ Rechèch doktè pa “speciality”
  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  // ✅ Tcheke si itilizatè konekte (opsyonèl selon lab la)
  useEffect(() => {
    getDoctorsDetails();
    // const authtoken = sessionStorage.getItem("auth-token");
    // if (!authtoken) navigate("/login");
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />

        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available{' '}
                {searchParams.get('location')}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor details
              </h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
