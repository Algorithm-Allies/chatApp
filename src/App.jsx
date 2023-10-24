import { useState } from "react";
import SignIn from "./pages/SignIn";
import "./style.scss";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
