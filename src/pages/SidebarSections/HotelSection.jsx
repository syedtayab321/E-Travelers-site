import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import HotelDetailsModal from "./../../Models/HotelModals/HotelDetailsModal";
import HotelFormModal from "./../../Models/HotelModals/HotelModalForm";

const HotelsPage = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Luxury Hotel",
      location: "Dubai",
      price: "$200/night",
      rating: 4.5,
      phone: "+971 123 4567",
      email: "contact@luxuryhotel.com",
      website: "https://luxuryhotel.com",
      image: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
      details: {
        amenities: ["Pool", "Spa", "Gym", "Free WiFi"],
        description: "A luxurious hotel with world-class amenities.",
      },
    },
    {
      id: 2,
      name: "City Inn",
      location: "New York",
      price: "$150/night",
      rating: 4.0,
      phone: "+1 234 567 890",
      email: "info@cityinn.com",
      website: "https://cityinn.com",
      image: "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg",
      details: {
        amenities: ["Restaurant", "Bar", "Free WiFi"],
        description: "A comfortable hotel in the heart of the city.",
      },
    },
  ]);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setIsDetailsModalOpen(true);
  };

  const handleAddEditHotel = (hotel = null) => {
    setIsEdit(!!hotel);
    setSelectedHotel(hotel);
    setIsFormModalOpen(true);
  };

  const handleDeleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const handleFormSubmit = (values) => {
    if (isEdit) {
      setHotels(hotels.map((hotel) => (hotel.id === selectedHotel.id ? { ...hotel, ...values } : hotel)));
    } else {
      setHotels([...hotels, { ...values, id: hotels.length + 1 }]);
    }
    setIsFormModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-10 drop-shadow-lg">
        Hotel Management
      </h1>
      <div className="flex justify-end mb-8">
        <button
          onClick={() => handleAddEditHotel()}
          className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-xl transform transition hover:scale-110"
        >
          <FaPlus className="mr-2" /> Add New Hotel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900">{hotel.name}</h2>
              <p className="text-gray-700 mt-1">{hotel.location}</p>
              <p className="text-gray-700 mt-1">Phone: {hotel.phone}</p>
              <p className="text-gray-700 mt-1">Email: {hotel.email}</p>
              <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {hotel.website}
              </a>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < Math.floor(hotel.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-700 font-medium">{hotel.rating}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mt-2">{hotel.price}</p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => handleViewDetails(hotel)}
                  className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-transform transform hover:scale-110"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleAddEditHotel(hotel)}
                  className="p-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-transform transform hover:scale-110"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteHotel(hotel.id)}
                  className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform transform hover:scale-110"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isDetailsModalOpen && (
        <HotelDetailsModal
          hotel={selectedHotel}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      {isFormModalOpen && (
        <HotelFormModal
          hotel={selectedHotel}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleFormSubmit}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default HotelsPage;