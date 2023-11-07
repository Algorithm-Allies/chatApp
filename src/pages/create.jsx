
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";


function Create() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validFullName, setValidFullName] = useState(false)
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validConfirmPassword, setValidConfirmPassword] = useState(false)

  useEffect(() => {
    if (fullName.length > 0) {
      setValidFullName(true)
    } else {
      setValidFullName(false)
    }

    if (username.length >= 8) {
      setValidUsername(true)
    } else {
      setValidUsername(false)
    }

    if (password.length >= 8) {
      setValidPassword(true)
      console.log('password is valid')
    } else {
      console.log('password not at least 8 characters')
      setValidPassword(false)
    }

    if (password === confirmPassword && confirmPassword.length >= 8) {
      setValidConfirmPassword(true)
      console.log('they match and are both at least 8 characters')
    } else {
      setValidConfirmPassword(false)
      console.log('they do not match or are both not at least 8 characters')
    }
  }, [password, confirmPassword, fullName, username])


  const handleInputChanges = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "confirm-password") {
      setConfirmPassword(e.target.value)
    } else if (e.target.id === "fullname") {
      setFullName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validFullName && validUsername && validPassword && validConfirmPassword) {
      alert('Sign up success!')
    } else {
      alert('Sign up fail!')
    }
    console.log("create acount clicked!");
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
            {!validFullName && fullName !== '' ? <p>Full Name must not be empty.</p> : null}
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
            {!validUsername && username !== '' ? <p>Username must be at least 8 characters.</p> : null}
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
            {!validPassword && password !== '' ? <p>Password must be at least 8 characters.</p> : null}
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
            {!validConfirmPassword && confirmPassword !== '' ? <p>Passwords must match.</p> : null}
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
