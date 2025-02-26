import React from "react";

const cities = [
  // Punjab
  "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala",
  "Sargodha", "Sialkot", "Bahawalpur", "Sheikhupura", "Jhang",
  "Gujrat", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara",
  "Wah Cantonment", "Dera Ghazi Khan", "Chiniot", "Mandi Bahauddin",
  "Hafizabad", "Khanewal", "Vehari", "Toba Tek Singh", "Jhelum",
  "Bhakkar", "Attock", "Muzaffargarh", "Layyah", "Pakpattan", "Bahawalnagar","Islamabad",

  // Sindh
  "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah",
  "Mirpur Khas", "Jacobabad", "Shikarpur", "Dadu", "Khairpur",
  "Thatta", "Umerkot", "Badin", "Tando Adam", "Tando Allahyar",
  "Ghotki", "Matiari", "Sanghar", "Kashmore", "Tando Muhammad Khan",

  // Khyber Pakhtunkhwa (KP)
  "Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat",
  "Bannu", "Dera Ismail Khan", "Nowshera", "Charsadda", "Mansehra",
  "Haripur", "Swabi", "Tank", "Buner", "Batkhela", "Chitral",
  "Hangu", "Shangla", "Lower Dir", "Upper Dir", "Lakki Marwat",
  "Torghar", "Kolai-Palas", "Orakzai", "Kurram",

  // Balochistan
  "Quetta", "Gwadar", "Khuzdar", "Turbat", "Zhob",
  "Loralai", "Dera Murad Jamali", "Chaman", "Sibi", "Pishin",
  "Mastung", "Dera Allah Yar", "Kalat", "Nushki", "Musakhel",
  "Barkhan", "Kharan", "Washuk", "Lasbela", "Awaran", "Ziarat",

  // Gilgit-Baltistan (GB)
  "Gilgit", "Skardu", "Hunza", "Diamer", "Ghanche",
  "Astore", "Ghizer", "Shigar", "Nagar", "Kharmang",

  // Azad Jammu and Kashmir (AJK)
  "Muzaffarabad", "Mirpur", "Kotli", "Rawalakot", "Bagh",
  "Haveli", "Sudhanoti", "Bhimber", "Neelum", "Jhelum Valley",
  "Pallandri"
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
