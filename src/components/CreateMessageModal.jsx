import React, { useEffect, useState, useContext } from "react";
import { ChatContext } from "../context/Context";
import axios from "axios";

function CreateMessageModal({ messageModalRef, closeMessageModal }) {
  const { directMessages, setDirectMessages } = useContext(ChatContext);
  const [messageContent, setMessageContent] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(users);
  const [selectedRecipient, setSelectedRecipient] = useState({});
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
        `${serverUrl}/api/directMessages`,
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
    <dialog className="max-w-md w-full rounded-md" ref={messageModalRef}>
      <div className="flex flex-col max-w-xl w-full">
        <div className="m-4">
          {" "}
          <label className="text-gray-700 font-semibold" htmlFor="Recipient">
            Recipient
          </label>
          <input
            type="text"
            placeholder="Enter recipient name here"
            className="w-full border rounded px-3 py-2 focus:border-blue-500"
            value={userSearchQuery || ""}
            onChange={(e) => setUserSearchQuery(e.target.value)}
          />
        </div>

        <fieldset className="overflow-y-scroll h-40 text-black m-5 mt-1">
          <legend className="text-gray-700 font-semibold mb-2">
            Select recipient
          </legend>
          {searchedUsers.map((user) => (
            <div key={user._id} className="flex items-center mb-2">
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
        <div className="flex justify-between">
          <button
            className="w-1/2 m-3 bg-gray-300 text-gray-800 font-semibold py-2 rounded hover:bg-gray-400 focus:outline-none"
            onClick={() => closeMessageModal()}
          >
            Cancel
          </button>
          <button
            className="w-1/2 m-3 bg-dark-blue text-white font-semibold py-2 rounded hover:bg-medium-blue focus:outline-none"
            onClick={handleSendMessage}
          >
            Start Direct Message
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateMessageModal;
