import React from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
function ChatPage() {
  return (
    <div className="flex flex-row h-full">
      <SideBar />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages />
      </div>
    </div>
  );
}

export default ChatPage;
