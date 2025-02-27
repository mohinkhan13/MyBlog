import { createContext, useState, useEffect } from "react";
import authApi from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTokens = JSON.parse(localStorage.getItem("tokens"));
    if (savedTokens) {
      authApi
        .getCurrentUser(savedTokens.access)
        .then((userData) => {
          setUser(userData);
          setTokens(savedTokens);
        })
        .catch((err) => {
          console.error("Failed to fetch current user:", err);
          setUser(null);
          setTokens(null);
          localStorage.removeItem("tokens");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await authApi.loginUser(email, password);
    setUser({ ...data.user, is_superuser: data.user.is_superuser });
    setTokens(data.tokens);
    localStorage.setItem("tokens", JSON.stringify(data.tokens));
    console.log("Login Successful, User:", data.user);
    return data.redirect;
  };

  const logout = async () => {
    if (tokens) {
      try {
        await authApi.logoutUser(tokens.refresh, tokens.access);
        console.log("Logout successful");
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
    setUser(null);
    setTokens(null);
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading, tokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
