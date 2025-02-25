import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-[500px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{order.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {Object.entries(order.details).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
