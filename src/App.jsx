import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import "./styles/login.css";
import Login from "./pages/login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/chat-page" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
