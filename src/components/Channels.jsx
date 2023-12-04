import React from "react";
import Data from "../Data/Data.json";
import RestructuredData from '../data/RestructuredData.json'

function Channels({ handleSelect }) {
  Object.entries(RestructuredData.channels).map((channel) => {
    console.log(channel[1])
  })
  return (
    <div className="text-white">
      {Object.entries(RestructuredData.channels).map((channel) => {
        return (
          <div
            key={channel[1].id}
            className="text-white hover:bg-gray-800 cursor-pointer p-1"
            onClick={() => handleSelect(channel[1])}
          >
            #{channel[1].name}
          </div>
        );
      })}
    </div>
  );
}

export default Channels;
