import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const token = localStorage.getItem("token");
  function tokenVerify() {
    return token ? true : false;
  }
  const auth = tokenVerify();
  return auth ? <Component /> : <Navigate to="/" />;
};
export default ProtectedRoute;
