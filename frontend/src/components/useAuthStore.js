import {create} from 'zustand';
import { io } from "socket.io-client"



export const useAuthStore=create((set,get)=>({
    authUser:{name:"john",_id:234,profilePic:"k",},
    
    scoket:null,
    onlineUser:[],

   

    setName:(name,_id,profilePic)=>{
        set((state)=>
           ( {authUser:{...state.authUser,name,_id,profilePic}})
        )
      
    },
    connectScoket:()=>{
        const {authUser}=get();
        if(!authUser || get().scoket?.connected) return ;
        
        const scoket = io("http://localhost:4000", {
                        transports: ["websocket"],
                        withCredentials: true
                        });
        console.log("socket send from frontend",scoket);
        scoket.connect()
        set({scoket:scoket});
       
        scoket.on("getOnlineUsers",(userIds)=>{
            set({onlineUser:userIds});
             console.log({'online users':userIds});
        });
       
    },
    disconnectScoket:()=>{
        console.log("socket send from frontend");
       if(get().scoket?.connect) get().scoket.disconnect();
    }
}));