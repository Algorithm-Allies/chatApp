import React, { useEffect, useState } from "react";

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
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              className="form-input"
              value={fullName}
              onChange={handleInputChanges}
              required
            />
            {!validFullName && fullName !== '' ? <p>Full Name must not be empty.</p> : null}
          </div>
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
              onChange={handleInputChanges}
              required
            />
            {!validUsername && username !== '' ? <p>Username must be at least 8 characters.</p> : null}
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
          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
