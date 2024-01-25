import React, { useContext, useEffect } from "react";
import Message from "./Message";
import RestructuredData from "../Data/RestructuredData.json";
import { ChatContext } from "../context/Context";
import AddMessageInput from "./AddMessageInput";

const ChannelMessages = ({ position, displayProfilePopup, isVisible }) => {
  const { messages, users, titleName, isChannel } = useContext(ChatContext);
  const { fetchMessages } = useContext(ChatContext);

  useEffect(() => {
    fetchMessages(titleName._id, isChannel);
  }, []);

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
            <div className="flex items-center justify-center text-gray-600 font-bold mb-5 pb-3">
              <p className="flex-grow">
                This is the start of the #{titleName.title} channel
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-600 font-bold mb-5 pb-3">
              <p className="flex-grow">
                This is the beginning of your message history with{" "}
                {titleName.title}
              </p>
            </div>
          )}
        </div>
        {messages.map((message, index) => (
          <Message
            key={message._id}
            profilePic={
              message.user.profilePhoto ||
              "https://www.w3schools.com/howto/img_avatar.png"
            }
            name={message.user.firstName}
            lastName={message.user.lastName}
            message={message.text}
            timestamp={message.timestamp}
            position={position}
            displayProfilePopup={displayProfilePopup}
            isVisible={isVisible}
          />
        ))}
      </div>

      <AddMessageInput />
    </div>
  );
};

export default ChannelMessages;
