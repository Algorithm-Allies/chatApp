import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/Context";
import AddMessageInput from "./AddMessageInput";
const ChannelMessages = () => {
  const { messages, selectedChannel, users, fetchSingleChannel } =
    useContext(ChatContext);

  useEffect(() => {
    fetchSingleChannel(1);
  }, []);

  return (
    <div className="bg-gray-400 flex flex-col h-full p-4">
      <div className="text-5xl border-b border-gray-700 pb-4 flex items-center">
        <div>#</div>
        <div>{selectedChannel.name}</div>
      </div>

      <br />

      <div className="flex-grow overflow-y-auto">
        {messages.map((messageData, index) => (
          <Message
            key={messageData.id + index}
            profilePic={users[messageData.sender].profile_pic}
            name={users[messageData.sender].first_name}
            lastName={users[messageData.sender].last_name}
            message={messageData.content}
            timestamp={messageData.timestamp}
          />
        ))}
      </div>

      <AddMessageInput />
    </div>
  );
};

export default ChannelMessages;
