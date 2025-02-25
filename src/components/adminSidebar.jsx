import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {FaBars,FaTimes,FaPlane,FaHotel,FaBlog,FaPassport,FaMapMarkedAlt,FaShoppingCart,FaStar,FaSignOutAlt,} from "react-icons/fa";
import LogoutModal from './../Models/LogoutModel';

const navItems = [
  { text: "Flights", icon: FaPlane, link: "flights" },
  { text: "Hotels", icon: FaHotel, link: "hotels" },
  { text: "Blogs", icon: FaBlog, link: "blogs" },
  { text: "Visas", icon: FaPassport, link: "visas" },
  { text: "Tours", icon: FaMapMarkedAlt, link: "tours" },
  { text: "Orders", icon: FaShoppingCart, link: "orders" },
  { text: "Reviews", icon: FaStar, link: "reviews" },
];

const AdminSidebar = ({ onSelect, isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("flights");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (link) => {
    setActiveItem(link);
    onSelect(link);
  };

  const handleLogout = async() => {
    navigate("/");
    await signOut(auth);
    setIsLogoutOpen(false);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-blue-200 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Title */}
      {isOpen && (
        <div className="flex items-center justify-center p-6">
          <h1 className="text-2xl font-bold italic text-orange-400">
            Etravelers Admin
          </h1>
        </div>
      )}

      {/* Sidebar Menu */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item.link)}
                className={`flex w-full items-center gap-4 rounded-lg p-3 transition-all duration-200 ${
                  activeItem === item.link
                    ? "bg-blue-700 text-white shadow-lg"
                    : "text-gray-300 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <item.icon className="h-6 w-6" />
                {isOpen && (
                  <span className="text-sm font-medium">{item.text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="flex w-full items-center gap-4 rounded-lg bg-red-600 p-3 text-white transition-all duration-200 hover:bg-red-700"
        >
          <FaSignOutAlt className="h-6 w-6" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default AdminSidebar;
