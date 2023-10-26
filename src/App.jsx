import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Home from "./pages/homePage/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default App;
