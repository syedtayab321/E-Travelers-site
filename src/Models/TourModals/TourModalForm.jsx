import React, { useState } from "react";
import CityDropdown from "../../components/citiesDropDown";
import { FaTimes } from "react-icons/fa";
import { tourTypes } from "../../components/TourLists";

export const TourModalForm = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    tour || {
      name: "",
      location: "",
      tourType: "",
      pricePerPerson: "",
      description: "",
      duration: "",
      startDate: "",
      includedServices: [],
      excludedServices: [],
    }
  );

  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleListChange = (e, listName) => {
    setFormData({
      ...formData,
      [listName]: e.target.value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await onSave(formData); // Simulating API call
    } catch (error) {
      console.error("Error saving tour:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-transform scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {tour ? "Edit Tour" : "Add New Tour"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tour Name */}
            <input
              type="text"
              name="name"
              placeholder="Tour Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />

            {/* City Dropdown */}
            <CityDropdown
              selectedCity={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            {/* Tour Type Dropdown */}
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

            {/* Price Per Person */}
            <input
              type="number"
              name="pricePerPerson"
              value={formData.pricePerPerson}
              onChange={handleChange}
              placeholder="Enter Price Per Person"
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
              min="0"
            />

            {/* Duration */}
            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g., 3 Days, 2 Nights)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />

            {/* Start Date */}
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />

            {/* Included Services */}
            <input
              type="text"
              name="includedServices"
              placeholder="Included Services (comma-separated)"
              value={formData.includedServices.join(", ")}
              onChange={(e) => handleListChange(e, "includedServices")}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />

            {/* Excluded Services */}
            <input
              type="text"
              name="excludedServices"
              placeholder="Excluded Services (comma-separated)"
              value={formData.excludedServices.join(", ")}
              onChange={(e) => handleListChange(e, "excludedServices")}
              className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Tour Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none h-28 resize-none"
          ></textarea>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
              onClick={onClose}
              disabled={loading} // Disable button while loading
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md hover:opacity-90 transition duration-200 flex items-center justify-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Tour"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
