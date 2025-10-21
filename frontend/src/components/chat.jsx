import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore.js";

axios.defaults.withCredentials = true; //  enables sending cookies by default

export default function ChatPage() {
const [user,setUser]=useState([]);
const {authUser,isLoggedin,login,setName}=useAuthStore();
  useEffect(()=>{
    const getUser=async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/msg/all-people", {
        withCredentials: true, // explicitly set credentials for this request
      });
      console.log(res.data);
      setUser(res.data.map((v,idx)=>({_id:v._id,fullname:v.fullname})
      
      ));
      
      
    } catch(e) {
      console.error("Error fetching messages:", e.response?.data || e.message);
    }
  }
  getUser();
  
},[]);
useEffect(()=>{
    console.log(user)
},[user])

  return (
    <div>
      <h1>Welcome to chat page</h1>
    </div>
  );
}
