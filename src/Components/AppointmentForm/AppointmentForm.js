import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // voye tout done yo bay parent la (DoctorCard)
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

    // reset form
    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setSelectedSlot("");
  };

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

      {/* ✅ Nouvo chan: Date of Appointment */}
      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      {/* ✅ Nouvo chan: Book Time Slot */}
      <div className="form-group">
        <label htmlFor="timeSlot">Book Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
          <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
          <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
          <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
          <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
          <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
