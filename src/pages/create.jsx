import React, { useState } from "react";
import { Link } from "react-router-dom";

function Create() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChanges = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "fullname") {
      setFullName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            />
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
            />
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
            />
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
