import React, { useState, useEffect } from "react";
import { FaStar, FaTrash, FaRegSadTear } from "react-icons/fa";
import { fetchReviews } from "../../services/FetchReviews";
import ReviewDetailsModal from "../../Models/ReviewsModals/ReviewsDetailsModal";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from Firebase on component mount
  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
      setLoading(false);
    };

    getReviews();
  }, []);

  // Handle review click
  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Handle delete review (You can later integrate Firebase delete functionality)
  const handleDeleteReview = (id) => {
    alert(`Delete review with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        My Reviews
      </h1>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
      )}

      {/* If no reviews */}
      {!loading && reviews.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <FaRegSadTear className="text-6xl text-gray-400" />
          <p className="text-gray-500 text-lg mt-2">No reviews yet!</p>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex flex-col space-y-4">
              {/* User and Rating */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {review.user}
                </h2>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-600">{review.comment}</p>

              {/* Date and Type */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>{review.date}</p>
                <p className="capitalize">{review.type}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleReviewClick(review)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Details Modal */}
      {isModalOpen && (
        <ReviewDetailsModal
          review={selectedReview}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
