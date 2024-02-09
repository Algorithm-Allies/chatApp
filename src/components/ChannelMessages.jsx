import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import RestructuredData from "../Data/RestructuredData.json";
import { ChatContext } from "../context/Context";
import AddMessageInput from "./AddMessageInput";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3500";

const ChannelMessages = ({ position, displayProfilePopup, isVisible }) => {
  const {
    messages,
    setMessages,
    users,
    titleName,
    isChannel,
    selectedChannel,
    fetchMessages,
    fetchCurrentUser,
    currentUser,
  } = useContext(ChatContext);

  const socket = useRef(null);
  const messageContainerRef = useRef(null);

  const chatId = isChannel ? selectedChannel._id : selectedChannel.user._id;

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId, isChannel);
      fetchCurrentUser();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.current = io(ENDPOINT, {
      auth: { token },
    });
    socket.current.on("connect", () => {
      console.log("Connected to server,", socket.current.id);
    });
    socket.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.current.on("newMessage", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  if (!chatId) {
    return (
      <div className="bg-gray-400 flex items-center justify-center h-full p-4">
        <h1 className="text-3xl text-gray-700 font-bold">
          Welcome! Please select a channel or direct message.
        </h1>
      </div>
    );
  }

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
            currentUser={currentUser}
            senderId={message.user._id}
          />
        ))}
      </div>

      <AddMessageInput socket={socket.current} chatId={chatId} />
    </div>
  );
};


//Test
export default ChannelMessages;
