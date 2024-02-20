// ProfilePopup.js

import React, { useEffect, useState } from "react";
import axios from "axios";
const serverUrl = import.meta.env.VITE_APP_SERVER;

const ProfilePopup = ({ userId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  if (!userData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded max-w-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 relative">
        <button
          className="absolute top-2 right-7 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl p-2"
          onClick={onClose}
        >
          x
        </button>
        <div className="flex justify-center items-center">
          <img
            src={userData.profilePhoto || "default-profile-image.jpg"}
            alt=""
            className="w-24 h-24 bg-black rounded-full object-cover"
          />
        </div>
        <div className="bg-gray-400 rounded-md p-8 mt-6">
          <p className="font-bold">
            {userData.firstName} {userData.lastName}
          </p>
          <hr className="mt-2" />
          <p className="mt-2 font-bold">About Me</p>
          <p
            style={{
              maxHeight: "10rem",
              minHeight: "10rem",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#4a5568 #cbd5e0",
              borderRadius: "4px",
            }}
          >
            {userData.aboutMe || "No information available"}
          </p>
          <hr className="mt-2" />
          <p className="mt-2 font-bold">Member since</p>
          <p>
            {new Date(userData.createdAt).toLocaleDateString() || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;

/*      <div className="flex justify-center items-center">
        <img
          src={userData.profilePhoto || "default-profile-image.jpg"}
          alt=""
          className="w-24 h-24 bg-black rounded-full object-cover"
        />
      </div>
      <div className="bg-zinc-900 rounded-md p-4 mt-6">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        <hr className="mt-2" />
        <p className="mt-2 font-medium">About Me</p>
        <p>{userData.aboutMe || "No information available"}</p>
        <hr className="mt-2" />
        <p className="mt-2">Member since</p>
        <p>{new Date(userData.createdAt).toLocaleDateString() || "Unknown"}</p>
      </div>
      */
