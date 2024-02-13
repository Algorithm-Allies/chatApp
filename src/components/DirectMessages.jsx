import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";
function DirectMessages() {
  const {
    directMessages,
    users,
    fetchSingleDirectMessages,
    fetchDirectMessages,
    fetchCurrentUser,
    currentUser,
  } = useContext(ChatContext);

  useEffect(() => {
    fetchCurrentUser();
    fetchDirectMessages();
  }, []);

  const handleSelect = (chatId) => {
    fetchSingleDirectMessages(chatId);
  };

  return (
    <div className="text-white">
      {directMessages.map((dm) => {
        const otherMember = dm.members.find(
          (member) => member.user._id !== currentUser._id
        );
        return (
          <div
            key={dm._id}
            className="text-white hover:bg-gray-800 cursor-pointer flex items-center p-1"
            onClick={() => handleSelect(dm._id)}
          >
            <img
              src={otherMember.user.profilePhoto}
              alt={otherMember.user.firstName}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span>
              {otherMember.user.firstName} {otherMember.user.lastName}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default DirectMessages;
