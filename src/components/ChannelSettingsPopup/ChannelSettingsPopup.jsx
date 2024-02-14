import React from "react";
import axios from "axios";

function ChannelSettingsPopup({ onClose, selectedChannel }) {
  const handleDeleteChannel = async () => {
    const token = localStorage.getItem("token");
    console.log(selectedChannel._id);
    try {
      const response = await axios.delete(
        `http://localhost:3500/api/channels/${selectedChannel._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const isAdmin = selectedChannel.groupAdmin === localStorage.getItem("userId");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <div className="mt-4 flex justify-end">
          {isAdmin && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
              onClick={handleDeleteChannel}
            >
              Delete
            </button>
          )}
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChannelSettingsPopup;
