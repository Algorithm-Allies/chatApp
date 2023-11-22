import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn"; // Password strength estimator library

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Create() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    dateOfBirth: "",
    confirmPassword: "",
  });
  const navigate = useNavigate(); // Use useNavigate

  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Password strength estimation using zxcvbn
    const passwordResult = zxcvbn(formData.password);
    setPasswordStrength(passwordResult.score);
  }, [formData.password]);

  // Handle input changes
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure values from formData
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      dateOfBirth,
      confirmPassword,
    } = formData;

    // Perform validation checks
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Full Name must not be empty.");
      return;
    }

    // Password strength estimation
    const passwordResult = zxcvbn(password);
    const passwordStrength = passwordResult.score;

    if (passwordStrength < 0) {
      alert("Password is weak. Please use a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // If all validations pass, proceed with form submission using Axios
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/users/",
        {
          firstName,
          lastName,
          email,
          password,
          username,
          dateOfBirth,
          profilePhoto: "",
        },
        config
      );

      // Handle successful response
      alert("Sign up success!");
      console.log("formData:", formData);
      console.log("Server response:", data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chat-page");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    console.log("nice");
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center flex h-screen justify-center items-center"
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md  sm:w-96 w-11/12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Ripple</h2>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChanges}
              required
            />
            {!formData.email && formData.email !== "" ? (
              <p className="text-red-500">Email must not be empty.</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateOfBirth"
              className="text-gray-700 font-semibold"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.dateOfBirth}
              onChange={handleInputChanges}
              required
            />
            {!formData.dateOfBirth && formData.dateOfBirth !== "" ? (
              <p className="text-red-500">Date of Birth must not be empty.</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="text-gray-700 font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.firstName}
              onChange={handleInputChanges}
              required
            />
            {!formData.firstName && formData.firstName !== "" ? (
              <p className="text-red-500">First Name must not be empty.</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="text-gray-700 font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.lastName}
              onChange={handleInputChanges}
              required
            />
            {!formData.lastName && formData.lastName !== "" ? (
              <p className="text-red-500">Last Name must not be empty.</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.username}
              onChange={handleInputChanges}
              required
            />
            {formData.username.length < 8 && formData.username !== "" ? (
              <p className="text-red-500">
                Username must be at least 8 characters.
              </p>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.password}
              onChange={handleInputChanges}
              required
            />

            <p className="text-sm mt-1">
              Password strength: {passwordStrength}/4
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleInputChanges}
              required
            />
            {formData.confirmPassword !== "" &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-500">Passwords must match.</p>
              )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Create;
