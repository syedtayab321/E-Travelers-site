import React, { useEffect, useState } from "react";
import { FaHotel, FaPlane, FaMapMarkedAlt, FaPassport } from "react-icons/fa";
import { getOrdersWithDetails } from "../../services/OrderServices";
import OrderDetailsModal from "../../Models/OrdersModal/OrderDetailsModal";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("visa");

  // Fetch orders from Firestore using the new function
  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getOrdersWithDetails();
      let formattedOrders = [];

      // Flatten the orders with their orderDetails
      allOrders.forEach((order) => {
        order.orderDetails.forEach((detail) => {
          formattedOrders.push({
            id: detail.id,
            type: order.type, // Main order type
            ...detail, // Subcollection details
          });
        });
      });

      setOrders(formattedOrders);
    };

    fetchOrders();
  }, []);

  // Get icon based on order type
  const getIcon = (type) => {
    switch (type) {
      case "hotel":
        return <FaHotel className="text-5xl text-blue-500" />;
      case "flight":
        return <FaPlane className="text-5xl text-green-500" />;
      case "tour":
        return <FaMapMarkedAlt className="text-5xl text-purple-500" />;
      case "visa":
        return <FaPassport className="text-5xl text-orange-500" />;
      default:
        return null;
    }
  };

  // Handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Categorize orders
  const filteredOrders = orders.filter((order) => order.type === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        My Orders
      </h1>

      {/* Section Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["visa", "tour", "flight", "hotel"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveSection(type)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeSection === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Orders
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex items-center justify-between">
                <div className="mb-4">{getIcon(order.type)}</div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    order.status === "Confirmed" || order.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-2">
                {order.title || "Order Details"}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                📅 Date: <span className="font-medium">{order.date}</span>
              </p>

              <div className="mt-3 text-gray-700 text-sm space-y-1">
                {order.type === "hotel" && (
                  <>
                    <p>🏨 <strong>{order.hotelName}</strong></p>
                    <p>📍 {order.location}</p>
                    <p>🛏️ {order.roomType}</p>
                    <p>👥 Guests: {order.guests}</p>
                    <p>💰 Price: <strong>{order.price}</strong></p>
                  </>
                )}
                {order.type === "flight" && (
                  <>
                    <p>✈️ Airline: {order.airline}</p>
                    <p>🔢 Flight No: {order.flightNo}</p>
                    <p>🛫 {order.from} ➡️ {order.to}</p>
                    <p>🕒 Departure: {order.departure}</p>
                    <p>💼 Baggage: {order.baggage}</p>
                    <p>💰 Price: <strong>{order.price}</strong></p>
                  </>
                )}
                {order.type === "tour" && (
                  <>
                    <p>🌍 {order.tourName}</p>
                    <p>📍 {order.location}</p>
                    <p>📅 Duration: {order.duration}</p>
                    <p>🚙 Transport: {order.transport}</p>
                    <p>🍽️ Meals: {order.meals}</p>
                    <p>💰 Price: <strong>{order.price}</strong></p>
                  </>
                )}
                {order.type === "visa" && (
                  <>
                    <p>🌎 Country: {order.country}</p>
                    <p>📑 Type: {order.type}</p>
                    <p>📅 Applied: {order.applicationDate}</p>
                    <p>✅ Approved: {order.approvalDate}</p>
                    <p>⌛ Validity: {order.validity}</p>
                    <p>💰 Fee: <strong>{order.price}</strong></p>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No {activeSection} orders available.
          </p>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
