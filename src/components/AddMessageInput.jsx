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
    <div className="flex items-center p-2 bg-gray-300 rounded mt-auto mb-2">
      <input
        className="w-full text-black bg-transparent outline-none"
        placeholder="Send a message..."
        value={inputMessage}
        onChange={handleInputMessageChange}
        onKeyPress={handleEnterPress}
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
