import { useChatStore } from "./useChatstore";
import { useState } from "react";
export default function ChatBox({chatarray}){

    const {sendMessages,selectedUser} = useChatStore();
    const [inputText,setInputText]=useState("");
    return (<>
    <div className="bg-red-500 p-1 m-5">
        {chatarray&&chatarray.map((val,idx)=>
        (<div key={idx}>
        <div>{val.text}</div>
        </div>)
        )}
     <div>
        <input type="text" className="bg-yellow-50" onChange={(e)=>setInputText(e.target.value)}/>
        <button onClick={()=>sendMessages(selectedUser,inputText)}>send</button>
    </div>
    </div>

    
        
        </>);
}