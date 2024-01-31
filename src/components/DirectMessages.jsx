import React, { useContext } from "react";
import { SelectChatFunc } from "./../utils/SelectChatFunc";

import { ChatContext } from "../context/Context";
function DirectMessages() {
  const { directMessages, fetchMessages, setTitleName, setSelectedChat } =
    useContext(ChatContext);

  return (
    <div className="text-white">
      {Object.values(directMessages).map((chat) => {
        const user = chat.members[1].user;
        console.log(user.profilePhoto);
        return (
          <div
            key={chat.id}
            className="text-white hover:bg-gray-800 cursor-pointer flex items-center p-1"
            onClick={() =>
              SelectChatFunc(chat, setTitleName, fetchMessages, setSelectedChat)
            }
          >
            <img
              src={user.profilePhoto}
              alt={`${chat.chatName} `}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span>{chat.chatName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DirectMessages;
