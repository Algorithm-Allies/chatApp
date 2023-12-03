import React, {useState} from 'react';
import ProfilePopup from './ProfilePopup';

const Message = ({ profilePic, name, lastName, message, timestamp, position, handleProfilePopup }) => {

  return (
    <div className="flex mb-4 items-center">
      <img
        src={profilePic}
        alt={name}
        className="w-10 h-10 rounded-full mr-4 cursor-pointer profile-popup"
        onClick={(event) => handleProfilePopup(event, true)}
      />
      <div>
        <div className="flex items-center cursor-pointer" onClick={() => handleProfilePopup(true)}>
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
