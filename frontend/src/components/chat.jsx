import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "./useChatstore";
import Logout from "./logout.js";
import MyPorfile from "./profile.jsx";
import { useAuthStore } from "./useAuthStore.js";
axios.defaults.withCredentials = true;

export default function ChatPage() {
  const{allContacts ,chats,messages,activeTab,selectedUser,isUserLoading,isMessageLoading,isSoundEnabled,getAllContacts,getAllChats}=useChatStore();
  const {authUser,setName}=useAuthStore();
  const[isauthloading,setAuthloading]=useState(true);
  const nav = useNavigate();


  //auth check and get contacts
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
          setName(res.data.fullname,res.data._id,res.data.profilePic);
          
        }
      } catch (e) {
        console.error("Auth check failed:", e.response?.data );
        nav("/login");
      }finally{
        setAuthloading(false);
      }
    })();
  }, [nav]);

 


  return (
    <div>
      {isauthloading?<div>loading...</div>:<div><MyPorfile/></div>}
      <button onClick={()=>{Logout();
      nav('/login');

      }}>logout</button>
    </div>
  );
}
