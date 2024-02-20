import React, { useState, useContext } from "react";
import { ChatContext } from "../context/Context";

function AddMessageInput({ socket, chatId }) {
  const { handleSendMessage, fetchMessages, selectedChannel } =
    useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    //handleSendMessage(inputMessage);

    //Emit a "sendMessage" event to the server with the message content
    socket.emit("sendMessage", {
      chatId: chatId,
      text: inputMessage,
    });

    // Clear the input field after sending the message
    setInputMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 rounded mb-2 mt-4">
      <input
        className="w-full text-black bg-transparent outline-none"
        placeholder="Send a message..."
        value={inputMessage}
        onChange={handleInputMessageChange}
        onKeyDown={handleEnterPress}
      />
      <button
        className="ml-2 bg-blue-green text-white rounded p-2"
        onClick={sendMessage}
      >
        send
      </button>
    </div>
  );
}

export default AddMessageInput;
