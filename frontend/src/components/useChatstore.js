import { create } from "zustand";
import axios from "axios";

export const useChatStore=create((set,get)=>({

allContacts:[],
chats:[],
messages:[],
activeTab:"chats",
selectedUser:null,
isUserLoading:false,
isMessageLoading:false,
isSoundEnabled:localStorage.getItem("isSound")===true,
toggleSound:()=>{
    localStorage.setItem("isSound",!get().isSoundEnabled)
    set({isSoundEnabled:!get().isSoundEnabled})
}
,setActiveTab:(tab)=>set({activeTab:tab}),
setSelectUser:(selectedUser)=>set({selectedUser}),
getAllContacts:async()=>{
set({isUserLoading:true});
    try{
      const resUsers = await axios.get("http://localhost:4000/api/msg/all-people", {
            withCredentials: true,
    });
          set({allContacts:resUsers.data});
          console.log(get().allContacts);

}catch(e){
   console.log(e);
}finally{
  set({isUserLoading:flase});
}     
},
getAllChats:async()=>{
set({isUserLoading:true});
    try{
     const resUsers = await axios.get("http://localhost:4000/api/msg/chats", {
            withCredentials: true,
    });
          set({chats:resUsers.data.chatPatners});
          console.log(get().chats);

}catch(e){
console.log(e);
}finally{
 set({isUserLoading:flase});
}
   

},

}));