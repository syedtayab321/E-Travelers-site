import React, { useState, useEffect } from "react";
import BlogFormModal from "../../Models/BlogModals/BlogFormModal";
import BlogDetailsModal from "../../Models/BlogModals/BlogDetailsModal";
import { FaEdit, FaTrash, FaEye, FaPlus, FaBook } from "react-icons/fa";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../../services/BlogServices";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogsData = await getBlogs();
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (blog) => {
    setLoading(true);
    try {
      if (blog.id) {
        await updateBlog(blog.id, blog);
      } else {
        await addBlog(blog);
      }
      setIsModalOpen(false);
      setEditBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
            <FaBook className="inline-block text-blue-600 mr-2" />
            My Blogs
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-lg flex items-center shadow-lg transform hover:scale-105 transition duration-300"
          >
            <FaPlus className="mr-2" /> Add Blog
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Blog Cards or No Blogs Message */}
        {blogs.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-xl border border-gray-200">
            <FaBook className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">No Blogs Found</h2>
            <p className="text-gray-500 mt-2">Start by adding your first blog!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition duration-300"
              >
                {/* Blog Image */}
                <div className="relative">
                  <img
                    src={blog.image}
                    alt="Blog"
                    className="w-full h-44 object-cover rounded-lg"
                  />
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                    {blog.date}
                  </span>
                </div>

                {/* Blog Title & Content */}
                <h2 className="text-2xl font-bold mt-4 text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {blog.content.substring(0, 100)}...
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-2 mt-3 text-gray-500 text-sm">
                  <span>✍ By {blog.author}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center"
                  >
                    <FaEye className="mr-1" /> View
                  </button>
                  <button
                    onClick={() => {
                      setEditBlog(blog);
                      setIsModalOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800 transition duration-300 flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300 flex items-center"
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
