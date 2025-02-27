import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authApi from "../api/authApi";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Add success state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const registerData = await authApi.registerUser({
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      const loginData = await login(formData.email, formData.password);
      setSuccess("Registration successful! Redirecting...");
      // Wait for state to update before redirect
      setTimeout(() => {
        navigate(loginData.redirect || "/");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.error ||
        err.message ||
        (typeof err === "object" ? JSON.stringify(err) : err) ||
        "Signup failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-lg p-8 mx-auto space-y-6 bg-white rounded-lg shadow-xl">
        <Link
          to="/"
          className="absolute p-1 rounded-full top-4 right-4 hover:bg-gray-100"
        >
          <i className="text-xl text-gray-500 ri-close-line hover:text-gray-700"></i>
        </Link>
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-gray-600">Start your blogging journey</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center flex-1 gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <i className="ri-google-fill text-[#DB4437] text-2xl"></i>
            <span className="font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center flex-1 gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <i className="ri-facebook-fill text-[#1877F2] text-2xl"></i>
            <span className="font-medium text-gray-700">Facebook</span>
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or sign up with</span>
          </div>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && (
          <p className="text-center text-green-500">{success}</p>
        )}{" "}
        {/* Add success message */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Form JSX remains the same */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
