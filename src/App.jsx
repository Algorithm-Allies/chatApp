import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './pages/login'; 
import Create from './pages/create';
import './pages/login.css'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element={<Create />} />
        </Routes>
    );
};

export default App;