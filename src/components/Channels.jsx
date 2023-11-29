import React, { useContext, useEffect } from "react";
import Data from "../Data/RestructuredData.json";
import { ChatContext } from "../context/Context";

function Channels() {
  const { selectedChannel, channels, fetchSingleChannel } =
    useContext(ChatContext);

  const handleSelect = (info) => {
    fetchSingleChannel(info.id);
  };
  console.log(selectedChannel, "selected");

  return (
    <div className="text-white">
      {Object.values(channels).map((channel) => (
        <div
          key={channel.id}
          className="text-white hover:bg-gray-800 cursor-pointer p-1"
          onClick={() => handleSelect(channel)}
        >
          <div>#{channel.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Channels;
