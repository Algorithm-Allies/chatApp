import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/Context";
import { fetchUserProfile } from "../context/appControllers";
import { Popup } from "./Popup";

function UserProfileSettings() {
  const { userProfile, setUserProfile } = useContext(ChatContext);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUserProfile(setUserProfile);
  }, []);

  const handleLogout = () => {
    setShowPopup(false);
  };
  const user = userProfile.data;

  if (!user) {
    return null; // or render a loading state
  }
  return (
    <div className="sticky bottom-0 w-full flex flex-col items-center bg-black">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <div
        className="border-t border-gray-200 text-white p-4 w-full hover:bg-gray-800 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="flex items-center">
          <img
            src={user.profilePhoto}
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
