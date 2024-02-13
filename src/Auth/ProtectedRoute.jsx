import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../components/LogoutFunc/LogoutFunc";

const ProtectedRoute = ({ Component }) => {
  const auth = isTokenExpired();
  return auth ? <Component /> : <Navigate to="/" />;
};
export default ProtectedRoute;
