import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";

function Channels() {
  const { channels, fetchSingleChannel } = useContext(ChatContext);
  console.log(channels);
  const handleSelect = (info) => {
    fetchSingleChannel(info.id);
  };

  return (
    <div className="text-white">
      {Object.values(channels).map((channel) => (
        <div
          key={channel.id}
          className="text-white hover:bg-gray-800 cursor-pointer p-1"
          onClick={() => handleSelect(channel)}
        >
          <div>#{channel.chatName}</div>
        </div>
      ))}
    </div>
  );
}

export default Channels;
