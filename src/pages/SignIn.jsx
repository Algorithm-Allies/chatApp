import React, { useState } from "react";

const SignIn = () => {
  // Create state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Event handler to update the email state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler to update the password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <form action="">
          <span className="identifier">Email</span>
          <input type="text" value={email} onChange={handleEmailChange} />
          <span className="identifier">Password</span>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button>Sign in </button>
        </form>
        <p>
          Don’t have an account? <a href="#" className="link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
