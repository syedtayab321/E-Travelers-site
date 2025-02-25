import React from "react";
import { FaTimes } from "react-icons/fa";

const BlogDetailsModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <FaTimes size={18} />
        </button>

        {/* Blog Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">{blog.title}</h2>

        {/* Blog Image */}
        <div className="mt-4">
          <img src={blog.image} alt="Blog" className="w-full h-52 object-cover rounded-lg shadow" />
        </div>

        {/* Blog Content */}
        <div className="mt-4">
          <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button onClick={onClose} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsModal;
