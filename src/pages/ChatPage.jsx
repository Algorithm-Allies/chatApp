import React, { useRef } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
import CreateChannelModal from "../components/createChannelModal";
//Chat page
function ChatPage() {

  const channelModalRef = useRef(null);
  const openChannelModal = () => {
    if (channelModalRef.current) {
      channelModalRef.current.showModal()
    }
  }
  const closeChannelModal = () => {
    if (channelModalRef.current) {
      channelModalRef.current.close()
    }
  }

  return (
    <div className="flex flex-row h-full">
      <SideBar openChannelModal={openChannelModal} />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages />
      </div>
      <CreateChannelModal channelModalRef={channelModalRef} closeChannelModal={closeChannelModal} />
    </div>
  );
}

export default ChatPage;
