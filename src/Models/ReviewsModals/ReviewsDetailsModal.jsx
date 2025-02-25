import React from "react";

const ReviewDetailsModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-96 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{review.user}'s Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Review Details */}
        <div className="space-y-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Comment</p>
            <p className="font-semibold">{review.comment}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{review.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-semibold capitalize">{review.type}</p>
          </div>
          {Object.entries(review.details).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500 capitalize">{key}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailsModal;