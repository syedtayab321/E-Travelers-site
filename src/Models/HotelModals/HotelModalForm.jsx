import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HotelFormModal = ({ hotel, onClose, onSubmit, isEdit }) => {
  const initialValues = hotel || {
    name: "",
    location: "",
    price: "",
    rating: "",
    image: "",
    phone: "",
    email: "",
    website: "",
    featured: false,
    details: {
      amenities: "",
      description: "",
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.string().required("Price is required"),
    rating: Yup.number().required("Rating is required"),
    image: Yup.string().required("Image URL is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    website: Yup.string().url("Invalid URL"),
    details: Yup.object({
      amenities: Yup.string().required("Amenities are required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/5 lg:w-2/5 p-6 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Hotel" : "Add New Hotel"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <Field name="name" className="w-full border p-2 rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Location</label>
              <Field name="location" className="w-full border p-2 rounded" />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <Field name="price" className="w-full border p-2 rounded" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Rating</label>
              <Field name="rating" type="number" className="w-full border p-2 rounded" />
              <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Image URL</label>
              <Field name="image" className="w-full border p-2 rounded" />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <Field name="phone" className="w-full border p-2 rounded" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <Field name="email" className="w-full border p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Website</label>
              <Field name="website" className="w-full border p-2 rounded" />
              <ErrorMessage name="website" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Amenities</label>
              <Field name="details.amenities" as="textarea" className="w-full border p-2 rounded" />
              <ErrorMessage name="details.amenities" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <Field name="details.description" as="textarea" className="w-full border p-2 rounded" />
              <ErrorMessage name="details.description" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Field type="checkbox" name="featured" className="w-5 h-5" />
              <label className="text-gray-700">Featured Hotel</label>
            </div>
            
            <div className="col-span-2 mt-6 flex justify-end gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {isEdit ? "Update Hotel" : "Add Hotel"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default HotelFormModal;
