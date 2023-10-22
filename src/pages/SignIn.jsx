import React from "react";

const SignIn = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <form action="">
          <span className="title">Login</span>
          <span className="identifier">Email</span>
          <input type="text" />
          <span className="identifier">Password</span>
          <input type="text" />
          <button>Sign in </button>
        </form>
        <p>Don’t have an account?  
          <a href="#"
          className="link"> Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
