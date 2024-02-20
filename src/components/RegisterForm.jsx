import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn"; // Password strength estimator library
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

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
      username,
      password,
      confirmPassword,
      dateOfBirth,
    } = formData;

    // Perform validation checks
    if (firstName.trim() === "") {
      alert("First Name must not be empty.");
      return console.log("First Name must not be empty.");
    }

    if (lastName.trim() === "") {
      alert("Last Name must not be empty.");
      return console.log("Last Name must not be empty.");
    }

    if (dateOfBirth.trim() === "") {
      alert("Date of birth must not be empty.");
    } else {
      const [day, month, year] = dateOfBirth.split("-");
      const birthDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

      if (birthDate > eighteenYearsAgo) {
        console.log("You must be 18 years or older to register.");
        return; // Exit the function if under 18
      }
    }

    if (email.trim() === "") {
      alert("Email must not be empty.");
      return console.log("Email must not be empty.");
    }

    if (username.length < 5) {
      alert("Username must be at least 5 characters.");
      return console.log("Username must be at least 5 characters.");
    }

    // Password strength estimation
    const passwordResult = zxcvbn(password);
    const passwordStrength = passwordResult.score;

    if (passwordStrength <= 2) {
      alert("Password is weak. Please use a stronger password.");
      return console.log("Password is weak. Please use a stronger password.");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return console.log("Passwords do not match.");
    }

    // If all validations pass, proceed with form submission
    try {
      const response = await axios.post(
        "http://localhost:3500/api/users",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Network response was not ok.");
      }

      alert("Registration successful!");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      alert("There was an error registering the user.");
    }
  };
  return (
    <form className="flex flex-col w-full max-h-screen" onSubmit={handleSubmit}>
      <div className="mb-4 md:flex md:flex-row flex-col w-full items-start justify-center">
        <div className="firstName">
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
            <p className="text-red-500">F First name must not be empty.</p>
          ) : null}
        </div>
        <div className="lastName">
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
            <p className="text-red-500">FLast name must not be empty.</p>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="text-gray-700 font-semibold">
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
        {formData.username.length < 5 && formData.username !== "" ? (
          <p className="text-red-500">
            Username must be at least 5 characters.
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

        <p className="text-sm mt-1">Password strength: {passwordStrength}/4</p>
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
          className=" w-full border rounded px-3 py-2 focus:border-blue-500"
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
        className="w-full mt-3 bg-dark-blue text-white font-semibold py-2 rounded hover:bg-medium-blue focus:outline-none"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
