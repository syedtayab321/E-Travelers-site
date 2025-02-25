import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {resetPassword} from './../../services/AuthServices'
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await resetPassword(data.email);
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Forgot Password?</h1>
          <p className="text-sm text-white/80 text-center mt-2">
            Enter your email to reset your password
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 rounded-full" viewBox="0 0 24 24"></svg>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
