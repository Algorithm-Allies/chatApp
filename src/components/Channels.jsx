import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";

function Channels() {
  const { channels, fetchChannels, fetchSingleChannel } =
    useContext(ChatContext);

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleSelect = (channelId) => {
    fetchSingleChannel(channelId);
  };

  return (
    <div className="text-white">
      {channels.map((channel) => (
        <div
          key={channel._id}
          id={channel._id}
          className="border-b border-gray-800 p-4 hover:bg-gray-800 cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis"
          onClick={() => handleSelect(channel._id)}
        >
          <div className="flex items-center">
            <span className="text-green-600">#</span>
            <span>{channel.chatName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Channels;
