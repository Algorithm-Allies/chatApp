import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
import ProfilePopup from "../components/ProfilePopup";
//Chat page
function ChatPage() {
  const [position, setPosition] = useState({x: 0, y: 0})
  const [isVisible, setIsVisible] = useState(false)

  const handleProfilePopup = (event, isValid) => {
    console.log(event)
    console.log(isValid)
    setPosition({x: event.clientX, y: event.clientY})
    if (!isValid) {
      setIsVisible(false)
    } else if (isValid) {
      setIsVisible(true)
    }
  }

  const checkPosition = (event) => {
    console.log(event.target)
    if (event.target.classList.contains('profile-popup')) {
      console.log('this is either the profile picture or profile name')
    } else {
      setIsVisible(false)
      console.log('this is something else entirely')
    }
  }

  return (
    <div className="flex flex-row h-full" onClick={checkPosition}>
      <SideBar />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages position={position} handleProfilePopup={handleProfilePopup} />
      </div>
      {
        isVisible && (
          <ProfilePopup position={position} name={name} />
        )
      }
    </div>
    
  );
}

export default ChatPage;
