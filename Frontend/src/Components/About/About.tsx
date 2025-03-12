import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";

interface Review {
  id: number;
  name: string;
  location: string;
  stars: string;
  text: string;
}

const About: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [user, setUser] = useState<{ loggedIn: boolean; name: string }>({
    loggedIn: true,
    name: "John Doe",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>("http://localhost:5000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleReviewSubmit = async () => {
    if (newReview.trim() !== "") {
      try {
        const response = await axios.post<Review>("http://localhost:5000/api/reviews", {
          name: user.name,
          location: "📍 Your Location",
          stars: "★★★★☆",
          text: newReview,
        });
        setReviews([response.data, ...reviews]); // ✅ No red underline now
        setNewReview("");
      } catch (error) {
        console.error("Error submitting review", error);
      }
    }
  };

  return (
    <section className="about-container">
      <div className="about-content">
        <h2>
          Why Choose <span>StayNearU</span> ?
        </h2>
        <p>
          StayNearU is the trusted Sri Lankan platform for finding comfortable
          and affordable boarding places. We offer a diverse range of options,
          from budget-friendly hostels to modern apartments, all conveniently
          located throughout the country.
        </p>
        <p>
          We prioritize security with verified listings and secure booking. Our
          user-friendly platform and dedicated customer support ensure a smooth
          and stress-free booking experience for you.
        </p>
        <button className="read-more-btn" onClick={handleReadMore}>
          {showMore ? "READ LESS" : "READ MORE"}
        </button>

        {showMore && (
          <p className="extra-info">
            At StayNearU, we understand the importance of finding a home away
            from home. Whether you are a student, a working professional, or a
            traveler, we make it easy for you to find a place that suits your
            budget and preferences. Our platform also features genuine reviews
            from other users, helping you make informed decisions.
          </p>
        )}
      </div>

      <div className="reviews-section">
        <h3>Top Reviews</h3>
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-location">
              {review.location} <span className="stars">{review.stars}</span>
            </div>
            <div className="review-content">
              <blockquote>{review.text}</blockquote>
            </div>
            <p className="reviewer-name">{review.name}</p>
          </div>
        ))}

        {user.loggedIn && (
          <div className="add-review">
            <h4>Add Your Review</h4>
            <textarea
              className="review-input"
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button className="submit-review-btn" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
