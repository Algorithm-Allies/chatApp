import React, { useState } from "react";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import UserProfileSettings from "./UserProfileSettings";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";

const MENU_ID = "blahblah";

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

function SideBar({ openChannelModal, openMessageModal, directMessages }) {
  const [channelArrowClick, setChannelArrowClick] = useState(false);
  const [messageArrowClick, setMessageArrowClick] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const channelArrowChange = (e) => {
    e.preventDefault();
    setChannelArrowClick(!channelArrowClick);
  };

  const messageArrowChange = (e) => {
    e.preventDefault();
    setMessageArrowClick(!messageArrowClick);
  };

  const handleAddChannel = (e) => {
    displayChannelMenu(e);
  };
  const handleAddDirectMessage = (e) => {
    displayMessageMenu(e);
  };

  const { show: showChannelMenu } = useContextMenu({
    id: "channelMenu",
  });

  const { show: showMessageMenu } = useContextMenu({
    id: "messageMenu",
  });

  function handleItemChannelClick() {
    openChannelModal();
  }

  function handleItemDirectMessageClick() {
    openMessageModal();
  }

  function displayChannelMenu(e) {
    showChannelMenu({
      event: e,
    });
  }

  function displayMessageMenu(e) {
    showMessageMenu({
      event: e,
    });
  }

  return (
    <>
      {/* Render hamburger menu button only on small screens */}
      <div className="lg:hidden md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="block absolute top-0 left-0 m-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6 hover:text-dark-blue cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {mobileMenuOpen && (
          <div className="bg-sidebar-color p-4 absolute top-0 left-0 right-0 bottom-0 w-full shadow-md z-10 overflow-y-auto">
            {/* Mobile Menu Content */}
            <div className="flex justify-between items-center mb-2">
              <button onClick={toggleMobileMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6 hover:text-red-800 cursor-pointer transition-colors duration-300 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col"></div>
            <div className="flex flex-col items-center h-screen bg-sidebar-color w-full text-black">
              <div className=" text-2xl font-bold mb-4 mt-4">Ripple</div>
              <div className="flex flex-col w-full h-full p-3 mb-72">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full justify-between items-center mb-2">
                    <div className="flex flex-row ">
                      <div>
                        <button
                          onClick={channelArrowChange}
                          className="bg-gray-400 text-white p-1 rounded"
                        >
                          {!channelArrowClick ? <ArrowDown /> : <ArrowUp />}
                        </button>
                      </div>
                      <h3 className="text-lg ml-1">Channels</h3>
                    </div>
                    <button onClick={handleAddChannel}>
                      <AddChannel />
                    </button>
                    <Menu id="channelMenu">
                      <Item onClick={handleItemChannelClick}>
                        Create Channel
                      </Item>
                      <Item onClick={handleItemChannelClick}>Join Channel</Item>
                    </Menu>
                  </div>
                  {channelArrowClick && (
                    <Channels setMobileMenuOpen={setMobileMenuOpen} />
                  )}
                </div>
                <div className="flex flex-col w-full mt-4">
                  <div className="flex flex-row w-full justify-between items-center mb-2">
                    <div className="flex flex-row items-start">
                      <div>
                        <button
                          onClick={messageArrowChange}
                          className="bg-gray-400 text-white p-1 rounded"
                        >
                          {!messageArrowClick ? <ArrowDown /> : <ArrowUp />}
                        </button>
                      </div>

                      <h3 className="text-lg ml-1">Direct Messages</h3>
                    </div>
                    <button onClick={handleAddDirectMessage}>
                      <AddChannel />
                    </button>
                    <Menu id="messageMenu">
                      <Item onClick={handleItemDirectMessageClick}>
                        Send Direct Message
                      </Item>
                    </Menu>
                  </div>
                  {messageArrowClick && (
                    <DirectMessages
                      handleItemDirectMessageClick={
                        handleItemDirectMessageClick
                      }
                      setMobileMenuOpen={setMobileMenuOpen}
                    />
                  )}
                </div>
              </div>
              <UserProfileSettings />
            </div>
          </div>
        )}
      </div>
      {/* Render regular menu on medium and larger screens */}
      <div className="hidden md:flex md:flex-col items-center h-screen bg-sidebar-color w-64 overflow-y-scroll text-black">
        <div className=" text-2xl font-bold mb-4 mt-4">ChatApp</div>
        <div className="flex flex-col w-full h-full p-3 mb-72">
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-between items-center mb-2">
              <div className="flex flex-row ">
                <div>
                  <button
                    onClick={channelArrowChange}
                    className="bg-gray-400 text-white p-1 rounded"
                  >
                    {!channelArrowClick ? <ArrowDown /> : <ArrowUp />}
                  </button>
                </div>

                <h3 className="text-lg ml-1">Channels</h3>
              </div>
              <button onClick={handleAddChannel}>
                <AddChannel />
              </button>
              <Menu id="channelMenu">
                <Item onClick={handleItemChannelClick}>Create Channel</Item>
                <Item onClick={handleItemChannelClick}>Join Channel</Item>
              </Menu>
            </div>
            {channelArrowClick && <Channels />}
          </div>
          <div className="flex flex-col w-full mt-4">
            <div className="flex flex-row w-full justify-between items-center mb-2">
              <div className="flex flex-row items-start">
                <div>
                  <button
                    onClick={messageArrowChange}
                    className="bg-gray-400 text-white p-1 rounded"
                  >
                    {!messageArrowClick ? <ArrowDown /> : <ArrowUp />}
                  </button>
                </div>

                <h3 className="text-lg ml-1">Direct Messages</h3>
                <button className="mt-1" onClick={handleAddDirectMessage}>
                  <AddChannel />
                </button>
              </div>
              <Menu id="messageMenu">
                <Item onClick={handleItemDirectMessageClick}>
                  Send Direct Message
                </Item>
              </Menu>
            </div>
            {messageArrowClick && (
              <DirectMessages
                handleItemDirectMessageClick={handleItemDirectMessageClick}
              />
            )}
          </div>
        </div>
        <UserProfileSettings />
      </div>
    </>
  );
}

export default SideBar;
