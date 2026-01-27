import React, { useEffect, useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showForm, setShowForm] = useState(false);

  // ✅ kenbe appointment la (si gen booking)
  const [appointment, setAppointment] = useState(null);

  // ✅ (AJOUTE) chaje appointment depi localStorage si li te deja booke
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(name));
      if (saved) setAppointment(saved);
    } catch (e) {}
  }, [name]);

  // ✅ Book button click
  const handleBookingClick = () => {
    setShowForm(true);
  };

  // ✅ Cancel appointment
  const handleCancel = () => {
    // ✅ (AJOUTE) efase booking + doctorData pou Notification disparèt
    try {
      const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
      if (storedDoctorData?.name) {
        localStorage.removeItem(storedDoctorData.name);
      }
      localStorage.removeItem("doctorData");
      localStorage.removeItem(name);
    } catch (e) {}

    setAppointment(null);
    setShowForm(false);

    // ✅ (AJOUTE) fòse Notification re-check
    window.dispatchEvent(new Event("storage"));
  };

  // ✅ Lè form submit
  const handleFormSubmit = (data) => {
    setAppointment(data); // sove booking info
    setShowForm(false); // kache form

    // ✅ (AJOUTE) sove done yo pou Notification (jan lab la mande)
    const doctorData = { name, speciality, experience, ratings };
    localStorage.setItem("doctorData", JSON.stringify(doctorData));
    localStorage.setItem(name, JSON.stringify(data)); // kle a = non doktè a

    // ✅ (AJOUTE) fòse Notification re-check
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>

          {/* ✅ Exercise 4: Book/Cancel (referans DoctorCardIC doctor-card-options-container) */}
          <div className="doctor-card-options-container">
            <button
              type="button"
              className={`book-appointment-btn ${
                appointment ? "cancel-appointment" : ""
              }`}
              onClick={appointment ? handleCancel : handleBookingClick}
            >
              <div>
                {appointment ? "Cancel Appointment" : "Book Appointment"}
              </div>
              <div>No Booking Fee</div>
            </button>
          </div>

          {/* ✅ si gen appointment, montre booked info */}
          {appointment && (
            <div className="bookedInfo">
              <h4 style={{ marginTop: "12px" }}>Appointment Booked!</h4>
              <p>
                <strong>Name:</strong> {appointment.name}
              </p>
              <p>
                <strong>Phone Number:</strong> {appointment.phoneNumber}
              </p>
              <p>
                <strong>Date:</strong> {appointment.appointmentDate}
              </p>
              <p>
                <strong>Time Slot:</strong> {appointment.selectedSlot}
              </p>

              <button type="button" onClick={handleCancel}>
                Cancel Appointment
              </button>
            </div>
          )}

          {/* ✅ si showForm=true, montre AppointmentForm */}
          {showForm && !appointment && (
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
