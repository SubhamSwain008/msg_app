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
  const { getAllContacts, getAllChats, isUserLoading } = useChatStore();
  const { setName, disconnectScoket, connectScoket } = useAuthStore();
  const [isauthloading, setAuthloading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://msg-app-subhamswain008s-projects.vercel.app/api/auth/auth-check", {
          withCredentials: true,
        });

        if (!res.data.message) {
          nav("/login");
        } else {
          connectScoket();
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

  const handleLogout = () => {
    Logout();
    disconnectScoket();
    nav("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gray-800/70 backdrop-blur-md border-b border-gray-700/60 shadow-md">
        <div className="flex items-center gap-3">
          {isauthloading ? (
            <div className="text-gray-300 animate-pulse text-sm">
              Checking authentication...
            </div>
          ) : (
            <MyPorfile />
          )}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-wide">ChatZone</h1>
            <p className="text-xs text-gray-400">Connected securely</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded-full transition-all duration-200 active:scale-95 shadow-inner border border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </header>

      {/* Main Chat Section */}
      <main className="flex-1 overflow-hidden">
        {isUserLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
            Loading chats...
          </div>
        ) : (
          <ChattingUsers />
        )}
      </main>

      {/* Footer bar (optional aesthetic touch) */}
      <footer className="py-2 text-center text-xs text-gray-500 bg-gray-800/50 border-t border-gray-700/50">
        <span>The Chat App © {new Date().getFullYear()} | Built for conversation</span>
      </footer>
    </div>
  );
}
