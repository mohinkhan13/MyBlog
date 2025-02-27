import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const redirect = await login(formData.email, formData.password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate(redirect || "/");
      }, 2000);
    } catch (err) {
      setError(err.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Link
          to="/"
          className="absolute p-1 transition rounded-full top-4 right-4 hover:bg-gray-100"
        >
          <i className="text-xl text-gray-500 ri-close-line hover:text-gray-700"></i>
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center flex-1 gap-3 px-4 py-3 transition bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <i className="ri-google-fill text-[#DB4437] text-2xl"></i>
            <span className="font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center flex-1 gap-3 px-4 py-3 transition bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <i className="ri-facebook-fill text-[#1877F2] text-2xl"></i>
            <span className="font-medium text-gray-700">Facebook</span>
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Or continue with
            </span>
          </div>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
              <a
                href="#"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-600 transition hover:text-gray-500 focus:outline-none"
              >
                Forgot?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
