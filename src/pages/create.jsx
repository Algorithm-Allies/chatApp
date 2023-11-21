import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn"; // Password strength estimator library

import { Link } from "react-router-dom";

function Create() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure values from formData
    const { fullName, dateOfBirth, email, username, password, confirmPassword } = formData;

    // Perform validation checks
    if (fullName.trim() === "") {
      alert("Full Name must not be empty.");
      return;
    }

    if (dateOfBirth.trim() === "") {
      alert("Date of birth must not be empty.");
    } else {
      let dateOfBirthValidation = dateOfBirth.split("-");
      let dateOfBirthInMilliseconds = new Date(parseInt(dateOfBirthValidation[2], 10), parseInt(dateOfBirthValidation[1], 10) - 1 , parseInt(dateOfBirthValidation[0]), 10).getTime()
      let now = new Date().getTime()
      if (now - dateOfBirthInMilliseconds > 567648000000) {
        return;
      } else {
        alert("You must be 18 years or older to register.")
      }
    }

    if (email.trim() === "") {
      alert("Email must not be empty.");
      return;
    }

    if (username.length < 8) {
      alert("Username must be at least 8 characters.");
      return;
    }

    // Password strength estimation
    const passwordResult = zxcvbn(password);
    const passwordStrength = passwordResult.score;

    if (passwordStrength <= 2) {
      alert("Password is weak. Please use a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // If all validations pass, proceed with form submission
    alert("Sign up success!");
    console.log("formData:", formData);
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
            <label htmlFor="fullName" className="text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={formData.fullName}
              onChange={handleInputChanges}
              required
            />
            {!formData.fullName && formData.fullName !== "" ? (
              <p className="text-red-500">Full Name must not be empty.</p>
            ) : null}
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
