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
isMessageGoingOn:false,
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
          

}catch(e){
   console.log(e);
}finally{
  
}     
},
getAllChats:async()=>{
set({isUserLoading:true});
    try{
     const resUsers = await axios.get("http://localhost:4000/api/msg/chats", {
            withCredentials: true,
    });
          set({chats:resUsers.data.chatPatners});
         

}catch(e){
console.log(e);
}finally{
 set({isUserLoading:false});
}
   

},
setSelectUser:(id)=>{
    set({selectedUser:id});
},



getMessages:async(id)=>{
    set({isMessageLoading:true});
    try{
     const resMes=await axios.get(`http://localhost:4000/api/msg/${id}`,{withCredentials:true});
     
     set({messages:resMes.data});
     console.log("messages: ",get().messages);
    }catch(e){
      console.log(e);
    }finally{
        set({isMessageLoading:false});
    }
},sendMessages: async (id, text="", image = null) => {
  set({ isMessageGoingOn: true });
  try {
    const payload = { text };
    if (image) payload.image = image; // attach base64 image if available

    const res = await axios.post(
      `http://localhost:4000/api/msg/send/${id}`,
      payload,
      { withCredentials: true }
    );
    console.log("message sent:", res.data);

    // update messages after sending
    get().getMessages(id);
  } catch (e) {
    console.log(e);
  } finally {
    set({ isMessageGoingOn: false });
  }
},

    
}));