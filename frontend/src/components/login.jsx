import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore.js';
export default function Login(){
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const nav=useNavigate();
const {authUser,isLoggedin,login}=useAuthStore();
const Submit=async(e)=>{
    e.preventDefault();
   try{ const res=await axios.post("http://localhost:4000/api/auth/login",
        {email,password},{ withCredentials: true } 
    );
    setEmail("");
    setPassword("");
    console.log(res);
    login();
    nav('/Chat')
   }catch(e){
    console.log(e);
   }
}

    return (<>
       <div>
        <form onSubmit={Submit}>
            <input type="text" placeholder="enter email" onChange={(e)=>{
               setEmail(e.target.value);
            }}/>
            
            <input type="password" placeholder="enter password"
            onChange={(e)=>{
               setPassword(e.target.value);
            }}
            />
            <button type="submit">login</button>
        </form>
       </div>
    </>);
}