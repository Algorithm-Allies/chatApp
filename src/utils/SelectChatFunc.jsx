export const SelectChatFunc = (
  chat,
  setTitleName,
  fetchMessages,
  setSelectedChat
) => {
  setSelectedChat(chat);
  setTitleName(chat.chatName);
  fetchMessages(chat._id);
};
