import React, { useContext } from "react";
import { ChatContext } from "../context/Context";

const Message = ({
  profilePic,
  name,
  lastName,
  message,
  timestamp,
  displayProfilePopup,
  currentUser,
  senderId,
}) => {
  const isCurrentUser = currentUser._id === senderId;

  const messageContainerStyle = isCurrentUser
    ? "flex justify-end mb-4"
    : "flex justify-start mb-4";

  const messageStyle = isCurrentUser
    ? "bg-purple-800 text-white p-4 rounded-lg"
    : "bg-gray-300 text-black p-4 rounded-lg";

  return (
    <>
      {isCurrentUser && (
        <div className={messageContainerStyle}>
          <div>
            <div
              className={`flex items-center cursor-pointer ${
                currentUser._id === senderId ? "text-purple-800" : "text-black"
              }`}
              onClick={displayProfilePopup}
            >
              <div className="text-sm font-bold mr-2">{name}</div>
              <div className="text-sm font-bold mr-2">{lastName}</div>
              <div className="text-sm text-gray-500">{timestamp}</div>
            </div>
            <p className="text-gray-800">{message}</p>
          </div>
          <img
            src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
            alt={name}
            className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            onClick={displayProfilePopup}
          />
        </div>
      )}
      {!isCurrentUser && (
        <div className={messageContainerStyle}>
          <img
            src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
            alt={name}
            className="w-10 h-10 rounded-full ml-4 cursor-pointer"
            onClick={displayProfilePopup}
          />
          <div>
            <div
              className={`flex items-center cursor-pointer ${
                currentUser._id === senderId ? "text-purple-800" : "text-black"
              }`}
              onClick={displayProfilePopup}
            >
              <div className="text-sm font-bold mr-2">{name}</div>
              <div className="text-sm font-bold mr-2">{lastName}</div>
              <div className="text-sm text-gray-500">{timestamp}</div>
            </div>
            <p className="text-gray-800">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;