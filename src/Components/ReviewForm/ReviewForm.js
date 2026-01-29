import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [openFormId, setOpenFormId] = useState(null);
  const [reviews, setReviews] = useState({}); // { [id]: "text review" }

  // ✅ Sample doctors (lab la bezwen afichaj, nou mete 2 kòm egzanp)
  const consultations = [
    { id: 1, doctorName: "Dr. John Doe", doctorSpeciality: "Cardiology" },
    { id: 2, doctorName: "Dr. Jane Smith", doctorSpeciality: "Dermatology" },
  ];

  const handleOpen = (id) => {
    setOpenFormId(id);
  };

  const handleClose = () => {
    setOpenFormId(null);
  };

  const handleChange = (id, value) => {
    setReviews((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    // ✅ review la deja nan state "reviews"
    setOpenFormId(null);
  };

  return (
    <div className="reviews-page">
      <h2 className="reviews-title">Reviews</h2>

      <div className="reviews-table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>Provide feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>

          <tbody>
            {consultations.map((c) => (
              <React.Fragment key={c.id}>
                <tr>
                  <td>{c.id}</td>
                  <td>{c.doctorName}</td>
                  <td>{c.doctorSpeciality}</td>
                  <td>
                    <button
                      className="feedback-btn"
                      type="button"
                      onClick={() => handleOpen(c.id)}
                    >
                      Click Here
                    </button>
                  </td>
                  <td className="review-given">
                    {reviews[c.id] ? "Yes" : ""}
                  </td>
                </tr>

                {/* ✅ Feedback form row (ap louvri lè w klike button lan) */}
                {openFormId === c.id && (
                  <tr className="feedback-row">
                    <td colSpan="5">
                      <form
                        className="feedback-form"
                        onSubmit={(e) => handleSubmit(e, c.id)}
                      >
                        <div className="feedback-form-header">
                          <div>
                            <strong>Doctor:</strong> {c.doctorName}{" "}
                            <span className="dot">•</span>{" "}
                            <strong>Speciality:</strong> {c.doctorSpeciality}
                          </div>

                          <button
                            type="button"
                            className="close-btn"
                            onClick={handleClose}
                          >
                            ✕
                          </button>
                        </div>

                        <textarea
                          className="feedback-textarea"
                          placeholder="Write your feedback..."
                          value={reviews[c.id] || ""}
                          onChange={(e) => handleChange(c.id, e.target.value)}
                          required
                        />

                        <button type="submit" className="submit-btn">
                          Submit Review
                        </button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewForm;
