import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      const { data } = response;

      alert("Login success!");

      // Store the JWT token in local storage but you can also use cookies
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);

      // Redirect the user to the chat page
      navigate("/chat-page");
    } catch (error) {
      // Handle login failure/error
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
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
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
            />
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
          </div>
          <button
            type="submit"
            className="w-full bg-dark-blue hover:bg-medium-blue text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-dark-blue hover:text-medium-blue"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
