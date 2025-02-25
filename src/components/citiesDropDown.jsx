import React from "react";

const cities = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Murree",
  "Skardu",
  "Hunza",
  "Swat",
  "Naran",
  "Kaghan",
  "Fairy Meadows",
  "Chitral",
];

const CityDropdown = ({ selectedCity, onChange }) => {
  return (
    <select
      value={selectedCity}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Select a City</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CityDropdown;
