import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Firebase Config
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import VisaFormModal from "../../Models/VisaModals/VisaFormModal";
import VisaDetailsModal from "../../Models/VisaModals/VisaDetailsModal";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const VisaManagement = () => {
  const [visas, setVisas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVisa, setEditVisa] = useState(null);
  const [selectedVisa, setSelectedVisa] = useState(null);

  const visaCollection = collection(db, "visas"); // Firebase Collection Reference

  // Fetch all visa records from Firestore
  const fetchVisas = async () => {
    try {
      const snapshot = await getDocs(visaCollection);
      setVisas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching visas:", error);
    }
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  // Save Visa (Add or Update)
  const handleSave = async (visa) => {
    try {
      // Ensure only string values are saved to Firestore
      const cleanedVisa = {
        ...visa,
        country: typeof visa.country === "object" ? visa.country.value : visa.country,
        type: typeof visa.type === "object" ? visa.type.value : visa.type,
        duration: typeof visa.duration === "object" ? visa.duration.value : visa.duration,
      };
  
      if (visa.id) {
        const visaRef = doc(db, "visas", visa.id);
        await updateDoc(visaRef, cleanedVisa);
      } else {
        await addDoc(visaCollection, cleanedVisa);
      }
  
      setIsModalOpen(false);
      setEditVisa(null);
      fetchVisas(); // Refresh List
    } catch (error) {
      console.error("Error saving visa:", error);
    }
  };
  

  // Delete Visa
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this visa?")) {
      try {
        const visaRef = doc(db, "visas", id);
        await deleteDoc(visaRef);
        setVisas(visas.filter((v) => v.id !== id));
      } catch (error) {
        console.error("Error deleting visa:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Visa Management</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditVisa(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center shadow-md hover:bg-blue-700 transition"
          >
            <FaPlus className="mr-2" /> Add Visa
          </button>
        </div>

        {/* Visa List */}
        <div className="grid md:grid-cols-2 gap-6">
          {visas.map((visa) => (
            <div key={visa.id} className="bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">{visa.country} - {visa.type}</h2>
              <p className="text-gray-600">Duration: <span className="font-semibold">{visa.duration}</span></p>
              
              {/* Action Buttons */}
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setSelectedVisa(visa)}
                  className="text-blue-600 flex items-center hover:text-blue-800 transition"
                >
                  <FaEye className="mr-1" /> View
                </button>
                <button
                  onClick={() => {
                    setEditVisa(visa);
                    setIsModalOpen(true);
                  }}
                  className="text-green-600 flex items-center hover:text-green-800 transition"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(visa.id)}
                  className="text-red-600 flex items-center hover:text-red-800 transition"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <VisaFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          editVisa={editVisa}
        />
      )}
      {selectedVisa && <VisaDetailsModal visa={selectedVisa} onClose={() => setSelectedVisa(null)} />}
    </div>
  );
};

export default VisaManagement;
