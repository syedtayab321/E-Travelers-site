import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaHotel, FaStar, FaBed } from "react-icons/fa";
import { MdOutlineNoFood, MdLocationOn } from "react-icons/md";
import HotelDetailsModal from "../../Models/HotelModals/HotelDetailsModal";
import HotelFormModal from "../../Models/HotelModals/HotelModalForm";
import { fetchHotels, addHotel, updateHotel, deleteHotel } from "../../services/HotelServices";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  const handleAddHotel = async (hotel) => {
    const newHotel = await addHotel(hotel);
    setHotels([...hotels, newHotel]);
    setIsFormOpen(false);
  };

  const handleUpdateHotel = async (id, updatedData) => {
    await updateHotel(id, updatedData);
    setHotels(hotels.map((hotel) => (hotel.id === id ? { ...hotel, ...updatedData } : hotel)));
    setIsFormOpen(false);
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700 flex items-center justify-center gap-3">
        <FaHotel className="text-blue-600 text-5xl" /> Hotels Management
      </h1>

      {/* Add Hotel Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            setSelectedHotel(null);
            setIsEdit(false);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-lg transition-all"
        >
          <FaPlus /> Add Hotel
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : hotels.length === 0 ? (
        // No Data Found
        <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
          <MdOutlineNoFood className="text-7xl" />
          <p className="text-xl font-semibold mt-2">No hotels found</p>
        </div>
      ) : (
        // Hotels List
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Hotel Image */}
              <img
                src={hotel.image || "https://via.placeholder.com/300"}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Hotel Details */}
              <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-gray-600 flex items-center gap-1 text-lg">
                <MdLocationOn className="text-blue-600" /> {hotel.city}, {hotel.exactAddress}
              </p>
              <p className="text-gray-800 font-semibold text-lg mt-1">${hotel.price} / night</p>
              <p className="text-yellow-500 text-lg mt-1 flex items-center gap-1">
                <FaStar /> {hotel.rating}
              </p>
              <p className="text-gray-800 text-lg mt-1 flex items-center gap-1">
                <FaBed /> {hotel.bedrooms} Bedrooms
              </p>

              {/* Services */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Services:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {hotel.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Features:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {hotel.features.map((feature, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedHotel(hotel)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all"
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setIsEdit(true);
                    setIsFormOpen(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteHotel(hotel.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotel Details Modal */}
      {selectedHotel && <HotelDetailsModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />}

      {/* Hotel Form Modal */}
      {isFormOpen && (
        <HotelFormModal
          hotel={selectedHotel}
          onClose={() => setIsFormOpen(false)}
          onSubmit={isEdit ? (values) => handleUpdateHotel(selectedHotel.id, values) : handleAddHotel}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default HotelsPage;
