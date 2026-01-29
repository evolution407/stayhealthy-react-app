import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleClickHere = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ lab la mande validation: name + review + rating
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedReview(formData);
      setReviewSubmitted(true); // 🔒 disable feedback after submit
      setShowForm(false);
    }
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>

      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dr. John Doe</td>
            <td>Cardiology</td>
            <td>
              <button
                onClick={handleClickHere}
                disabled={reviewSubmitted}
                className="feedback-btn"
                type="button"
              >
                Click Here
              </button>
            </td>

            {/* ✅ montre review + rating nan kolòn wouj la */}
            <td className="review-message">
              {submittedReview ? (
                <>
                  <div><strong>{submittedReview.name}</strong></div>
                  <div>{submittedReview.review}</div>
                  <div>
                    {"⭐".repeat(submittedReview.rating)}
                    {"☆".repeat(5 - submittedReview.rating)}
                  </div>
                </>
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* FORM */}
      {showForm && !reviewSubmitted && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Give Your Review</h3>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Review:</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />

          {/* ✅ Rating selector 1–5 */}
          <label>Rating:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`star ${formData.rating >= num ? "filled" : ""}`}
                onClick={() => handleRatingClick(num)}
                role="button"
                tabIndex={0}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
