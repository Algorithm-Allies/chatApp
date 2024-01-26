import React, { createContext, useState, useEffect } from "react";
import RestructuredData from "../Data/RestructuredData.json";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState([]);
  const [selectedDirect, setSelectDirect] = useState([]);
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [titleName, setTitleName] = useState([]);
  const [isChannel, setIsChannel] = useState(true);

  const fetchMessages = (id, type) => {
    let fetchedMessages = [];

    if (type === "channel") {
      //api call for messages that are in a specific channel
      fetchedMessages = RestructuredData.channels[id]?.messages || [];
    } else if (type === "direct") {
      //api call for messages in a direct message
      fetchedMessages = RestructuredData.directMessages[id]?.messages || [];
    }

    setMessages(fetchedMessages);
  };

  const handleSendMessage = (messageContent) => {
    //add api call to send message
    if (messageContent.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: 1,
      timestamp: "today",
      content: messageContent,
    };

    setMessages([...messages, newMessage]);
  };

  const fetchChannels = () => {
    setTimeout(() => {
      //api call for fetching all channels
      setChannels(RestructuredData.channels);
    }, 1000);
  };

  const fetchSingleChannel = (id) => {
    //api call for a single channel
    const channel = RestructuredData.channels[id];
    setSelectedChannel(channel);
    const title = {
      title: channel.name,
    };
    setTitleName(title);
    fetchMessages(id, "channel");
    setIsChannel(true);
  };

  const fetchDirectMessages = () => {
    setTimeout(() => {
      //api call for all direct messages
      setDirectMessages(RestructuredData.directMessages);
    }, 1000);
  };

  const fetchSingleDirectMessages = (userInfo) => {
    //api call for a single direct message
    const id = userInfo.id;
    const direct = RestructuredData.directMessages[id];
    const img = userInfo.profile_pic;
    const name = userInfo.first_name + " " + userInfo.last_name;
    const title = {
      title: name,
      img: img,
    };
    setSelectDirect(direct);
    setTitleName(title);
    fetchMessages(id, "direct");
    setIsChannel(false);
  };

  const fetchUsers = () => {
    setUsers(RestructuredData.users);
  };

  useEffect(() => {
    fetchSingleChannel(1);
    fetchUsers();
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
    isChannel,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
