import React from "react";
import { motion } from "framer-motion";

const HotelDetailsModal = ({ hotel, onClose }) => {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm p-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl transition duration-200"
          >
            &times;
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-36 rounded-lg overflow-hidden mb-3">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid Layout for Details */}
        <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
          <div>
            <p className="text-gray-500">📍 Location</p>
            <p className="font-semibold">{hotel.location}</p>
          </div>
          <div>
            <p className="text-gray-500">💰 Price</p>
            <p className="font-semibold text-blue-600">{hotel.price}</p>
          </div>
          <div>
            <p className="text-gray-500">⭐ Rating</p>
            <div className="flex items-center text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(hotel.rating) ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="ml-1 text-gray-700">{hotel.rating}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500">🏨 Amenities</p>
            <ul className="list-disc list-inside">
              {hotel.details.amenities.slice(0, 3).map((amenity, index) => (
                <li key={index} className="font-semibold">{amenity}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Description */}
        <div className="mt-3">
          <p className="text-gray-500">📝 Description</p>
          <p className="text-sm text-gray-800">{hotel.details.description.slice(0, 100)}...</p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelDetailsModal;
