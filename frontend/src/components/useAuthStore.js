import {create} from 'zustand';


export const useAuthStore=create((set,get)=>({
    authUser:{name:"john",_id:234,profilePic:"k",},
    
    
   

    setName:(name,_id,profilePic)=>{
        set((state)=>
           ( {authUser:{...state.authUser,name,_id,profilePic}})
        )
      
    }
}));