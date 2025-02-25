import React from "react";
import { FaTimes } from "react-icons/fa";

export const TourDetailsModal = ({ tour, onClose }) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg transform scale-95 transition-transform duration-300 ease-out animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">{tour.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Tour Details */}
        <div className="mt-4 space-y-3 overflow-auto max-h-80">
          <p className="text-gray-600 text-lg flex items-center">
            📍 <span className="ml-1 font-medium">{tour.location}</span>
          </p>
          <p className="text-green-600 font-semibold text-lg">
            💰 {tour.pricePerPerson}
          </p>
          <p className="text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4">
            {tour.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
