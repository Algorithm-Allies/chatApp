import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from "./pages/Create";
import ChatPage from "./pages/ChatPage";
import "./pages/login.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<Create />} />
      <Route path="/chat-page" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
