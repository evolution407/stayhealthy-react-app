import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // ✅ State pou kontwole si notification la parèt oswa non
  const [showNotification, setShowNotification] = useState(false);

  const loadNotificationData = () => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));

    const storedAppointmentData = storedDoctorData?.name
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    } else {
      setDoctorData(null);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } else {
      // ✅ si appointment la efase (cancel), kache notification la
      setAppointmentData(null);
      setShowNotification(false);
    }
  };

  useEffect(() => {
    // ✅ 1) chaje done yo premye fwa
    loadNotificationData();

    // ✅ 2) tande storage change (lè cancel / book fèt nan lòt component)
    // NOTE: storage event lan mache byen lè chanjman yo fèt nan lòt tab/window,
    // men nou mete polling tou anba a pou asire li toujou refresh menm tab la.
    const handleStorage = () => loadNotificationData();
    window.addEventListener("storage", handleStorage);

    // ✅ 3) fallback: re-check chak 500ms pou lab env (souvan storage event pa tire nan menm tab la)
    const interval = setInterval(loadNotificationData, 500);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {children}

      {/* ✅ Notification */}
      {isLoggedIn && showNotification && doctorData && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>

            <p className="appointment-card__message">
              <strong>User:</strong> {username}
            </p>

            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>

            {doctorData?.speciality && (
              <p className="appointment-card__message">
                <strong>Speciality:</strong> {doctorData.speciality}
              </p>
            )}

            {appointmentData?.name && (
              <p className="appointment-card__message">
                <strong>Name:</strong> {appointmentData.name}
              </p>
            )}

            {appointmentData?.phoneNumber && (
              <p className="appointment-card__message">
                <strong>Phone Number:</strong> {appointmentData.phoneNumber}
              </p>
            )}

            {appointmentData?.appointmentDate && (
              <p className="appointment-card__message">
                <strong>Date of Appointment:</strong> {appointmentData.appointmentDate}
              </p>
            )}

            {appointmentData?.selectedSlot && (
              <p className="appointment-card__message">
                <strong>Time Slot:</strong> {appointmentData.selectedSlot}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
