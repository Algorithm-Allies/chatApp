import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import "./styles/login.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<Register />} />

      <Route path="/chat-page" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
