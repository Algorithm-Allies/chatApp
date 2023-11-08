import React, { useState } from "react";

function Create() {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("create acount clicked!");
    console.log("Email: ", email);
    console.log("Date of Birth: ", dateOfBirth);
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="form-input"
              value={email}
              onChange={handleInputChanges}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateofbirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="text"
              id="dateofbirth"
              name="dateofbirth"
              placeholder="MM/DD/YYYY"
              className="form-input"
              value={dateOfBirth}
              onChange={handleInputChanges}
            />
          </div>
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
            />
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
            />
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
            />
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
