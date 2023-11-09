
import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn"; // Password strength estimator library

import { Link } from "react-router-dom";


function Create() {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (fullName.length > 0) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }

    if (username.length >= 8) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }

    // Password strength estimation using zxcvbn
    const passwordResult = zxcvbn(password);
    setPasswordStrength(passwordResult.score);

    if (passwordStrength > 2 && password === confirmPassword) {
      setValidPassword(true);
      setValidConfirmPassword(true)
    } else {
      setValidPassword(false);
      setValidConfirmPassword(false)
    }
  }, [password, confirmPassword, fullName, username]);

  const handleInputChanges = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "dateofbirth") {
      const sanitizedValue = e.target.value.replace(/[^0-9/]/g, '');
      setDateOfBirth(sanitizedValue);
    } else if (e.target.id === "fullname") {
      setFullName(e.target.value);
    } else if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "confirm-password") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validFullName &&
      validUsername &&
      validPassword &&
      validConfirmPassword
    ) {
      alert("Sign up success!");
    } else {
      alert("Sign up fail!");
    }
    console.log("validFullName:", validFullName);
    console.log("validUsername:", validUsername);
    console.log("validPassword:", validPassword);
    console.log("validConfirmPassword:", validConfirmPassword);

    console.log("create acount clicked!");
    console.log("Email: ", email);
    console.log("Date of Birth: ", dateOfBirth);
    console.log("fullName:", fullName);
    console.log("Username: ", username);
    console.log("Password: ", password);
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
            <label htmlFor="fullname" className="text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              className="w-full border rounded px-3 py-2 focus:border-blue-500"
              value={fullName}
              onChange={handleInputChanges}
              required
            />
            {!validFullName && fullName !== "" ? (
              <p>Full Name must not be empty.</p>
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
              value={username}
              onChange={handleInputChanges}
              required
            />
            {!validUsername && username !== "" ? (
              <p>Username must be at least 8 characters.</p>
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
              value={password}
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
              name="confirm-password"
              placeholder="Confirm your password"
              className="form-input"
              value={confirmPassword}
              onChange={handleInputChanges}
              required
            />
            {!validConfirmPassword && confirmPassword !== "" ? (
              <p>Passwords must match.</p>
            ) : null}
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
