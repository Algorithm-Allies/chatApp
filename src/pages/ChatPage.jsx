import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
import CreateChannelModal from "../components/createChannelModal";
//Chat page
function ChatPage() {

  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)

  return (
    <div className="flex flex-row h-full">
      <SideBar setShowCreateChannelModal={setShowCreateChannelModal} />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages />
      </div>
      <CreateChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} />
    </div>
  );
}

export default ChatPage;
