import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  // Ou ka ranplase done sa yo ak done reyèl pita
  const reports = [
    { id: 1, doctorName: "Dr. John Doe", speciality: "Cardiology" },
    { id: 2, doctorName: "Dr. Jane Smith", speciality: "Dermatology" },
  ];

  // ✅ VIEW: louvri pdf la nan nouvo tab
  const handleViewReport = () => {
    window.open("/patient_report.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.doctorName}</td>
              <td>{row.speciality}</td>

              {/* ✅ VIEW */}
              <td>
                <button
                  type="button"
                  className="report-btn"
                  onClick={handleViewReport}
                >
                  View Report
                </button>
              </td>

              {/* ✅ DOWNLOAD (anchor + download attribute) */}
              <td>
                <a
                  className="report-btn"
                  href="/patient_report.pdf"
                  download="patient_report.pdf"
                >
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
