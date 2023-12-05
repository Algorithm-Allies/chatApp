import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../AuthContext";

import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const { login } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length >= 8) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = username
    if (email && validPassword) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const userData = response.data;
          login(userData);
          alert("Login success!");
        } else {
          alert("Login failed. Please check your email and password.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again later.");
      }
    } else {
      alert("Please enter a valid email and password.");
    }
  };
  return (
    <div
      className=" bg-cover bg-no-repeat bg-center flex h-screen justify-center items-center "
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md sm:w-96 w-11/12 flex flex-col items-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Ripple</h2>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-gray-700 font-semibold block mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={handleUsernameChange}
            />
            {!validUsername && username !== "" && (
              <p className="text-red-500 text-xs italic">
                Username must be at least 8 characters.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
            {!validPassword && password !== "" && (
              <p className="text-red-500 text-xs italic">
                Password must be at least 8 characters.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/create-account"
            className="text-blue-500 hover:text-blue-800"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
