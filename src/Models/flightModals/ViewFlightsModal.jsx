import React from "react";
import { FaPlane, FaCalendarAlt, FaClock, FaMoneyBillWave, FaChair } from "react-icons/fa";

const ViewFlightModal = ({ flight, toggle }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-96 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaPlane className="mr-2 text-blue-600" />
            Flight Details
          </h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Flight Details */}
        <div className="space-y-4 text-gray-700">
          {/* Airline and Flight No */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Airline</p>
              <p className="font-semibold">{flight.airline}</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Flight No</p>
              <p className="font-semibold">{flight.flightNo}</p>
            </div>
          </div>

          {/* From and To */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <p className="text-sm text-gray-500">From</p>
              <p className="font-semibold">{flight.from}</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-500">To</p>
              <p className="font-semibold">{flight.to}</p>
            </div>
          </div>

          {/* Departure Date and Time */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Departure Date</p>
              <p className="font-semibold">{flight.departureDate}</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Departure Time</p>
              <p className="font-semibold">{flight.departureTime}</p>
            </div>
          </div>

          {/* Arrival Date and Time */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Arrival Date</p>
              <p className="font-semibold">{flight.arrivalDate}</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Arrival Time</p>
              <p className="font-semibold">{flight.arrivalTime}</p>
            </div>
          </div>

          {/* Price and Seats Available */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold text-green-600">{flight.price}</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-gray-500">Seats Available</p>
              <p className="font-semibold">{flight.seatsAvailable}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={toggle}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFlightModal;