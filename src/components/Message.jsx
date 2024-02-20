import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ChatContext } from "../context/Context";

const Message = ({
  profilePic,
  firstName,
  lastName,
  message,
  timestamp,
  displayProfilePopup,
  currentUser,
  senderId,
  messageId,
  openMessageId,
  setOpenMessageId,
  socket,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setEditedMessage(message); // Reset edited message on unmount
  }, [message]);

  useEffect(() => {
    const handleEditMessage = (editedMessageId, newText) => {
      if (editedMessageId === messageId) {
        setEditedMessage(newText);
        setEditing(false);
      }
    };

    const handleDeleteMessage = (deletedMessageId) => {
      if (deletedMessageId === messageId) {
        setIsDeleted(true);
      }
    };
    if (socket) {
      socket.on("messageEdited", handleEditMessage);
      socket.on("messageDeleted", handleDeleteMessage);
    }

    return () => {
      socket.off("messageEdited", handleEditMessage);
      socket.off("messageDeleted", handleDeleteMessage);
    };
  }, [socket]);

  const isCurrentUser = currentUser._id === senderId;

  const messageContainerStyle = isCurrentUser
    ? "flex justify-end mb-4"
    : "flex justify-start mb-4";

  const handleToggleMenu = (e) => {
    e.stopPropagation();

    // Do not toggle the menu if the message is in editing mode
    if (editing) {
      return;
    }

    if (openMessageId !== null) {
      setOpenMessageId(null);
      setConfirmingDelete(false);
      // Reset editing state and edited message if toggling to a different message
      if (openMessageId !== messageId) {
        setEditing(false);
        setEditedMessage(message);
      } else {
        // Reset editing state and edited message if no message was open
        setEditing(false);
        setEditedMessage(message);
      }
    }

    // Only open the menu if it's not already open for this message
    if (openMessageId !== messageId) {
      setIsMenuOpen(true);
      setOpenMessageId(messageId);
    }
  };

  const handleEditMessage = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleSaveMessage = () => {
    socket.emit("editMessage", { messageId, newText: editedMessage });
    setEditing(false);
    setIsMenuOpen(false);
    setOpenMessageId(null);
  };

  const handleDeleteMessage = (e) => {
    e.stopPropagation();
    setConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    socket.emit("deleteMessage", messageId);
    setIsDeleted(true);
    setConfirmingDelete(false);
    setIsMenuOpen(false);
    setOpenMessageId(null);
  };

  return (
    <>
      <div>
        {isCurrentUser ? (
          // Message sent by the current user
          <div
            className={messageContainerStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-sender-color text-white p-4 rounded-lg max-w-md`}
            >
              <div
                onClick={(e) => e.stopPropagation}
                className={`flex items-center justify-end`}
              >
                <div className="text-xs text-gray-300">{timestamp}</div>
                <div
                  className="text-sm font-semibold ml-2 cursor-pointer"
                  onClick={displayProfilePopup}
                >
                  {firstName} {lastName}
                </div>
              </div>
              <div
                onClick={(e) => handleToggleMenu(e)}
                className="cursor-pointer"
              >
                {editing ? (
                  <textarea
                    value={editedMessage}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    className="w-full p-2 border text-black border-gray-300 rounded-lg mt-2"
                  />
                ) : isDeleted ? (
                  <p className="text-sm mt-2 text-red-900 font-semibold">
                    This message has been deleted
                  </p>
                ) : (
                  <p className="text-sm mt-2">{editedMessage}</p>
                )}
              </div>
              {isMenuOpen && openMessageId === messageId && (
                <div
                  className={`flex justify-end mt-2 `}
                  onClick={(e) => e.stopPropagation()}
                >
                  {editing ? (
                    <button
                      onClick={handleSaveMessage}
                      className="px-2 py-1 text-xs hover:bg-green-300 hover:bg-opacity-30 rounded-lg hover:text-green-800 bg-green-700
                      text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEditMessage}
                      className="px-2 py-1 text-xs hover:bg-gray-300 hover:bg-opacity-30 rounded-lg hover:text-gray-700 bg-gray-700
                      text-gray-300"
                    >
                      Edit
                    </button>
                  )}
                  {confirmingDelete ? (
                    <button
                      onClick={handleConfirmDelete}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-700 hover:text-gray-400"
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={handleDeleteMessage}
                      className="px-2 py-1 text-xs hover:bg-gray-300 hover:bg-opacity-30 rounded-lg hover:text-red-800 text-gray-300 bg-red-800 ml-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
            <img
              src={profilePic}
              alt={firstName}
              className="w-10 h-10 rounded-full ml-4 mr-2 cursor-pointer"
              onClick={displayProfilePopup}
            />
          </div>
        ) : (
          // Message sent by another user
          <div className={messageContainerStyle}>
            <img
              src={profilePic}
              alt={firstName}
              className="w-10 h-10 rounded-full mr-4 cursor-pointer"
              onClick={displayProfilePopup}
            />
            <div
              className={`bg-recipient-color text-black p-4 rounded-lg max-w-md`}
            >
              <div className={`flex items-center `}>
                <div
                  className="text-sm font-semibold mr-2 cursor-pointer"
                  onClick={displayProfilePopup}
                >
                  {firstName} {lastName}
                </div>
                <div className="text-xs text-gray-500">{timestamp}</div>
              </div>
              <div>
                {isDeleted ? (
                  <p className="text-sm mt-2 text-red-800 font-semibold">
                    This message has been deleted
                  </p>
                ) : (
                  <p className="text-sm mt-2">{message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
