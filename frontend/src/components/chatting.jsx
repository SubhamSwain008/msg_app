import { useEffect } from "react";
import { useChatStore } from "./useChatstore.js";
import ChatBox from "./chatbox.jsx";

export default function ChattingUsers() {
  const {
    allContacts,
    chats,
    messages,
    activeTab,
    selectedUser,
    setSelectUser,
    getMessages,
    isMessageLoading,
    setActiveTab,
  } = useChatStore();

  useEffect(() => {
    console.log("users:", allContacts, "chats:", chats);
  }, [allContacts, chats]);

  const handleUserClick = async (userId) => {
    setSelectUser(userId);
    await getMessages(userId);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-600 text-white p-2 overflow-y-auto">
        {activeTab === "chats" ? (
          <>
            <h1
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setActiveTab("contacts")}
            >
              Chats
            </h1>
            {chats.map((val) => (
              <div
                key={val._id}
                className={`bg-blue-700 p-2 my-1 rounded cursor-pointer ${
                  selectedUser === val._id ? "bg-blue-800" : ""
                }`}
                onClick={() => handleUserClick(val._id)}
              >
                {val.fullname}
              </div>
            ))}
          </>
        ) : (
          <>
            <h1
              className="text-lg font-bold mb-2 cursor-pointer"
              onClick={() => setActiveTab("chats")}
            >
              Contacts
            </h1>
            {allContacts.map((val) => (
              <div
                key={val._id}
                className={`bg-blue-700 p-2 my-1 rounded cursor-pointer ${
                  selectedUser === val._id ? "bg-blue-800" : ""
                }`}
                onClick={() => handleUserClick(val._id)}
              >
                {val.fullname}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Chat Box */}
      <div className="flex-1 bg-gray-900 text-white p-3 overflow-y-auto">
        {selectedUser ? (
          isMessageLoading ? (
            <div className="text-gray-400">Loading messages...</div>
          ) : (
            <ChatBox chatarray={messages} />
          )
        ) : (
          <div className="text-gray-400 text-center mt-10">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
