import React, {useState} from 'react';
import ProfilePopup from './ProfilePopup';

const Message = ({ profilePic, name, lastName, message, timestamp }) => {
  const [position, setPosition] = useState({x: 0, y: 0})
  const [isVisible, setIsVisible] = useState(false)

  const displayProfilePopup = (event) => {
    setPosition({x: event.clientX, y: event.clientY})
    setIsVisible(!isVisible)
  }

  return (
    <div className="flex mb-4 items-center">
      <img
        src={profilePic}
        alt={name}
        className="w-10 h-10 rounded-full mr-4 cursor-pointer"
        onClick={displayProfilePopup}
      />
      <div>
        <div className="flex items-center cursor-pointer" onClick={displayProfilePopup}>
          <div className="text-sm font-bold mr-2">{name}</div>
          <div className="text-sm font-bold mr-2">{lastName}</div>
          <div className="text-sm text-gray-500">{timestamp}</div>
        </div>
        <p className="text-gray-800">{message}</p>
      </div>
      {
        isVisible && (
          <ProfilePopup position={position} name={name} />
        )
      }
    </div>
  );
};

export default Message;
