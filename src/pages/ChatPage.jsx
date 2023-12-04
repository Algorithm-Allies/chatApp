import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
import ProfilePopup from "../components/ProfilePopup";
//Chat page
function ChatPage() {
  const [position, setPosition] = useState({x: 0, y: 0})
  const [isVisible, setIsVisible] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    let handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }
    document.addEventListener('mousedown', handler)
  })

  const handleProfilePopup = (event) => {
    setPosition({x: event.clientX, y: event.clientY})
  }

  const displayProfilePopup = (event) => {
    setPosition({x: event.clientX, y: event.clientY})
    setIsVisible(true)
  }

  const hideProfilePopup = () => {
    if (isVisible) {
      setIsVisible(false)
    }
  }

  const getRef = () => {
    console.log(popupRef.current)
  }

  const checkPosition = (event) => {
    if (event.target.classList.contains('profile-popup') && isVisible) {
      setIsVisible(false)
      console.log('popup and it is visible')
    } else if (event.target.classList.contains('profile-popup')) {
      setIsVisible(true)
      console.log('popup and setting to visible')
    } else {
      setIsVisible(false)
      console.log('this is something else entirely')
    }
  }

  return (
    <div className="flex flex-row h-full" onClick={getRef}>
      <SideBar />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages position={position} handleProfilePopup={handleProfilePopup} setIsVisible={setIsVisible} displayProfilePopup={displayProfilePopup} />
      </div>
      {
        isVisible && (
          <ProfilePopup ref={popupRef} position={position} />
        )
      }
    </div>
    
  );
}

export default ChatPage;
