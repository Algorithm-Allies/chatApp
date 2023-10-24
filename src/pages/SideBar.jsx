import React, { useState } from "react";
import Data from "../Data/Data.json";
function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function SideBar() {
  const [channelArrowClick, setChannelArrowClick] = useState(false);
  const [messageArrowClick, setMessageArrowClick] = useState(false);

  const channelArrowChange = (e) => {
    e.preventDefault();
    setChannelArrowClick(!channelArrowClick);
  };

  const messageArrowChange = (e) => {
    e.preventDefault();
    setMessageArrowClick(!messageArrowClick);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black w-64 p-4 overflow-y-scroll">
      <div className="text-white text-2xl font-bold mb-4">Chat Channels</div>
      <div className="flex flex-col w-full">
        <div className="text-white flex flex-row w-full justify-between items-center mb-2">
          <h3 className="text-lg">Channels</h3>
          <button onClick={channelArrowChange}>
            {!channelArrowClick ? <ArrowDown /> : <ArrowUp />}
          </button>
        </div>
        {channelArrowClick && (
          <div className="text-white">
            {Data.channels.map((channel) => {
              return (
                <div
                  key={channel.id}
                  className="text-white hover:text-gray-400 cursor-pointer"
                >
                  #{channel.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-4">
        <div className="text-white flex flex-row w-full justify-between items-center mb-2">
          <h3 className="text-lg">Direct Messages</h3>
          <button onClick={messageArrowChange}>
            {!messageArrowClick ? <ArrowDown /> : <ArrowUp />}
          </button>
        </div>
        {messageArrowClick && (
          <div className="text-white">
            {Data.users.map((user) => {
              return (
                <div
                  key={user.id}
                  className="text-white hover:text-gray-400 cursor-pointer"
                >
                  {user.first_name} {user.last_name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
