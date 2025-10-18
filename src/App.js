import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing_Page from "./Components/Landing_Page/Landing_Page";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import "./App.css"; // si ou deja gen fichye style App.css la

function App() {
  return (
    <>
      <BrowserRouter>
        {/* ✅ Navbar rete vizib sou tout paj yo */}
        <Navbar />

        {/* ✅ Definisyon tout wout yo */}
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
