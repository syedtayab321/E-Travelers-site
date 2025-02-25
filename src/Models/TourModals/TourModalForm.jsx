import React, { useState } from "react";
import CityDropdown from "../../components/citiesDropDown";
import { FaTimes } from "react-icons/fa";
import { tourTypes, priceOptions } from "../../components/TourLists";

export const TourModalForm = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    tour || {
      name: "",
      location: "",
      tourType: "",
      pricePerPerson: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform scale-95 animate-fade-in">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {tour ? "Edit Tour" : "Add New Tour"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Tour Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Tour Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <CityDropdown
              selectedCity={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* Tour Type Dropdown */}
          <div className="relative">
            <select
              name="tourType"
              value={formData.tourType}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            >
              <option value="">Select Tour Type</option>
              {tourTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price Per Person Dropdown */}
          <div className="relative">
            <select
              name="pricePerPerson"
              value={formData.pricePerPerson}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            >
              <option value="">Select Price Per Person</option>
              {priceOptions.map((price, index) => (
                <option key={index} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>

          {/* Tour Description */}
          <div className="relative">
            <textarea
              name="description"
              placeholder="Tour Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none h-28 resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-200"
            >
              Save Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
