import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const authApi = {
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login/`, {
        email,
        password,
      });
      console.log("Login Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      throw error.response?.data || "Login failed";
    }
  },

  getCurrentUser: async (accessToken) => {
    try {
      const response = await axios.get(`${API_URL}/api/current-user/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Get User Error:", error.response?.data);
      throw error.response?.data || "Failed to fetch user";
    }
  },

  logoutUser: async (refreshToken, accessToken) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/logout/`,
        { refresh: refreshToken },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || "Logout failed";
    }
  },

  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/register/`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Registration failed";
    }
  },
};

export default authApi;
