import { useState } from "react";
import channels from "../../data/channels.json";
import { Link } from "react-router-dom";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

function Sidebar() {
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const channelList = channels.channels;

  function toggleChannelList() {
    setIsChannelListOpen(!isChannelListOpen);
  }

  function toggleMessageList() {
    setIsMessageListOpen(!isMessageListOpen);
  }

  return (
    <div className="sidebar bg-primary-black text-primary-gray h-screen">
      <div className="content flex flex-col justify-start items-start h-full ">
        <div className="title text-xl font-bold m-4">Eclipse Inc.</div>
        <div className="channels flex flex-col w-full justify-between mb-2">
          <div
            onClick={toggleChannelList}
            className="flex w-full justify-between px-3 cursor-pointer"
          >
            <div>Channels</div>
            <div>
              {isChannelListOpen ? (
                <FaSortDown />
              ) : (
                <FaSortUp className="my-2" />
              )}
            </div>
          </div>
          {isChannelListOpen && (
            <div className="channel-list px-4">
              <ul>
                {channelList.map((channel) => (
                  <li key={channel.id} className="text-sm">
                    <Link to={`/home/${channel.id}`}># {channel.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="messages flex flex-col w-full">
          <div
            onClick={toggleMessageList}
            className="flex w-full justify-between px-3 cursor-pointer"
          >
            <div>Messages</div>
            <div>
              {isMessageListOpen ? (
                <FaSortDown />
              ) : (
                <FaSortUp className="my-2" />
              )}
            </div>
          </div>
          {isMessageListOpen && (
            <div className="message-list px-4">
              <ul>
                <li className="text-sm">
                  <Link to="/home">Gwen Stacey</Link>
                </li>
                <li className="text-sm">
                  <Link to="/home">Toby McGuire</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
