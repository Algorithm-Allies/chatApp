import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";
function DirectMessages({ setMobileMenuOpen }) {
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
    setMobileMenuOpen(false);
  };

  return (
    <div className="text-gray-700 overflow-hidden">
      {directMessages.map((dm) => {
        const otherMember = dm.members.find(
          (member) => member.user._id !== currentUser._id
        );
        return (
          <div
            key={dm._id}
            className=" flex items-center  p-2 rounded hover:bg-gray-300 cursor-pointer min-w-0 flex-1 overflow-hidden overflow-ellipsis transition-transform duration-300 transform hover:-translate-y-1"
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
