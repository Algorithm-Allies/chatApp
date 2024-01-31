import React, { useState, useContext } from "react";
import { ChatContext } from "../context/Context";

function AddMessageInput({ selectedChat }) {
  const { handleSendMessage } = useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log(selectedChat);
    //handleSendMessage(selectedChat._id, inputMessage);
  };

  return (
    <div className="flex items-center p-2 bg-gray-300 rounded mt-auto mb-2">
      <input
        className="w-full text-black bg-transparent outline-none"
        placeholder="Send a message..."
        value={inputMessage}
        onChange={handleInputMessageChange}
      />
      <button
        className="ml-2 bg-green-500 text-white rounded p-2"
        onClick={sendMessage}
      >
        send
      </button>
    </div>
  );
}

export default AddMessageInput;
