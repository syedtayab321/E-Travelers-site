import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { categoriesList } from "../../components/CategoriesList";

const BlogFormModal = ({ isOpen, onClose, onSave, editBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    author: "",
    category: "",
    tags: [],
    content: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editBlog) {
      setBlog({ ...editBlog });
    } else {
      setBlog({ title: "", image: "", author: "", category: "", tags: [], content: "" });
    }
  }, [editBlog]);

  // Handle input changes
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setBlog({ ...blog, category: e.target.value });
  };

  // Handle adding a tag
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setBlog({ ...blog, tags: [...blog.tags, tagInput.trim()] });
      setTagInput(""); // Clear input
    }
  };

  // Remove a tag
  const handleRemoveTag = (index) => {
    setBlog({ ...blog, tags: blog.tags.filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    onSave(blog);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{editBlog ? "Edit Blog" : "Create New Blog"}</h2>

        {/* Image Preview */}
        {blog.image && (
          <div className="mb-3">
            <img src={blog.image} alt="Preview" className="w-full h-40 object-cover rounded" />
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blog.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={blog.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={blog.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Category Selector */}
          <select
            name="category"
            value={blog.category}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Category</option>
            {categoriesList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Tag Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Add a tag (Press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full p-2 border rounded"
            />
            {/* Tag Display */}
            <div className="flex flex-wrap mt-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
                >
                  {tag}
                  <FaTimes
                    className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                    size={14}
                    onClick={() => handleRemoveTag(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          <textarea
            name="content"
            placeholder="Write your blog content here..."
            value={blog.content}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editBlog ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;
