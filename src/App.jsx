import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import "./styles/login.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile";
import { ChatProvider } from "./context/Context";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "./components/LogoutFunc/LogoutFunc";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      if (isTokenExpired()) {
        localStorage.clear();
        navigate("/");
      }
    };

    checkTokenValidity();
  }, [navigate]);

  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-page" element={<ChatPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </ChatProvider>
  );
};

export default App;
