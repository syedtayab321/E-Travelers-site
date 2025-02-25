import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";
import countryOptions from './../../components/countriesList';
import { visaTypes, visaDurations } from "../../components/VisaLists";

const VisaFormModal = ({ isOpen, onClose, onSave, editVisa }) => {
  const [visa, setVisa] = useState({
    country: null,
    type: null,
    duration: null,
    details: "",
    requirements: "", // New field
  });

  useEffect(() => {
    if (editVisa) {
      setVisa({
        ...editVisa,
        country: countryOptions.find((c) => c.value === editVisa.country),
        type: visaTypes.find((t) => t.value === editVisa.type),
        duration: visaDurations.find((d) => d.value === editVisa.duration),
      });
    } else {
      setVisa({ country: null, type: null, duration: null, details: "", requirements: "" });
    }
  }, [editVisa, isOpen]);

  const handleSubmit = () => {
    const visaData = {
      ...visa,
      country: visa.country ? visa.country.value : "",
      type: visa.type ? visa.type.value : "",
      duration: visa.duration ? visa.duration.value : "",
    };    
  
    console.log("Visa Data before saving:", visaData);
  
    onSave(visaData);
    onClose();
  };
  
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity">
      <div className="bg-white p-6 rounded-lg w-96 shadow-2xl transform scale-100 transition-transform">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">
            {editVisa ? "Edit Visa" : "New Visa"}
          </h2>
          <button onClick={onClose} className="text-red-500 text-xl hover:text-red-700">
            <FaTimes />
          </button>
        </div>

        {/* Country Selector */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Select Country</label>
          <Select
            options={countryOptions}
            value={visa.country}
            onChange={(selectedOption) => setVisa({ ...visa, country: selectedOption })}
            className="w-full border rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Visa Type Selector */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Visa Type</label>
          <Select
            options={visaTypes}
            value={visa.type}
            onChange={(selectedOption) => setVisa({ ...visa, type: selectedOption })}
            className="w-full border rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Duration Selector */}
        <div className="mb-3">
          <label className="block text-gray-600 font-medium mb-1">Duration</label>
          <Select
            options={visaDurations}
            value={visa.duration}
            onChange={(selectedOption) => setVisa({ ...visa, duration: selectedOption })}
            className="w-full border rounded focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Additional Details */}
        <textarea
          name="details"
          placeholder="Additional Details"
          value={visa.details}
          onChange={(e) => setVisa({ ...visa, details: e.target.value })}
          className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
        />

        {/* Requirements Field */}
        <textarea
          name="requirements"
          placeholder="Requirements for this visa"
          value={visa.requirements}
          onChange={(e) => setVisa({ ...visa, requirements: e.target.value })}
          className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {editVisa ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisaFormModal;
