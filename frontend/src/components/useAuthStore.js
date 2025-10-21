import {create} from 'zustand';


export const useAuthStore=create((set,get)=>({
    authUser:{name:"john",_id:234},
    isLoggedin:false,

    login:()=>{
        set({isLoggedin:true});
        console.log("we just logged in ");
    },
    setName:(name,_id)=>{
        set((state)=>
           ( {authUser:{...state.authUser,name,_id}})
        )
    }
}));