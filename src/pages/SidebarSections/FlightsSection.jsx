import React, { useState } from "react";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import ViewFlightModal from "./../../Models/flightModals/ViewFlightsModal";
import FlightFormModal from "./../../Models/flightModals/FlightsFormModal";

const FlightsPage = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: "Emirates",
      flightNo: "EK202",
      from: "Dubai (DXB)",
      to: "London (LHR)",
      departureDate: "2023-10-15",
      departureTime: "12:00 PM",
      arrivalDate: "2023-10-15",
      arrivalTime: "4:00 PM",
      price: "$1200",
      seatsAvailable: 150,
    },
    {
      id: 2,
      airline: "Qatar Airways",
      flightNo: "QR101",
      from: "Doha (DOH)",
      to: "New York (JFK)",
      departureDate: "2023-10-20",
      departureTime: "10:00 AM",
      arrivalDate: "2023-10-20",
      arrivalTime: "8:00 PM",
      price: "$1500",
      seatsAvailable: 200,
    },
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleViewModal = (flight) => {
    setSelectedFlight(flight);
    setViewModal(!viewModal);
  };

  const toggleFormModal = (flight = null) => {
    setIsEdit(!!flight);
    setSelectedFlight(flight);
    setFormModal(!formModal);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Flights Management</h2>
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-5 rounded-lg shadow-lg transform transition hover:scale-105"
          onClick={() => toggleFormModal()}
        >
          <FaPlus className="mr-2" /> Add New Flight
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Airline</th>
              <th className="py-3 px-4 text-left">Flight No</th>
              <th className="py-3 px-4 text-left">From</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-left">Departure</th>
              <th className="py-3 px-4 text-left">Arrival</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Seats Available</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={flight.id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold">{flight.airline}</td>
                <td className="py-3 px-4">{flight.flightNo}</td>
                <td className="py-3 px-4">{flight.from}</td>
                <td className="py-3 px-4">{flight.to}</td>
                <td className="py-3 px-4">
                  <div className="font-medium">{flight.departureDate}</div>
                  <div className="text-sm text-gray-600">{flight.departureTime}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{flight.arrivalDate}</div>
                  <div className="text-sm text-gray-600">{flight.arrivalTime}</div>
                </td>
                <td className="py-3 px-4 font-semibold text-green-700">{flight.price}</td>
                <td className="py-3 px-4">{flight.seatsAvailable}</td>
                <td className="py-3 px-4 flex justify-center space-x-3">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-md transform transition hover:scale-105"
                    onClick={() => toggleViewModal(flight)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg shadow-md transform transition hover:scale-105"
                    onClick={() => toggleFormModal(flight)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewModal && <ViewFlightModal flight={selectedFlight} toggle={toggleViewModal} />}
      {formModal && <FlightFormModal flight={selectedFlight} toggle={toggleFormModal} isEdit={isEdit} setFlights={setFlights} flights={flights} />}
    </div>
  );
};

export default FlightsPage;