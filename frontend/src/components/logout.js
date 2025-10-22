import axios  from "axios";

export default async function Logout(){
   
    try{
     const res=await axios.post("http://localhost:4000/api/auth/logout", {
          withCredentials: true,
        });
       

    }catch(e){
        console.log(e)
    }
}