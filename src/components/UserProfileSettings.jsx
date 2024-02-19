import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Popup from "./UserPopUp/Popup";
import { ChatContext } from "../context/Context";
import Loading from "./Loading/Loading";

function UserProfileSettings() {
  const { userProfile, fetchProfile } = useContext(ChatContext);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const user = userProfile;

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="sticky bottom-0 w-full flex flex-col items-center bg-profile-color">
      {showPopup && <Popup />}
      <div
        className="border-t border-gray-200 text-white p-4 w-full hover:bg-gray-400 cursor-pointer"
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
