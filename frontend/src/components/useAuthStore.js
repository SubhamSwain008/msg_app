import {create} from 'zustand';
import axios from 'axios';

export const useAuthStore=create((set,get)=>({
    authUser:{name:"john",_id:234},
    
    
   

    setName:(name,_id)=>{
        set((state)=>
           ( {authUser:{...state.authUser,name,_id}})
        )
    }
}));