import React from "react";
import SideBar from "./SideBar";
import TextBox from "./TextBox";
function ChatPage() {
  return (
    <div className="flex flex-row h-full">
      <SideBar />
      <TextBox />
    </div>
  );
}

export default ChatPage;
