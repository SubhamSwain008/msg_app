import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Signup(){

    const nav=useNavigate();
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [isCreating,setCreating]=useState(false);
    const [failmessage,setFail]=useState("");

    const signup=async(e)=>{

        e.preventDefault();
        setCreating(true);
        try{
        const res=await axios.post("http://localhost:4000/api/auth/signup",{fullname:fullname,email:email,password:password},{ withCredentials: true });
        if(res.statusText=='Created'){
            nav('/');
            setCreating(false);
        }
        }catch(e){
            console.log(e);
            setFail("user Creation failed");
            setCreating(false);
        }
        
    }
    
     return(<>
     {isCreating?<div>user creation is going on </div>:
      <form onSubmit={signup}>
      <input type="text" placeholder="fullname" onChange={(e)=>setFullname(e.target.value)}/>
      <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
      <input type="text" placeholder="password"onChange={(e)=>setpassword(e.target.value)}/>
      <button type="submit">signup</button>
     
      </form>}
      <div>{failmessage}</div>
      <button onClick={()=>{nav('/login')}}>login</button>
     </>)
}