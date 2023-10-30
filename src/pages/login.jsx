import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validUsername && validPassword) {
      alert("Login success!");
    } else {
      alert("Login fail!");
    }
    console.log("Login clicked!");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <div
      className=" bg-cover bg-no-repeat bg-center flex h-screen justify-center items-center "
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96 sm:w-72 flex flex-col ">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Ripple</h2>
        <form onSubmit={handleSubmit}>
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
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            Create Account
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/create-account"
            className="text-blue-500 hover:text-blue-800"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>

    // <div className="login-page">
    //   <div className="login-container">
    //     <h1 className="heading">Ripple</h1>
    //     <form onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label htmlFor="username" className="form-label">
    //           Username
    //         </label>
    //         <input
    //           type="text"
    //           id="username"
    //           name="username"
    //           placeholder="Enter your username"
    //           className="form-input"
    //           value={username}
    //           onChange={handleUsernameChange}
    //         />
    //         {!validUsername && username !== '' ? <p className="validation-error">Username must be at least 8 characters.</p> : null}
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password" className="form-label">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           placeholder="Enter your password"
    //           className="form-input"
    //           value={password}
    //           onChange={handlePasswordChange}
    //         />
    //         {!validPassword && password !== '' ? <p className="validation-error">Password must be at least 8 characters.</p> : null}
    //       </div>
    //       <button type="submit" className="login-button">
    //         Login
    //       </button>
    //     </form>
    //     <p className="login-create-account">
    //       Don't have an account?
    //       <Link to="/create-account" className="create-account-link">
    //         Create an account
    //       </Link>
    //     </p>
    //   </div>
    // </div>
  );
}

export default Login;
