// ChatPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "./useChatstore.js";
import Logout from "./logout.js";
import MyPorfile from "./profile.jsx";
import { useAuthStore } from "./useAuthStore.js";
import ChattingUsers from "./chatting.jsx";

export default function ChatPage() {
  const {
    allContacts,
    chats,
    messages,
    activeTab,
    selectedUser,
    isUserLoading,
    isMessageLoading,
    getAllContacts,
    getAllChats,
  } = useChatStore();
  const { authUser, setName } = useAuthStore();
  const [isauthloading, setAuthloading] = useState(true);
  const nav = useNavigate();

  // Auth check
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/auth-check", {
          withCredentials: true,
        });
        if (!res.data.message) {
          nav("/login");
        } else {
          getAllContacts();
          getAllChats();
          setName(res.data.fullname, res.data._id, res.data.profilePic || "");
        }
      } catch (e) {
        console.error("Auth check failed:", e.response?.data);
        nav("/login");
      } finally {
        setAuthloading(false);
      }
    })();
  }, [nav]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top bar with Profile + Logout */}
      <div className="flex items-center justify-between p-3 bg-gray-800 flex-shrink-0">
        {isauthloading ? (
          <div>Loading...</div>
        ) : (
          <MyPorfile />
        )}
        <button
          onClick={() => {
            Logout();
            nav("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main chat + contacts */}
      <div className="flex-1 overflow-hidden">
        {isUserLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading chats...
          </div>
        ) : (
          <ChattingUsers />
        )}
      </div>
    </div>
  );
}
