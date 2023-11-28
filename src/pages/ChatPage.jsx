import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
import ChannelMessages from "../components/channelMessages";
//Chat page
function ChatPage() {

  const [channelID, setChannelID] = useState(1)

  return (
    <div className="flex flex-row h-full">
      <SideBar channelID={channelID} setChannelID={setChannelID} />

      <div className="flex flex-col h-screen w-screen bg-stone-800">
        
        <ChannelMessages channelID={channelID} setChannelID={setChannelID} />
      </div>
    </div>
  );
}

export default ChatPage;
