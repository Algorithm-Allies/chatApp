import React, { useState } from "react";

function Create() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChanges = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "fullname") {
      setFullName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("create acount clicked!");
    console.log("fullName:", fullName);
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center flex h-screen justify-center items-center"
      style={{ backgroundImage: `url('/img.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              className="w-full border rounded px-2 py-1 focus:border-blue-500"
              value={fullName}
              onChange={handleInputChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full border rounded px-2 py-1 focus:border-blue-500"
              value={username}
              onChange={handleInputChanges}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded px-2 py-1 focus:border-blue-500"
              value={password}
              onChange={handleInputChanges}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>

    //  <div className="login-page">
    //     <div className="login-container">
    //       <h2 className="login-title">Create Account</h2>
    //       <form onSubmit={handleSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="username" className="form-label">
    //             Full Name
    //           </label>
    //           <input
    //             type="text"
    //             id="fullname"
    //             name="fullname"
    //             placeholder="Enter your full name"
    //             className="form-input"
    //             value={fullName}
    //             onChange={handleInputChanges}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="username" className="form-label">
    //             Username
    //           </label>
    //           <input
    //             type="text"
    //             id="username"
    //             name="username"
    //             placeholder="Enter your username"
    //             className="form-input"
    //             value={username}
    //             onChange={handleInputChanges}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="password" className="form-label">
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             id="password"
    //             name="password"
    //             placeholder="Enter your password"
    //             className="form-input"
    //             value={password}
    //             onChange={handleInputChanges}
    //           />
    //         </div>
    //         <button type="submit" className="login-button">
    //           Create Account
    //         </button>
    //       </form>
    //     </div>
    //   </div>
  );
}

export default Create;
