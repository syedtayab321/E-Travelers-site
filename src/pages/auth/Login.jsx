import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/AuthServices";

function Login() {
  const [loading, setLoading] = useState(false); // State for Loader
  const [error, setError] = useState(""); // State for Error Handling
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await loginUser(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Welcome Back</h1>
          <p className="text-sm text-white/80 text-center mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="h-4 w-4 text-blue-600 border-gray-300 rounded" {...register("rememberMe")} />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button with Loader */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-white border-2 rounded-full" viewBox="0 0 24 24"></svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
