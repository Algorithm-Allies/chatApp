import React, { useEffect, useState, useContext } from "react";
import { ChatContext } from "../context/Context";
import axios from "axios";

function CreateChannelModal({ channelModalRef, closeChannelModal }) {
  const { channels, setChannels } = useContext(ChatContext);
  const [channelName, setChannelName] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const serverUrl = import.meta.env.VITE_APP_SERVER;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${serverUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter(
        (user) =>
          user.firstName &&
          user.lastName &&
          (user.firstName
            .toLowerCase()
            .includes(userSearchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(userSearchQuery.toLowerCase()))
      );
      setSearchedUsers(filteredUsers);
    }
  }, [users, userSearchQuery]);

  const handleUserSelection = (user) => {
    const userId = user._id;
    const isSelected = selectedUsers.includes(userId);
    const updatedSelectedUsers = isSelected
      ? selectedUsers.filter((selectedUserId) => selectedUserId !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleCreateChannel = async () => {
    if (channelName === "") return;
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${serverUrl}/api/channels/createChannel`,
        {
          name: channelName,
          users: JSON.stringify(selectedUsers),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closeChannelModal();
      setChannels([...channels, response.data]);

      setChannelName("");
      setUserSearchQuery("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };
  return (
    <dialog className="max-w-md w-full rounded-md" ref={channelModalRef}>
      <div className="flex flex-col max-w-xl w-full">
        <div className="m-4">
          <label className="text-gray-700 font-semibold" htmlFor="channelName">
            Channel Name
          </label>
          <input
            type="text"
            placeholder="Enter channel name here"
            className="w-full border rounded px-3 py-2 focus:border-blue-500"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="m-4 mt-1">
          <label className="text-gray-700 font-semibold" htmlFor="userQuery">
            Find users
          </label>
          <input
            type="text"
            placeholder="Enter user name here"
            className="w-full border rounded px-3 py-2 focus:border-blue-500"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
          />
        </div>

        <fieldset className="overflow-y-scroll h-40 text-black m-5 mt-1">
          <legend className="text-gray-700 font-semibold mb-2">
            Add users to channel
          </legend>
          {searchedUsers.map((user) => (
            <div key={user._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleUserSelection(user)}
              />
              <label className="ml-2">
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}
        </fieldset>
        <div className="flex justify-between">
          <button
            className="w-1/2 m-3 bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 focus:outline-none"
            onClick={() => closeChannelModal()}
          >
            Cancel
          </button>
          <button
            className="w-1/2 m-3 bg-dark-blue text-white font-semibold py-2 rounded hover:bg-medium-blue focus:outline-none"
            onClick={handleCreateChannel}
          >
            Create Channel
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateChannelModal;
