import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import ViewFlightModal from "./../../Models/flightModals/ViewFlightsModal";
import FlightFormModal from "./../../Models/flightModals/FlightsFormModal";
import { getFlights, addFlight, updateFlight, deleteFlight } from "../../services/FlightsServices";

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch flights on component mount
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const fetchedFlights = await getFlights();
        setFlights(fetchedFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const toggleViewModal = (flight) => {
    setSelectedFlight(flight);
    setViewModal(!viewModal);
  };

  const toggleFormModal = (flight = null) => {
    setIsEdit(!!flight);
    setSelectedFlight(flight);
    setFormModal(!formModal);
  };

  const handleAddFlight = async (newFlight) => {
    const addedFlight = await addFlight(newFlight);
    setFlights([...flights, addedFlight]);
  };

  const handleUpdateFlight = async (updatedFlight) => {
    await updateFlight(updatedFlight.id, updatedFlight);
    setFlights(flights.map((flight) => (flight.id === updatedFlight.id ? updatedFlight : flight)));
  };

  const handleDeleteFlight = async (flightId) => {
    await deleteFlight(flightId);
    setFlights(flights.filter((flight) => flight.id !== flightId));
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

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ImSpinner2 className="animate-spin text-blue-600 text-4xl" />
        </div>
      ) : flights.length === 0 ? (
        // No Data Message
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <MdFlight className="text-6xl mb-2" />
          <p className="text-lg">No flights available</p>
        </div>
      ) : (
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
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transform transition hover:scale-105"
                      onClick={() => handleDeleteFlight(flight.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewModal && <ViewFlightModal flight={selectedFlight} toggle={toggleViewModal} />}
      {formModal && (
        <FlightFormModal
          flight={selectedFlight}
          toggle={toggleFormModal}
          isEdit={isEdit}
          setFlights={setFlights}
          flights={flights}
          onSave={isEdit ? handleUpdateFlight : handleAddFlight}
        />
      )}
    </div>
  );
};

export default FlightsPage;
