import React, { createContext, useState } from "react";
import RestructuredData from "../Data/RestructuredData.json";
import axios from "axios";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);
  const [selectedDirect, setSelectDirect] = useState([]);
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [titleName, setTitleName] = useState([]);
  const [isChannel, setIsChannel] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = async (id, type) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const messages = response.data;
      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
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

  const fetchChannels = async () => {
    //api call for all channels
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const channels = response.data;
      console.log(channels);
      setChannels(channels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleChannel = async (channelId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/channels/getChannelById/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const channel = response.data;
      console.log(channel);
      // setSelectedChannel(channel);

      setTitleName(channel.chatName);
      setIsChannel(true);
    } catch (error) {}
  };

  const fetchDirectMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/directMessages/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const directMessages = response.data;
      console.log(directMessages);
      setDirectMessages(directMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleDirectMessages = async (chatId) => {
    //api call for a single direct message

    setIsChannel(false);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_BACKEND_PORT
        }/api/directMessages/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "resp");
      const chat = response.data;
      console.log(chat);
      setSelectedChannel(response.data);
      setTitleName(chat.chatName);
      // setMessages(chat.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    try {
      const response = axios.get(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = response.data;
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const resp = await axios.get("http://localhost:3000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserProfile(resp.data);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const saveNewProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      console.log(profileData);
      const resp = await axios.put(
        "http://localhost:3000/api/profile/",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile updated successfully:", resp.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const resp = await axios.get(
        `http://localhost:3000/api/users/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data, "user info");
    } catch (error) {
      console.error("Error getting user", error);
    }
  };

  const contextValue = {
    messages,
    setMessages,
    selectedChat,
    setSelectedChat,
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
    userProfile,
    setUserProfile,
    fetchChannels,
    isLoading,
    fetchProfile,
    saveNewProfile,
    fetchDirectMessages,
    fetchUserById,
    setTitleName,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
