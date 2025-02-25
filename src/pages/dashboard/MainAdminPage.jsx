import React, { useState } from "react";
import AdminSidebar from '../../components/adminSidebar';
import FlightsPage from './../SidebarSections/FlightsSection';
import BlogPage from './../SidebarSections/BlogSection';
import VisaManagement from "../SidebarSections/VisaSection";
import TourList from "../SidebarSections/TourSection";
import OrdersPage from "../SidebarSections/OrdersSection";
import ReviewsPage from "../SidebarSections/ReviewsSection";
import HotelsPage from "../SidebarSections/HotelSection";
const MainAdminPage = () => {
  const [selectedSection, setSelectedSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        onSelect={handleSelect}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6">
          {/* Render the selected section */}
          {selectedSection === "flights" && <FlightsPage />}
          {selectedSection === "blogs" && <BlogPage />}
          {selectedSection === "visas" && <VisaManagement />}
          {selectedSection === "tours" && <TourList />}
          {selectedSection === "orders" && <OrdersPage />}
          {selectedSection === "reviews" && <ReviewsPage />}
          {selectedSection === "hotels" && <HotelsPage />}
        </div>
      </div>
    </div>
  );
};

export default MainAdminPage;