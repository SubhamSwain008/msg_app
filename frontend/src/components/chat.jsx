import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "./useChatstore";
axios.defaults.withCredentials = true;

export default function ChatPage() {
  const{allContacts ,chats,messages,activeTab,selectedUser,isUserLoading,isMessageLoading,isSoundEnabled,getAllContacts,getAllChats}=useChatStore();
  const nav = useNavigate();


  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/auth-check", {
          withCredentials: true,
        });
        console.log("Auth check:", res.data);

        if (!res.data.message) {
          
          nav("/login");
        }else{
          getAllContacts();
          getAllChats();
        }
      } catch (e) {
        console.error("Auth check failed:", e.response?.data );
        nav("/login");
      }
    })();
  }, [nav]);

 


  return (
    <div>
      <h1>Welcome to chat page</h1>
    </div>
  );
}
