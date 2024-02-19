import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div
      className="bg-repeat-y bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('/img.jpg')`,
        backgroundRepeat: "repeat-y",
      }}
    >
      <div className="max-w-lg bg-white p-6 rounded-lg shadow-md sm:w-96 md:w-1/2 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Ripple</h2>
        <RegisterForm />
        <p className="text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-dark-blue hover:text-medium-blue">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
