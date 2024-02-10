import React, { useContext } from "react";
import { ChatContext } from "../context/Context";

const Message = ({
  profilePic,
  firstName,
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
    ? "bg-purple-800 text-black p-4 rounded-lg"
    : "bg-gray-300 text-black p-4 rounded-lg";

  return (
    <>
      {isCurrentUser ? (
        <div className={messageContainerStyle}>
          <div className={`bg-blue-500 text-black p-4 rounded-lg max-w-md`}>
            <div
              className={`flex items-center justify-end cursor-pointer`}
              onClick={displayProfilePopup}
            >
              <div className="text-xs text-gray-800">{timestamp}</div>
              <div className="text-sm font-semibold ml-2">
                {firstName} {lastName}
              </div>
            </div>
            <p className="text-sm mt-2">{message}</p>
          </div>
          <img
            src={profilePic}
            alt={firstName}
            className="w-10 h-10 rounded-full ml-4 mr-2 cursor-pointer"
            onClick={displayProfilePopup}
          />
        </div>
      ) : (
        <div className={messageContainerStyle}>
          <img
            src={profilePic}
            alt={firstName}
            className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            onClick={displayProfilePopup}
          />
          <div className={`bg-gray-300 text-black p-4 rounded-lg max-w-md`}>
            <div
              className={`flex items-center cursor-pointer`}
              onClick={displayProfilePopup}
            >
              <div className="text-sm font-semibold mr-2">
                {firstName} {lastName}
              </div>
              <div className="text-xs text-gray-500">{timestamp}</div>
            </div>
            <p className="text-sm mt-2">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;