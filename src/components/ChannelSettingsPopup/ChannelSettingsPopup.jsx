import React from "react";

function ChannelSettingsPopup({ onClose, selectedChannel }) {
  const handleDeleteChannel = () => {
    onClose();
  };
  console.log(selectedChannel);

  const groupAdmin = selectedChannel.groupAdmin;
  const loggenInUser = localStorage.getItem("userId");
  console.log(groupAdmin, loggenInUser);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            onClick={onClose}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={handleDeleteChannel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChannelSettingsPopup;
