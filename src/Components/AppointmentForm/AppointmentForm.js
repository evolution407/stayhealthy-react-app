import React, { useEffect, useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // ✅ (AJOUTE) default date = jodia (epi anpeche pase)
  useEffect(() => {
    if (!appointmentDate) {
      const today = new Date().toISOString().split("T")[0];
      setAppointmentDate(today);
    }
  }, [appointmentDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // ✅ voye tout done yo bay parent la (DoctorCard)
    if (onSubmit) {
      onSubmit({
        name,
        phoneNumber,
        appointmentDate,
        selectedSlot,
        doctorName,
        doctorSpeciality,
      });
    }

    // ✅ reset form
    setName("");
    setPhoneNumber("");
    const today = new Date().toISOString().split("T")[0];
    setAppointmentDate(today);
    setSelectedSlot("");
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      {/* ✅ Date of Appointment */}
      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          min={minDate} // ✅ (AJOUTE) coming dates only
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      {/* ✅ Book Time Slot */}
      <div className="form-group">
        <label htmlFor="timeSlot">Book Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          <option value="09:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="02:00 PM">2:00 PM</option>
          <option value="03:00 PM">3:00 PM</option>
          <option value="04:00 PM">4:00 PM</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
