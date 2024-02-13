import React, { useEffect, useState, useContext } from "react";
import "../styles/CreateChannelModal.css";
import { ChatContext } from "../context/Context";
import axios from "axios";

function CreateMessageModal({ messageModalRef, closeMessageModal }) {
  const { directMessages, setDirectMessages } = useContext(ChatContext);
  const [messageContent, setMessageContent] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [selectedRecipient, setSelectedRecipient] = useState({});

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

  const handleRecipientSelection = (user) => {
    setSelectedRecipient(user);
    console.log("Selected recipient:", user);
  };

  const handleSendMessage = async () => {
    if (!selectedRecipient) return;

    console.log(messageContent, selectedRecipient);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3500/api/directMessages",
        {
          userId: selectedRecipient._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeMessageModal();
      setDirectMessages([...directMessages, response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <dialog ref={messageModalRef}>
      <div id="message-modal">
        <label className="message-modal-input-label" htmlFor="">
          Recipient
        </label>
        <input
          id="message-modal-input"
          type="text"
          placeholder="Enter recipient name here"
          value={userSearchQuery || ""}
          onChange={(e) => setUserSearchQuery(e.target.value)}
        />
        <fieldset className="overflow-y-scroll h-40 text-white">
          <legend className="message-modal-input-label">
            Select recipient
          </legend>
          {searchedUsers.map((user) => (
            <div key={user._id} className="flex">
              <input
                type="radio"
                name="recipient"
                checked={
                  selectedRecipient && selectedRecipient._id === user._id
                }
                onChange={() => handleRecipientSelection(user)}
              />
              <label className="ml-2">
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}
        </fieldset>
        <div id="message-modal-buttons">
          <button id="message-modal-cancel" onClick={() => closeMessageModal()}>
            Cancel
          </button>
          <button id="message-modal-send" onClick={handleSendMessage}>
            Start Direct Message
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateMessageModal;
