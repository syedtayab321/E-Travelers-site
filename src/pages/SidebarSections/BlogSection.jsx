import React, { useState, useEffect } from "react";
import BlogFormModal from "./../../Models/BlogModals/BlogFormModal";
import BlogDetailsModal from "./../../Models/BlogModals/BlogDetailsModal";
import { FaEdit, FaTrash, FaEye, FaPlus, FaBook } from "react-icons/fa";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../../services/BlogServices";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from Firestore on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSave = async (blog) => {
    try {
      if (blog.id) {
        // Update existing blog
        await updateBlog(blog.id, blog);
      } else {
        // Add new blog
        await addBlog(blog);
      }
      setIsModalOpen(false);
      setEditBlog(null);
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center shadow-md transition duration-200"
          >
            <FaPlus className="mr-2" /> Add Blog
          </button>
        </div>

        {/* Blog Cards Grid or No Blogs Found Message */}
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
            <FaBook className="text-6xl text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Blogs Found</h2>
            <p className="text-gray-500 mt-2">Start by adding your first blog!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <img src={blog.image} alt="Blog" className="w-full h-40 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-3 text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{blog.content.substring(0, 80)}...</p>
                <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                  <span>By {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-blue-600 flex items-center hover:text-blue-800 transition duration-200"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  <button
                    onClick={() => {
                      setEditBlog(blog);
                      setIsModalOpen(true);
                    }}
                    className="text-green-600 flex items-center hover:text-green-800 transition duration-200"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 flex items-center hover:text-red-800 transition duration-200"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <BlogFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditBlog(null);
          }}
          onSave={handleSave}
          editBlog={editBlog}
        />
      )}
      {selectedBlog && <BlogDetailsModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
    </div>
  );
};

export default BlogPage;