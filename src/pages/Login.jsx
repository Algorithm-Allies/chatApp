import React from "react";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col items-center p-10 bg-zinc-900 rounded-xl shadow-lg w-10/12 max-w-xl">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Login</h2>

        <div className="w-full mb-6">
          <input
            className="w-full h-12 p-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="w-full mb-6">
          <input
            className="w-full h-12 p-3 rounded border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          className="w-6/12 h-10 bg-white hover:bg-gray-200 text-zinc-900 font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          Login
        </button>

        <div className="mt-4 text-sm text-zinc-100 w-full sm:w-6/12 flex flex-row justify-evenly ">
          <p>Don't have an account?</p>
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
