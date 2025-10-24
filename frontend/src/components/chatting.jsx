import { useEffect } from "react";
import { useChatStore } from "./useChatstore.js";
import ChatBox from "./chatbox.jsx";
import defalutpic from "../assets/react.svg";

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
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-600 text-white p-3 overflow-y-auto flex flex-col">
        <h1
          className="text-xl font-bold mb-3 cursor-pointer hover:text-yellow-300"
          onClick={() =>
            setActiveTab(activeTab === "chats" ? "People" : "chats")
          }
        >
          {activeTab === "chats" ? "Chats" : "People"}
        </h1>

        <div className="flex flex-col gap-2">
          {(activeTab === "chats" ? chats : allContacts).map((val) => (
            <div
              key={val._id}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-500 transition-colors ${
                selectedUser === val._id ? "bg-blue-800" : "bg-blue-700"
              }`}
              onClick={() => handleUserClick(val._id)}
            >
              <img
                src={val.profilePic || defalutpic}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defalutpic;
                }}
              />
              <span className="font-medium truncate">{val.fullname}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 bg-gray-900 text-white p-4 overflow-y-auto flex flex-col">
        {selectedUser ? (
          isMessageLoading ? (
            <div className="text-gray-400 text-center mt-10">
            
            </div>
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
