import React, { useState } from "react";

const Register = () => {
  // Create state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  // Event handler to update the email state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler to update the password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <form action="">
          <span className="identifier">Full Name</span>
          <input type="text" value={fullName} onChange={handleFullNameChange} />
          <span className="identifier">Email</span>
          <input type="text" value={email} onChange={handleEmailChange} />
          <span className="identifier">Password</span>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="identifier">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button>Register</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <a href="#" className="link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
