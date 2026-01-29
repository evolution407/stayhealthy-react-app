import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  // ✅ Sample data (tankou screenshot lab la)
  const reports = [
    { id: 1, doctorName: "Dr. John Doe", speciality: "Cardiology" },
    { id: 2, doctorName: "Dr. Jane Smith", speciality: "Dermatology" },
  ];

  const handleViewReport = (doctorName) => {
    alert(`View Report for ${doctorName}`);
  };

  const handleDownloadReport = (doctorName) => {
    alert(`Download Report for ${doctorName}`);
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
              <td>
                <button
                  className="report-btn"
                  onClick={() => handleViewReport(row.doctorName)}
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="report-btn"
                  onClick={() => handleDownloadReport(row.doctorName)}
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
