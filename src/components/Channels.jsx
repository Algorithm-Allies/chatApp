import React from "react";
import Data from "../Data/Data.json";
import RestructuredData from '../Data/RestructuredData.json'
import { Link } from "react-router-dom";

function Channels({ handleSelect }) {
  return (
    <div className="text-white">
      {
        RestructuredData.channels.map((channel) => {
          
        })
      }
      {/* {RestructuredData.channels.map((channel) => {
        return (
          // <div
          //   key={channel.id}
          //   className="text-white hover:bg-gray-800 cursor-pointer p-1"
          //   onClick={() => handleSelect(channel)}
          // >
          //   <Link to={`/chat-page/${channel.id}`}>#{channel.name}</Link>
          // </div>
          <div>

            </div>
        );
      })} */}
    </div>
  );
}

export default Channels;
