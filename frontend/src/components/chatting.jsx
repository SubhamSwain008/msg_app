import { useEffect, useState } from "react";
import { useChatStore } from "./useChatstore.js";
import ChatBox from "./chatbox.jsx";

export default function  ChattingUsers(){
 const{allContacts ,chats,messages,activeTab,setSelectUser,getMessages,isMessageLoading}=useChatStore();

 useEffect(()=>{
    console.log("users: ",allContacts,"chats",chats);
  },[])


    return (<><div>
        {activeTab=="chats"?<div  className="bg-blue-600"><h1 onClick={()=>{setActiveTab("contacts")}}>chats</h1>
        
        {chats.map((val,idx)=>(<div key={val._id}  className="bg-blue-700" onClick={()=>{getMessages(val._id);
          setSelectUser(val._id);
          
        }}>

        {val.fullname}
        </div>))}
        
        </div>:<div
       
        className="bg-blue-600" ><h1  onClick={()=>{setActiveTab("chats")}}>all users</h1>
          {allContacts.map((val,idx)=>(<div key={val._id} className="bg-blue-700" onClick={()=>{getMessages(val._id);
          setSelectUser(val._id);
         
        }}>

        {val.fullname}
        </div>))}
        
        </div>}

       {isMessageLoading?<div>message loadding</div>:<ChatBox chatarray={messages} />
} 
        </div></>)
}