import React, { createContext, useState, useEffect } from "react";
import RestructuredData from "../Data/RestructuredData.json";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState([]);
  const [selectedDirect, setSelectDirect] = useState([]);
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [users, setUsers] = useState(RestructuredData.users);
  const [titleName, setTitleName] = useState("");

  const fetchMessages = (id, type) => {
    let fetchedMessages = [];

    if (type === "channel") {
      fetchedMessages = RestructuredData.channels[id]?.messages || [];
    } else if (type === "direct") {
      fetchedMessages = RestructuredData.directMessages[id]?.messages || [];
    }

    setMessages(fetchedMessages);
  };

  const handleSendMessage = (messageContent) => {
    if (messageContent.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: 2,
      timestamp: "today",
      content: messageContent,
    };

    setMessages([...messages, newMessage]);
  };

  const fetchChannels = () => {
    setTimeout(() => {
      setChannels(RestructuredData.channels);
    }, 1000);
  };

  const fetchSingleChannel = (id) => {
    const channel = RestructuredData.channels[id];
    setSelectedChannel(channel);
    const title = (
      <div className="flex items-center text-xlg ">
        <div>#</div>
        <div>{channel.name}</div>
      </div>
    );
    setTitleName(title);
    fetchMessages(id, "channel");
  };

  const fetchDirectMessages = () => {
    setTimeout(() => {
      setDirectMessages(RestructuredData.directMessages);
    }, 1000);
  };

  const fetchSingleDirectMessages = (userInfo) => {
    const id = userInfo.id;
    const direct = RestructuredData.directMessages[id];
    const img = userInfo.profile_pic;
    const name = userInfo.first_name + " " + userInfo.last_name;
    const title = (
      <div className="flex items-center">
        <img
          src={img}
          className="rounded-full w-12 h-12 mr-2"
          alt="Profile Pic"
        />
        <span className="text-xlg ">{name}</span>
      </div>
    );

    setSelectDirect(direct);
    setTitleName(title);
    fetchMessages(id, "direct");
  };

  useEffect(() => {
    fetchChannels();
    fetchDirectMessages();
  }, []);

  const contextValue = {
    messages,
    setMessages,
    selectedChannel,
    setSelectedChannel,
    channels,
    directMessages,
    fetchMessages,
    fetchSingleChannel,
    handleSendMessage,
    users,
    fetchSingleDirectMessages,
    selectedDirect,
    titleName,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
