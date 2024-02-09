import React, { useEffect, useState } from "react";
import "../styles/CreateChannelModal.css";
import axios from "axios";

function CreateChannelModal({ channelModalRef, closeChannelModal }) {
  const [channelName, setChannelName] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3500/api/users", {
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
          user.firstName
            .toLowerCase()
            .includes(userSearchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(userSearchQuery.toLowerCase())
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
      console.log("selectedUsers", selectedUsers);
      const response = await axios.post(
        "http://localhost:3500/api/channels/createChannel",
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

      console.log("Channel created:", response.data);
      closeChannelModal();
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };
  return (
    <dialog ref={channelModalRef}>
      <div id="channel-modal">
        <label className="channel-modal-input-label" htmlFor="">
          Channel Name
        </label>
        <input
          id="channel-modal-input"
          type="text"
          placeholder="Enter channel name here"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <label className="channel-modal-input-label" htmlFor="">
          Find users
        </label>
        <input
          id="channel-modal-input"
          type="text"
          placeholder="Enter user name here"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
        />
        <fieldset className="overflow-y-scroll h-40 text-white">
          <legend className="channel-modal-input-label">
            Add users to channel
          </legend>
          {searchedUsers.map((user) => (
            <div key={user._id} className="flex">
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
        <div id="channel-modal-buttons">
          <button id="channel-modal-cancel" onClick={() => closeChannelModal()}>
            Cancel
          </button>
          <button id="channel-modal-create" onClick={handleCreateChannel}>
            Create Channel
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateChannelModal;
