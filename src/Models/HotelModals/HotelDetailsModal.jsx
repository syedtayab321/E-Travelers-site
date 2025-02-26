import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaBed, FaSwimmingPool, FaWifi, FaUtensils } from "react-icons/fa";

const HotelDetailsModal = ({ hotel, onClose }) => {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm p-4 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{hotel.name}</span>
            <span className="text-yellow-500 text-lg flex items-center gap-1">
              <FaStar /> {hotel.rating}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl transition duration-200"
          >
            &times;
          </button>
        </div>

        {/* Image */}
        <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid Layout for Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {/* Location */}
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-semibold">{hotel.city}, {hotel.exactAddress}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <FaDollarSign className="text-green-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <p className="font-semibold">${hotel.price} / night</p>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex items-center gap-3">
            <FaBed className="text-purple-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Bedrooms</p>
              <p className="font-semibold">{hotel.bedrooms} Bedrooms</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <FaStar className="text-yellow-500 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Rating</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(hotel.rating) ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-700">{hotel.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services and Features */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Services & Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Services */}
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Services</h4>
              <ul className="space-y-2">
                {hotel.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {service === "Swimming Pool" && <FaSwimmingPool className="text-blue-500" />}
                    {service === "Free Wi-Fi" && <FaWifi className="text-green-500" />}
                    {service === "Restaurant" && <FaUtensils className="text-red-500" />}
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Features</h4>
              <ul className="space-y-2">
                {hotel.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature === "Ocean View" && <FaMapMarkerAlt className="text-blue-500" />}
                    {feature === "Private Pool" && <FaSwimmingPool className="text-purple-500" />}
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{hotel.details.description}</p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelDetailsModal;