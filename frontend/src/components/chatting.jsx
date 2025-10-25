import { useChatStore } from "./useChatstore.js";
import ChatBox from "./chatbox.jsx";
import defalutpic from "../assets/react.svg";
import { useAuthStore } from "./useAuthStore.js";
import { useEffect } from "react";

export default function ChattingUsers() {
  const {
    allContacts,
    chats,
    messages,
    activeTab,
    selectedUser,
    setSelectUser,
    getMessages,
    setActiveTab,
    getAllChats, // 🆕 added to update chats
  } = useChatStore();

  const { onlineUser } = useAuthStore();

  const handleUserClick = async (userId) => {
    setSelectUser(userId);
    await getMessages(userId);
  };

  // 🆕 Whenever messages change, refresh chat list
  useEffect(() => {
    if (messages.length > 0) {
      getAllChats();
    }
  }, [messages, getAllChats]);

  return (
    <div className="flex h-full overflow-hidden bg-gradient-to-b from-blue-700 to-blue-600">
      {/* Sidebar */}
      <div className="w-1/3 text-white p-4 overflow-y-auto flex flex-col backdrop-blur-md bg-blue-600/90 rounded-r-xl shadow-lg">
        <h1
          className="text-xl font-bold mb-4 cursor-pointer hover:text-yellow-300 transition-colors"
          onClick={() =>
            setActiveTab(activeTab === "chats" ? "People" : "chats")
          }
        >
          {activeTab === "chats" ? "Chats (click to discover more people)" : "People"}
        </h1>

        <div className="flex flex-col gap-3">
          {(activeTab === "chats" ? chats : allContacts).map((val) => (
            <div
              key={val._id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-500 shadow-md ${
                selectedUser === val._id ? "bg-blue-800 shadow-xl" : "bg-blue-700"
              }`}
              onClick={() => handleUserClick(val._id)}
            >
              {/* Profile picture */}
              <div
                className={`relative flex-shrink-0 rounded-full border-2  cursor-pointer transition-all duration-300 
                ${onlineUser.includes(String(val._id)) ? "ring-5 ring-green-400" : "ring-1 ring-gray-400"}
                hover:ml-12 hover:scale-300 hover:shadow-2xl hover:z-10`}
              >
                <img
                  src={val.profilePic || defalutpic}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defalutpic;
                  }}
                />
              </div>

              <span className="font-medium truncate">{val.fullname}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 bg-gray-900 text-white p-5 overflow-y-auto flex flex-col rounded-l-xl shadow-inner">
        {selectedUser ? (
          <ChatBox chatarray={messages} />
        ) : (
          <div className="text-amber-400 text-center mt-20 animate-pulse text-4xl">
            Click on Chats to discover more people
          </div>
        )}
      </div>
    </div>
  );
}
