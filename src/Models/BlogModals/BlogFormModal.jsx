import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { blogTags } from "../../components/tagsList";

const BlogFormModal = ({ isOpen, onClose, onSave, editBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    author: "",
    blogType: "",
    tags: [],
    content: "",
  });

  useEffect(() => {
    if (editBlog) {
      setBlog({ ...editBlog });
    } else {
      setBlog({ title: "", image: "", author: "", blogType: "", tags: [], content: "" });
    }
  }, [editBlog]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleBlogTypeChange = (e) => {
    setBlog({ ...blog, blogType: e.target.value, tags: [] });
  };

  const handleTagChange = (tag) => {
    const updatedTags = blog.tags.includes(tag)
      ? blog.tags.filter((t) => t !== tag)
      : [...blog.tags, tag];

    setBlog({ ...blog, tags: updatedTags });
  };

  const handleSave = () => {
    onSave(blog);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl relative  max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
        >
          <FaTimes size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          {editBlog ? "Edit Blog" : "Create New Blog"}
        </h2>

        {/* Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Blog Title */}
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={blog.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={blog.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={blog.author}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Blog Type Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Blog Type</label>
            <select
              name="blogType"
              value={blog.blogType}
              onChange={handleBlogTypeChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Blog Type</option>
              {Object.keys(blogTags).map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Preview */}
        {blog.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={blog.image}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          </div>
        )}

        {/* Tag Selection */}
        {blog.blogType && (
          <div className="border border-gray-300 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-2">Select Tags:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {blogTags[blog.blogType].map((tag, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={blog.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="h-4 w-4 accent-blue-500"
                  />
                  <span className="text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Content Input */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Content</label>
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            value={blog.content}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editBlog ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;
