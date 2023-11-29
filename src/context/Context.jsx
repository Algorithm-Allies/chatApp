import React, { createContext, useState, useEffect } from "react";
import RestructuredData from "../Data/RestructuredData.json";

// Create a context
export const ChatContext = createContext();

// Create a provider to wrap your components
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);

  // Fetch messages for a specific channel
  const fetchMessages = (id, type) => {
    let fetchedMessages = [];

    if (type === "channel") {
      fetchedMessages = RestructuredData.channels[id]?.messages || [];
    } else if (type === "direct") {
      // Fetch direct messages logic here
      // fetchedMessages = yourDirectMessagesFetchingFunction(id);
    }

    setMessages(fetchedMessages);
  };

  // Fetch channels from your data source (could be an API)
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
    // Simulating an API call with setTimeout
    setTimeout(() => {
      // Fetch direct messages logic here
      // setDirectMessages(updatedDirectMessages);
    }, 1000);
  };

  // Load channels and direct messages when the component mounts
  useEffect(() => {
    fetchChannels();
    fetchDirectMessages();
  }, []);

  // The context value containing state and functions to be available
  const contextValue = {
    messages,
    setMessages,
    selectedChannel,
    setSelectedChannel,
    channels,
    directMessages,
    fetchMessages,
    fetchSingleChannel,
    // ... other functions or states needed for chat app
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
