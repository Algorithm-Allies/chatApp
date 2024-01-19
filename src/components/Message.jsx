import React from "react";

const Message = ({
  profilePic,
  name,
  lastName,
  message,
  timestamp,
  displayProfilePopup,
}) => {
  return (
    <div className="flex mb-4 items-center">
      <img
        src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
        alt={name}
        className="w-10 h-10 rounded-full mr-4 cursor-pointer"
        onClick={displayProfilePopup}
      />
      <div>
        <div
          className="flex items-center cursor-pointer"
          onClick={displayProfilePopup}
        >
          <div className="text-sm font-bold mr-2">{name}</div>
          <div className="text-sm font-bold mr-2">{lastName}</div>
          <div className="text-sm text-gray-500">{timestamp}</div>
        </div>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Message;
