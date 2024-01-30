import React, { createContext, useState, useEffect } from "react";
import RestructuredData from "../Data/RestructuredData.json";
import { fetchUserProfile } from "./appControllers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      setChannels(channels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleChannel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/channels/getChannelById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const channel = response.data;
      setSelectedChannel(channel);

      const title = {
        title: channel.chatName,
      };
      setTitleName(title);
      fetchMessages(id, "channel");
      setIsChannel(true);
    } catch (error) {}
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);

  //     try {
  //       await fetchSingleChannel(1);
  //       await fetchUsers();
  //       await fetchChannels();
  //       await fetchDirectMessages();
  //       await fetchProfile();
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    userProfile,
    setUserProfile,
    fetchChannels,
    isLoading,
    fetchProfile,
    saveNewProfile,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
