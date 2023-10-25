import React from "react";
import Data from "../Data/Data.json";

function Channels({ handleSelect }) {
  return (
    <div className="text-white">
      {Data.channels.map((channel) => {
        return (
          <div
            key={channel.id}
            className="text-white hover:bg-gray-800 cursor-pointer p-1"
            onClick={() => handleSelect(channel)}
          >
            #{channel.name}
          </div>
        );
      })}
    </div>
  );
}

export default Channels;
