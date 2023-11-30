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
    fetchMessages(id, "channel");
  };

  const fetchDirectMessages = () => {
    setTimeout(() => {
      setDirectMessages(RestructuredData.directMessages);
    }, 1000);
  };

  const fetchSingleDirectMessages = (id) => {
    const direct = RestructuredData.directMessages[id];
    setSelectDirect(direct);
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
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
