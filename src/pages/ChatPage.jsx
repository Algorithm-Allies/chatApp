import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
import ProfilePopup from "../components/ProfilePopup";
//Chat page
function ChatPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    let handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }
    document.addEventListener('mouseup', handler)
  })

  const displayProfilePopup = (event) => {
    setPosition({ x: event.clientX, y: event.clientY })
    setIsVisible(true)
  }

  return (
    <div className="flex flex-row h-full">
      <SideBar />
      <div className="flex flex-col h-screen w-screen bg-stone-800">
        <ChannelMessages position={position} displayProfilePopup={displayProfilePopup} />
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
