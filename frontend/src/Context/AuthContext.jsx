import React, { createContext, useState, useEffect } from "react";
import { register, authenticate } from "../Service/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);
  

  const registerUser = async (data) => {
    try {
      const response = await register(data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUser({ token: response.data.accessToken });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await authenticate(data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUser({ token: response.data.accessToken });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
