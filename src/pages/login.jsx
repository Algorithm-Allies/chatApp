import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length >= 8) {
      setValidUsername(true)
    } else {
      setValidUsername(false)
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validUsername && validPassword) {
      alert('Login success!')
    } else {
      alert('Login fail!')
    }
    console.log("Login clicked!");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="heading">Ripple</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="form-input"
              value={username}
              onChange={handleUsernameChange}
            />
            {!validUsername && username !== '' ? <p className="validation-error">Username must be at least 8 characters.</p> : null}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="form-input"
              value={password}
              onChange={handlePasswordChange}
            />
            {!validPassword && password !== '' ? <p className="validation-error">Password must be at least 8 characters.</p> : null}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-create-account">
          Don't have an account?
          <Link to="/create-account" className="create-account-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
