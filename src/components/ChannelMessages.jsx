import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/Context";
import AddMessageInput from "./AddMessageInput";
const ChannelMessages = () => {
  const {
    messages,
    selectedChannel,
    users,
    fetchSingleChannel,
    selectedDirect,
    titleName,
    isChannel,
  } = useContext(ChatContext);

  useEffect(() => {
    fetchSingleChannel(1);
  }, []);
  console.log(isChannel);
  return (
    <div className="bg-gray-400 flex flex-col h-full p-4">
      <div className="text-5xl border-b border-gray-700 pb-4 flex items-center">
        {isChannel ? (
          <div className="flex items-center">
            <div className="font-bold">#</div>
            <div>{titleName.title}</div>
          </div>
        ) : (
          <div className="flex items-center">
            <img src={titleName.img} className="rounded-full w-12 h-12 mr-2" />
            <div>{titleName.title}</div>
          </div>
        )}
      </div>

      <br />

      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col">
          {isChannel ? (
            <div className="flex items-center justify-center text-gray-500 font-bold mb-5 pb-3">
              <p className="flex-grow">
                This is the start of the #{titleName.title} channel
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500 font-bold mb-5 pb-3">
              <p className="flex-grow">
                This is the beginning of your message history with{" "}
                {titleName.title}
              </p>
            </div>
          )}
        </div>
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
