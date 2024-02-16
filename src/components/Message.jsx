import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ChatContext } from "../context/Context";

const Message = ({
  profilePic,
  firstName,
  lastName,
  message,
  timestamp,
  currentUser,
  senderId,
  messageId,
  openMessageId,
  setOpenMessageId,
  socket,
  handleClickMessage,
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

    socket.on("messageEdited", handleEditMessage);
    socket.on("messageDeleted", handleDeleteMessage);

    return () => {
      socket.off("messageEdited", handleEditMessage);
      socket.off("messageDeleted", handleDeleteMessage);
    };
  }, []);

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

    // Close any existing menu before opening a new one
    if (openMessageId !== null) {
      setOpenMessageId(null);
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
      <div onClick={() => setIsMenuOpen(false)}>
        {isCurrentUser ? (
          // Message sent by the current user
          <div
            className={messageContainerStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-blue-500 text-black p-4 rounded-lg max-w-md`}>
              <div className={`flex items-center justify-end`}>
                <div className="text-xs text-gray-800">{timestamp}</div>
                <div
                  className="text-sm font-semibold ml-2 cursor-pointer"
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
                    onChange={(e) => setEditedMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                  />
                ) : isDeleted ? (
                  <p className="text-sm mt-2 text-red-800 font-semibold">
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
                      className="px-2 py-1 text-xs bg-green-300 bg-opacity-30 rounded-lg text-green-800 hover:bg-green-700
                      hover:text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEditMessage}
                      className="px-2 py-1 text-xs bg-gray-300 bg-opacity-30 rounded-lg text-gray-700 hover:bg-gray-700
                      hover:text-gray-300"
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
                      className="px-2 py-1 text-xs bg-gray-300 bg-opacity-30 rounded-lg text-red-800 hover:text-gray-300 hover:bg-red-800 ml-2"
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
              onClick={() => {
                handleClickMessage({
                  user: { _id: senderId },
                  text: message,
                  updatedAt: new Date().toISOString(),
                  _id: messageId,
                });
              }}
            />
          </div>
        ) : (
          // Message sent by another user
          <div className={messageContainerStyle}>
            <img
              src={profilePic}
              alt={firstName}
              className="w-10 h-10 rounded-full ml-4 mr-2 cursor-pointer"
              onClick={() => {
                handleClickMessage({
                  user: { _id: senderId },
                  text: message,
                  updatedAt: new Date().toISOString(),
                  _id: messageId,
                });
              }}
            />
            <div className={`bg-gray-300 text-black p-4 rounded-lg max-w-md`}>
              <div className={`flex items-center `}>
                <div
                  className="text-sm font-semibold mr-2 cursor-pointer"
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
