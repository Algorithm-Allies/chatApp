import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import ChannelMessages from "../components/ChannelMessages";
import ProfilePopup from "../components/ProfilePopup";

//Chat page
function ChatPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [elementClicked, setElementClicked] = useState(null)
  const popupRef = useRef(null)

  const displayProfilePopup = (event) => {
    setPosition({ x: event.clientX, y: event.clientY })
    setElementClicked(event.target)
    if (event.target == elementClicked) {
      setElementClicked(null)
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    
  }

  useEffect(() => {
    let handler = (e) => {
      e.preventDefault()
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (e.target !== elementClicked && elementClicked !== null) {
          setElementClicked(null)
          setIsVisible(false)
        }
        
      }
    };

    document.addEventListener('mouseup', handler)

    return () => {
      document.removeEventListener('mouseup', handler)
    }
  }, [elementClicked])



  return (
    <div className="flex flex-row h-full">
      <SideBar />
      <div className="flex flex-col h-screen w-screen bg-stone-800">

        <ChannelMessages position={position} displayProfilePopup={displayProfilePopup} isVisible={isVisible} />

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
