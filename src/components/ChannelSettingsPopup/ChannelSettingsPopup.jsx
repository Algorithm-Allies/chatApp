import React from "react";
import axios from "axios";
import AddFriendToGroupChat from "./AddFriendToGroupChat/AddFriendToGroupChat";

function ChannelSettingsPopup({
  onClose,
  selectedChannel,
  setChannels,
  channels,
}) {
  const handleDeleteChannel = async () => {
    const serverUrl = import.meta.env.VITE_APP_SERVER;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${serverUrl}/api/channels/${selectedChannel._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChannels(
        channels.filter((channel) => channel._id !== selectedChannel._id)
      );

      onClose();
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const isAdmin = selectedChannel.groupAdmin === localStorage.getItem("userId");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Channel Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 transform hover:scale-110"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <AddFriendToGroupChat group={selectedChannel} />
        {isAdmin && (
          <div className="h-10 flex flex-col items-start justify-center mt-4">
            <button
              onClick={handleDeleteChannel}
              className="p-2 bg-red-500 text-sm text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChannelSettingsPopup;
