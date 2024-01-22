
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// const user = {
//   id: 1,
//   first_name: "John",
//   last_name: "Doe",
//   profile_pic: "https://www.w3schools.com/howto/img_avatar.png",
// };

function Popup({ onClose }) {
  return (
    <div className="w-11/12 m-2 bg-white flex flex-col justify-center">
      <Link
        className="p-2 flex flex-row justify-start hover:bg-gray-400 w-full cursor-pointer"
        to="/profile"
      >
        Profile
      </Link>
      <div
        className="p-2 flex flex-row justify-start hover:bg-gray-400 w-full cursor-pointer"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <h5 className="ml-2 ">Logout</h5>
      </div>
    </div>
  );
}

function UserProfileSettings() {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3500/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    setShowPopup(false);
  };

  return (
    <div className="sticky bottom-0 w-full flex flex-col items-center bg-black">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <div
        className="border-t border-gray-200 text-white p-4 w-full hover:bg-gray-800 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="flex items-center">
          <img
            src={
              user.profilePhoto ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt={`${user.firstName} ${user.lastName}`}
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSettings;
