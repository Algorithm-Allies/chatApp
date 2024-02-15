import React, { createContext, useState } from "react";
import RestructuredData from "../Data/RestructuredData.json";
import axios from "axios";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState([]);
  const [selectedDirect, setSelectDirect] = useState([]);
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [titleName, setTitleName] = useState([]);
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [isChannel, setIsChannel] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:3500/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data;
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (id, type) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3500/api/messages/${id}`,
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
      const response = await axios.get("http://localhost:3500/api/channels", {
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
        `http://localhost:3500/api/channels/getChannelById/${id}`,
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

      setCurrentChannelId(id);
      console.log(currentChannelId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDirectMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3500/api/directMessages/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const directMessages = response.data;
      setDirectMessages(directMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleDirectMessages = async (id) => {
    try {
      const loggedInUserId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3500/api/channels/getChannelById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const channel = response.data;
      setSelectedChannel(channel);

      if (channel) {
        const recipient = channel.members.find(
          (member) => member.user._id !== loggedInUserId
        );

        const title = {
          title: recipient.user.firstName + " " + recipient.user.lastName,
        };

        const photo = recipient.user.profilePhoto;

        setTitleName(title);
        setUserProfilePhoto(photo);
        fetchMessages(id, "direct");
        setIsChannel(false);

        setCurrentChannelId(id);
      } else {
        console.log("Channel not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    try {
      const response = axios.get(`http://localhost:3500/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

        const resp = await axios.get("http://localhost:3500/api/profile/", {
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
        "http://localhost:3500/api/profile/",
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

  const contextValue = {
    messages,
    setMessages,
    selectedChannel,
    setSelectedChannel,
    channels,
    setChannels,
    directMessages,
    setDirectMessages,
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
    fetchCurrentUser,
    currentUser,
    userProfilePhoto,
    currentChannelId,
    setCurrentChannelId,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
