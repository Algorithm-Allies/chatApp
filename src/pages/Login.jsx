import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChanges = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login clicked!");
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-evenly p-10 bg-zinc-800 rounded-xl shadow-lg md:w-6/12 w-10/12 h-4/6 "
      >
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Login</h2>
        <div className="flex flex-col w-full">
          <div className="w-full mb-6">
            <div className="text-white">
              <h5 className="text-white">Username</h5>
            </div>
            <input
              className="w-full h-12 p-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleInputChanges}
            />
          </div>

          <div className="w-full mb-6">
            <div className="flex flex-row w-full justify-between">
              <h5 className="text-white">Password</h5>
              <a
                href="#"
                className="text-blue-500 hover:underline ml-2 text-sm"
              >
                Forgot Password
              </a>
            </div>
            <input
              className="w-full h-12 p-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChanges}
            />
          </div>
        </div>
        <button
          className="w-6/12 h-10 bg-white hover:bg-gray-200 text-zinc-900 font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Login
        </button>
        <div className="mt-4 text-sm text-zinc-100 w-full md:w-5/12 flex flex-row justify-center">
          <p>Don't have an account?</p>
          <a href="#" className="text-blue-500 hover:underline ml-2">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
