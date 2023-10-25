import React from "react";
import SideBar from "../components/SideBar";
import TextBox from "../components/TextBox";
function ChatPage() {
  return (
    <div className="flex flex-row h-full">
      <SideBar />
      <TextBox />
    </div>
  );
}

export default ChatPage;
