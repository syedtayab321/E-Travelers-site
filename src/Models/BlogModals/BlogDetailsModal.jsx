import React from "react";
import { FaTimes } from "react-icons/fa";

const BlogDetailsModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg p-4 z-50">
      <div className="bg-white bg-opacity-90 p-6 md:p-8 rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all duration-300 scale-100 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-all duration-200"
        >
          <FaTimes size={22} />
        </button>

        {/* Blog Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center shadow-md mb-4">
          {blog.title}
        </h2>

        {/* Blog Image */}
        <div className="mt-4">
          <img 
            src={blog.image} 
            alt="Blog" 
            className="w-full h-64 md:h-72 object-cover rounded-xl shadow-lg border border-gray-300"
          />
        </div>

        {/* Blog Author & Type */}
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
          <span className="text-gray-600 text-lg font-medium">
            ✍️ Author: <span className="text-gray-800 font-semibold">{blog.author}</span>
          </span>
          <span className="text-gray-600 text-lg font-medium">
            🏷 Blog Type: <span className="text-blue-600 font-semibold">{blog.blogType}</span>
          </span>
        </div>

        {/* Blog Content */}
        <div className="mt-6">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {blog.content}
          </p>
        </div>

        {/* Blog Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">🔖 Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={onClose} 
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsModal;
