import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CityDropdown from "./../../components/citiesDropDown";
import { hotelServices, hotelFeatures } from "./../../components/hotelfeatureslist";

const HotelFormModal = ({ hotel, onClose, onSubmit, isEdit }) => {
  const initialValues = hotel || {
    name: "",
    city: "",
    exactAddress: "",
    bedrooms: 1, // Default to 1 bedroom
    price: "",
    rating: "",
    image: "",
    phone: "",
    email: "",
    website: "",
    featured: false,
    services: [], // Array to store selected services
    features: [], // Array to store selected features
    details: {
      amenities: "",
      description: "",
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    city: Yup.string().required("City is required"),
    exactAddress: Yup.string().required("Exact address is required"),
    bedrooms: Yup.number().required("Number of bedrooms is required"),
    price: Yup.string().required("Price is required"),
    rating: Yup.number().required("Rating is required"),
    image: Yup.string().required("Image URL is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    website: Yup.string().url("Invalid URL"),
    services: Yup.array().min(1, "Select at least one service"),
    features: Yup.array().min(1, "Select at least one feature"),
    details: Yup.object({
      amenities: Yup.string().required("Amenities are required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  const handleBedroomsChange = (e, setFieldValue, values) => {
    const bedrooms = parseInt(e.target.value, 10);
    setFieldValue("bedrooms", bedrooms);
    // Update price based on bedrooms (example logic)
    const basePrice = 100; // Base price for 1 bedroom
    const price = basePrice * bedrooms;
    setFieldValue("price", price);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Hotel" : "Add New Hotel"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-3xl"
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
          {({ values, setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Fields */}
              <div>
                <label className="block text-gray-700 font-medium">Hotel Name</label>
                <Field name="name" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="name" component="div" className="error-text text-red-500" />
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700 font-medium">City</label>
                <CityDropdown
                  selectedCity={values.city}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                />
                <ErrorMessage name="city" component="div" className="error-text text-red-500" />
              </div>

              {/* Exact Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Exact Address</label>
                <Field name="exactAddress" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="exactAddress" component="div" className="error-text text-red-500" />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-gray-700 font-medium">Bedrooms</label>
                <Field
                  name="bedrooms"
                  as="select"
                  className="input-field border border-gray-300 rounded-lg p-2 w-full"
                  onChange={(e) => handleBedroomsChange(e, setFieldValue, values)}
                >
                  <option value={1}>1 Bedroom</option>
                  <option value={2}>2 Bedrooms</option>
                  <option value={3}>3 Bedrooms</option>
                  <option value={4}>4 Bedrooms</option>
                </Field>
                <ErrorMessage name="bedrooms" component="div" className="error-text text-red-500" />
              </div>

              {/* Price & Rating */}
              <div>
                <label className="block text-gray-700 font-medium">Price</label>
                <Field name="price" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="price" component="div" className="error-text text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Rating</label>
                <Field name="rating" type="number" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="rating" component="div" className="error-text text-red-500" />
              </div>

              {/* Image, Phone, Email */}
              <div>
                <label className="block text-gray-700 font-medium">Image URL</label>
                <Field name="image" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="image" component="div" className="error-text text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <Field name="phone" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="phone" component="div" className="error-text text-red-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <Field name="email" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="email" component="div" className="error-text text-red-500" />
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Website</label>
                <Field name="website" className="input-field border border-gray-300 rounded-lg p-2 w-full" />
                <ErrorMessage name="website" component="div" className="error-text text-red-500" />
              </div>

              {/* Services */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Services</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotelServices.map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="services"
                        value={service}
                        className="w-5 h-5"
                      />
                      {service}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="services" component="div" className="error-text text-red-500" />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Features</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {hotelFeatures.map((feature) => (
                    <label key={feature} className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name="features"
                        value={feature}
                        className="w-5 h-5"
                      />
                      {feature}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="features" component="div" className="error-text text-red-500" />
              </div>

              {/* Amenities & Description */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Amenities</label>
                <Field name="details.amenities" as="textarea" className="input-field border border-gray-300 rounded-lg p-2 w-full h-24" />
                <ErrorMessage name="details.amenities" component="div" className="error-text text-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Description</label>
                <Field name="details.description" as="textarea" className="input-field border border-gray-300 rounded-lg p-2 w-full h-24" />
                <ErrorMessage name="details.description" component="div" className="error-text text-red-500" />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 md:col-span-2">
                <Field type="checkbox" name="featured" className="w-5 h-5" />
                <label className="text-gray-700 font-medium">Featured Hotel</label>
              </div>

              {/* Buttons */}
              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  {isEdit ? "Update Hotel" : "Add Hotel"}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HotelFormModal;