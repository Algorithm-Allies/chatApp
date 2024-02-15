import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/Context";
import AddMessageInput from "./AddMessageInput";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3500";

const MessageStream = ({ position, displayProfilePopup, isVisible }) => {
  const {
    messages,
    setMessages,
    titleName,
    isChannel,
    selectedChannel,
    fetchMessages,
    fetchCurrentUser,
    currentUser,
    userProfilePhoto,
  } = useContext(ChatContext);

  const socket = useRef(null);
  const messageContainerRef = useRef(null);
  const [openMessageId, setOpenMessageId] = useState(null);

  const chatId = selectedChannel._id;

  useEffect(() => {
    fetchCurrentUser();

    if (chatId) {
      fetchMessages(chatId, isChannel);
    }
  }, [chatId, isChannel]);

  useEffect(() => {
    if (!chatId) return;
    const token = localStorage.getItem("token");
    socket.current = io(ENDPOINT, {
      auth: { token },
    });

    socket.current.on("connect", () => {
      if (chatId) {
        socket.current.emit("join", chatId);
      }
    });

    socket.current.on("newMessage", (message) => {
      if (chatId === message.chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTo({
          top: messageContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    socket.current.on("messageEdited", (editedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === editedMessage._id ? editedMessage : msg
        )
      );
    });

    socket.current.on("messageDeleted", (deletedMessageId) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === deletedMessageId ? { ...msg, isDeleted: true } : msg
        )
      );
    });

    return () => {
      socket.current.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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
            <img
              src={userProfilePhoto}
              className="rounded-full w-12 h-12 mr-2"
            />
            <div>{titleName.title}</div>
          </div>
        )}
      </div>

      <br />

      <div className="flex-grow overflow-y-auto" ref={messageContainerRef}>
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
            firstName={message.user.firstName}
            lastName={message.user.lastName}
            message={message.text}
            timestamp={new Date(message.updatedAt).toLocaleString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            position={position}
            displayProfilePopup={displayProfilePopup}
            isVisible={isVisible}
            currentUser={currentUser}
            senderId={message.user._id}
            messageId={message._id}
            openMessageId={openMessageId}
            setOpenMessageId={setOpenMessageId}
            socket={socket.current}
          />
        ))}
      </div>

      <AddMessageInput socket={socket.current} chatId={chatId} />
    </div>
  );
};

export default MessageStream;
