import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import ChannelMessages from "../components/ChannelMessages";
import ProfilePopup from "../components/ProfilePopup";
import CreateChannelModal from "../components/CreateChannelModal"; // Assuming this import is correct
import { useCallback } from "react";

// Chat page
function ChatPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [elementClicked, setElementClicked] = useState(null);
  const popupRef = useRef(null);
  const channelModalRef = useRef(null);

  const openChannelModal = () => {
    if (channelModalRef.current) {
      channelModalRef.current.showModal();
    }
  };

  const closeChannelModal = () => {
    if (channelModalRef.current) {
      channelModalRef.current.close();
    }
  };

  const displayProfilePopup = (senderId) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setElementClicked(senderId);
    console.log("elementClicked: " + senderId);
    setIsVisible(!isVisible); // Toggle visibility
  };

  const handleMouseUp = useCallback(
    (e) => {
      e.preventDefault();

      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (e.target !== elementClicked && elementClicked !== null) {
          setElementClicked(null);
          setIsVisible(false);
        }
      }
    },
    [elementClicked]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div className="flex flex-row h-full">
      <SideBar openChannelModal={openChannelModal} />
      <div className="flex flex-col h-screen w-screen bg-stone-800">
        <ChannelMessages
          elementClicked={elementClicked}
          position={position}
          displayProfilePopup={displayProfilePopup}
          isVisible={isVisible}
        />
      </div>
      <CreateChannelModal
        channelModalRef={channelModalRef}
        closeChannelModal={closeChannelModal}
      />
      {isVisible && (
        <ProfilePopup
          ref={popupRef}
          position={position}
          elementClicked={elementClicked}
        />
      )}
    </div>
  );
}

export default ChatPage;
