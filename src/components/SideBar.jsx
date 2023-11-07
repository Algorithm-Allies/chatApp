import React, { useState } from "react";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import UserProfileSettings from "./UserProfileSettings";
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'blahblah';

function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
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
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function AddChannel() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
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

  const handleSelect = (info) => {
    console.log(info);
  };

  const handleAddChannel = () => {
    console.log("adding channel");
    displayMenu()
  };
  const handleAddDirectMessage = () => {
    console.log("adding direct messages");
  };

  const { show } = useContextMenu({
    id: MENU_ID
  });

  function handleItemClick({ event, props, triggerEvent, data }) {
    console.log(event, props, triggerEvent, data);
  }

  function displayMenu(e) {
    show({
      event: e,
    });
  }



  return (
    <div className="flex flex-col items-center h-screen bg-black w-64 overflow-y-scroll">
      <div className="text-white text-2xl font-bold mb-4 mt-4">Ripple</div>
      <div className="flex flex-col w-full h-full p-3 mb-72">
        <div className="flex flex-col w-full">
          <div className="text-white flex flex-row w-full justify-between items-center mb-2">
            <div className="flex flex-row">
              <button
                onClick={channelArrowChange}
                className="bg-gray-800 p-1 rounded"
              >
                {!channelArrowClick ? <ArrowDown /> : <ArrowUp />}
              </button>
              <h3 className="text-lg ml-1">Channels</h3>
            </div>
            <button onClick={displayMenu}>
              <AddChannel />
            </button>
            <Menu id={MENU_ID}>
              <Item onClick={handleItemClick}>
                Create Channel
              </Item>
              <Item onClick={handleItemClick}>
                Join Channel
              </Item>
            </Menu>
          </div>
          {channelArrowClick && <Channels handleSelect={handleSelect} />}
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="text-white flex flex-row w-full justify-between items-center mb-2">
            <div className="flex flex-row">
              <button
                onClick={messageArrowChange}
                className="bg-gray-800 p-1 rounded"
              >
                {!messageArrowClick ? <ArrowDown /> : <ArrowUp />}
              </button>
              <h3 className="text-lg ml-1">Direct Messages</h3>
            </div>
            <button onClick={handleAddDirectMessage}>
              <AddChannel />
            </button>
          </div>
          {messageArrowClick && <DirectMessages handleSelect={handleSelect} />}
        </div>
      </div>
      <UserProfileSettings />
    </div>
  );
}

export default SideBar;
