import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation"; // deja la
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch"; // ✅ nouvo import
import "./App.css";
import BookingConsultation from "./Components/BookingConsultation";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          {/* ✅ Nouvo route pou FindDoctorSearch */}
          <Route path="/booking-consultation" element={<BookingConsultation />} />

          <Route path="/find-doctor" element={<FindDoctorSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
