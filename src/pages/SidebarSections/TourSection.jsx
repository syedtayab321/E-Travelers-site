import React, { useEffect, useState } from "react";
import { TourModalForm } from "./../../Models/TourModals/TourModalForm";
import { TourDetailsModal } from "./../../Models/TourModals/TourDetailsModal";
import { getTours, addTour, updateTour, deleteTour } from "../../services/tourServices";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ **Fetch all tours from Firestore**
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursData = await getTours();
        setTours(toursData);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // ✅ **Add or Edit Tour**
  const handleAddOrEditTour = async (tour) => {
    try {
      if (tour.id) {
        await updateTour(tour.id, tour);
        setTours((prevTours) =>
          prevTours.map((t) => (t.id === tour.id ? tour : t))
        );
      } else {
        const newTourId = await addTour(tour);
        setTours([...tours, { ...tour, id: newTourId }]);
      }
    } catch (error) {
      console.error("Error saving tour:", error);
    }
    setShowModal(false);
  };

  // ✅ **Delete Tour**
  const handleDeleteTour = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        await deleteTour(tourId);
        setTours(tours.filter((tour) => tour.id !== tourId));
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Pakistan Tour Packages</h1>

      <div className="flex justify-center mb-6">
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          onClick={() => {
            setSelectedTour(null);
            setShowModal(true);
          }}
        >
          + Add New Tour
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading tours...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{tour.name}</h2>
              <p className="text-gray-600 mt-2">{tour.location}</p>
              
              {/* Display Tour Type */}
              <p className="text-sm font-medium text-gray-700 bg-blue-100 inline-block px-3 py-1 rounded-full mt-2">
                {tour.tourType}
              </p>
          
              {/* Display Price Per Person */}
              <p className="text-lg font-semibold text-green-500 mt-2">
                Price per Person: {tour.pricePerPerson}
              </p>
          
              <p className="text-gray-700 mt-4">{tour.description}</p>
          
              <div className="mt-6 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => {
                    setSelectedTour(tour);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  onClick={() => {
                    setSelectedTour(tour);
                    setShowDetails(true);
                  }}
                >
                  View Details
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDeleteTour(tour.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          
          ))}
        </div>
      )}

      {showModal && (
        <TourModalForm
          tour={selectedTour}
          onClose={() => setShowModal(false)}
          onSave={handleAddOrEditTour}
        />
      )}

      {showDetails && (
        <TourDetailsModal
          tour={selectedTour}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default TourList;
