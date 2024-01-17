import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center flex h-screen justify-center items-center"
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md sm:w-96 md:w-1/2 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Ripple</h2>
        <RegisterForm />
        <p className="text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
