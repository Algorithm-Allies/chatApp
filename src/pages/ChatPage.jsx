import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import MessageStream from "../components/MessageStream";
import ProfilePopup from "../components/ProfilePopup";
import CreateChannelModal from "../components/CreateChannelModal";
import CreateMessageModal from "../components/CreateMessageModal";

// Chat page
function ChatPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [elementClicked, setElementClicked] = useState(null);
  const popupRef = useRef(null);
  const channelModalRef = useRef(null);
  const messageModalRef = useRef(null);

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

  const openMessageModal = () => {
    if (messageModalRef.current) {
      messageModalRef.current.showModal();
    }
  };

  const closeMessageModal = () => {
    if (messageModalRef.current) {
      messageModalRef.current.close();
    }
  };

  const displayProfilePopup = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setElementClicked(event.target);

    if (event.target === elementClicked) {
      setElementClicked(null);
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    let handler = (e) => {
      e.preventDefault();

      if (popupRef.current && !popupRef.current.contains(e.target)) {
        if (e.target !== elementClicked && elementClicked !== null) {
          setElementClicked(null);
          setIsVisible(false);
        }
      }
    };

    document.addEventListener("mouseup", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  }, [elementClicked]);

  return (
    <div className="flex flex-row h-full">
      <SideBar
        openChannelModal={openChannelModal}
        openMessageModal={openMessageModal}
      />
      <div className="flex flex-col h-screen w-screen bg-stone-800">
        <MessageStream
          position={position}
          displayProfilePopup={displayProfilePopup}
          isVisible={isVisible}
        />
      </div>
      <CreateChannelModal
        channelModalRef={channelModalRef}
        closeChannelModal={closeChannelModal}
      />
      <CreateMessageModal
        messageModalRef={messageModalRef}
        closeMessageModal={closeMessageModal}
      />
      {isVisible && <ProfilePopup ref={popupRef} position={position} />}
    </div>
  );
}

export default ChatPage;
