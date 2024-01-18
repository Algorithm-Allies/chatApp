import React, { useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";

function Channels() {
  const { channels, fetchChannels, fetchSingleChannel } =
    useContext(ChatContext);

  useEffect(() => {
    fetchChannels();
  }, []);

  // const handleSelect = (info) => {
  //fetchSingleChannel(info._id);
  // };

  return (
    <div className="text-white">
      {channels.map((channel) => (
        <div
          key={channel._id}
          className="border-b border-gray-800 p-4 hover:bg-gray-800 cursor-pointer"
          onClick={() => handleSelect(channel)}
        >
          <div className="flex items-center">
            <span className="text-green-500">#</span>
            <span>{channel.chatName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Channels;
