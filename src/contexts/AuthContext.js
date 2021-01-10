import React, { useState, useContext, createContext } from "react";
import Axios from "axios";
import API from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const existingTokens = localStorage.getItem("token");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentUser, setCurrentUser] = useState();

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("token", data);
    } else {
      localStorage.removeItem("token");
    }

    setAuthTokens(data);
  };

  Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        //if unauthorized, will direct back to login
        if (error.response.status === 401) {
          console.log("axios intercept");
          setAuthTokens(null);
        }
      }
      throw error;
    }
  );

  const login = async (email, password) => {
    const loginResponse = await Axios.post(`${API.url}/api/auth/login`, {
      email,
      password,
    });
    const { token, user, message } = loginResponse.data;
    setCurrentUser(user);
    setTokens(token);

    return { token, user, message };
  };

  const register = async (email, username, password) => {
    const loginResponse = await Axios.post(`${API.url}/api/auth/register`, {
      email,
      username,
      password,
    });
    const { token, user, message } = loginResponse.data;
    setCurrentUser(user);
    setTokens(token);

    return { token, user, message };
  };

  const value = {
    authTokens: authTokens,
    setAuthTokens: setTokens,
    currentUser,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
