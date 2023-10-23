import React from "react";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col items-center justify-evenly w-[820px] h-[700px] bg-zinc-900 rounded-[20px] shadow">
        {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center h-4/6 w-6/12 bg-zinc-900"> */}
        <h2 className="w-[190px] text-center text-zinc-100 text-5xl font-bold font-['Inter']">
          Login
        </h2>

        <div className="mb-4 flex flex-col items-center">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-[610px] h-14"
            id="username"
            type="text"
            placeholder="Username"
          />

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[610px] h-14"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-center w-6/12">
          <button
            className="w-[400px] h-[72px] text-center text-black text-4xl font-bold font-['Inter'] bg-white rounded-3xl"
            type="button"
          >
            Login
          </button>
          <div className="mt-4 flex flex-row w-full justify-center">
            <p className="text-sm text-white">Don't have an account?</p>
            <a href="#" className="text-blue-500 hover:underline">
              <p className="text-sm">Sign up</p>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
