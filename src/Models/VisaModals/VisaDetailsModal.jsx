import React from "react";
import { FaTimes } from "react-icons/fa";

const VisaDetailsModal = ({ visa, onClose }) => {
  if (!visa) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 transform transition-all scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Visa Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-500 transition-all text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-semibold text-gray-700">
            Country: <span className="font-normal text-gray-600">{visa.country}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Type: <span className="font-normal text-gray-600">{visa.type}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Duration: <span className="font-normal text-gray-600">{visa.duration}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">Details:</p>
          <p className="text-gray-600 bg-gray-100 p-2 rounded-md">{visa.details}</p>
        </div>

        <button 
          onClick={onClose} 
          className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg w-full shadow-md hover:opacity-90 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VisaDetailsModal;
