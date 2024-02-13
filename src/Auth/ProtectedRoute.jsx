import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = ({ Component }) => {
  const token = localStorage.getItem("token");

  const isTokenValid = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp > currentTime;
    }
    return false; // If token doesn't exist, consider it invalid
  };
  const auth = token && isTokenValid();
  return auth ? <Component /> : <Navigate to="/" />;
};
export default ProtectedRoute;
