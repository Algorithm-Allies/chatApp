import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";
import { SelectChatFunc } from "./../utils/SelectChatFunc";

function Channels() {
  const { channels, fetchMessages, setTitleName, setSelectedChat } =
    useContext(ChatContext);

  return (
    <div className="text-white">
      {Object.values(channels).map((channel) => (
        <div
          key={channel.id}
          className="text-white hover:bg-gray-800 cursor-pointer p-1"
          onClick={() =>
            SelectChatFunc(
              channel,
              setTitleName,
              fetchMessages,
              setSelectedChat
            )
          }
        >
          <div>#{channel.chatName}</div>
        </div>
      ))}
    </div>
  );
}

export default Channels;
