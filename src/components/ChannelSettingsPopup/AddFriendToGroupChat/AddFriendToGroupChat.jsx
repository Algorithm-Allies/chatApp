import React, { useState, useEffect } from "react";
import axios from "axios";
const serverUrl = import.meta.env.VITE_APP_SERVER;

function AddFriendToGroupChat({ group }) {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${serverUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const memberIds = group.members.map((member) => member.user._id);
        const friendsNotInGroup = response.data.filter(
          (friend) => !memberIds.includes(friend._id)
        );

        setFriends(friendsNotInGroup);
        setFilteredFriends(friendsNotInGroup);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [group]);

  useEffect(() => {
    const filtered = friends.filter((friend) => {
      const fullName = friend.firstName + " " + friend.lastName;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredFriends(filtered);
  }, [searchQuery, friends]);

  const handleAddFriendToGroupChat = async (friend) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/api/channels/addUser`,
        { userId: friend._id, channelId: group._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Friend added to group chat.`);
      setFriends((prevFriends) =>
        prevFriends.filter((f) => f._id !== friend._id)
      );
      setFilteredFriends((prevFiltered) =>
        prevFiltered.filter((f) => f._id !== friend._id)
      );
    } catch (error) {
      setMessage("Error adding friend to group chat. Please try again.");
      console.error("Error adding friend to group chat:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-black">
        Add Friend to Group Chat
      </h3>
      <input
        type="text"
        placeholder="Search friends..."
        name="searchQuery"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-md mb-2 px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
      />

      <div className="h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-black">
        {filteredFriends.map((friend) => (
          <div key={friend._id} className="flex flex-row justify-between m-3">
            <p>
              {friend.firstName} {friend.lastName}
            </p>
            <button
              onClick={() => handleAddFriendToGroupChat(friend)}
              className="bg-blue-500 text-white hover:bg-blue-600 p-1"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}

export default AddFriendToGroupChat;
