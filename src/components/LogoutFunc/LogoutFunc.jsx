import React from "react";

export const handleLogout = (e, navigate) => {
  e.preventDefault();
  localStorage.removeItem("token");
  navigate("/");
  console.log("loging out");
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
      localStorage.removeItem("token");
      return true;
    }
  }

  return false;
};
