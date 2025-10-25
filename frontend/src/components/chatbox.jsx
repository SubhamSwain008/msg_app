import { useChatStore } from "./useChatstore";
import { useState, useRef, useEffect } from "react";

export default function ChatBox({ chatarray }) {
  const { sendMessages, selectedUser ,isMessageGoingOn,listenToIncomingMessage,stopListiningToMessage} = useChatStore();
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);
useEffect(() => {
  listenToIncomingMessage();
  bottomRef.current?.scrollIntoView();
  
  return()=> stopListiningToMessage();

}, );

  // convert image to base64
  const handleImage= (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setSelectedImage(reader.result);


    };
    reader.readAsDataURL(file);
    
  };


  return (
    <div className="flex flex-col h-full justify-between p-4">
      {/* Chat Messages */}
      <div className="flex flex-col gap-2 overflow-y-auto" >
        {chatarray.map((val, idx) => (
          <div 
            key={idx}
            className={`flex ${
              val.senderId === selectedUser ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-3 py-2 text-white ${
                val.senderId === selectedUser
                  ? "bg-blue-600 text-right"
                  : "bg-gray-700 text-left"
              }`}
            >
              {/* Render text or image */}
              {val.text && <div>{val.text}</div>}
              {val.image && (
                <img
                  src={val.image}
                  alt="sent"
                  className="rounded-xl mt-1 max-w-full h-auto"
                />
              )}
            </div>
             <div ref={bottomRef}></div>
          </div>
         
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 mt-3">
        {selectedImage && <div><button onClick={() => setSelectedImage(null)}>x</button>
          <img src={selectedImage} alt="preview" className="h-20 w-20 rounded-xl object-cover" />
        
        </div>}

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-gray-900 text-white rounded-xl px-3 py-2 outline-none"
          placeholder="Type a message..."
            onKeyDown={(e)=>{
            if(e.key==="Enter"){
              if (inputText.trim() !== "" || selectedImage) {
              sendMessages(selectedUser, inputText || "", selectedImage || null);
              
              setInputText("");
            }
            }
          }}
        />
        <div></div>
        {/* Image Upload */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-xl text-white"
        >
          📷
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImage}
          style={{ display: "none" }}


        />

        {/* Send Button */}
        {isMessageGoingOn==false?
        <button
          onClick={() => {
            if (inputText.trim() !== "" || selectedImage) {
              sendMessages(selectedUser, inputText || "", selectedImage || null);
              
              setInputText("");
            }
          }}
        
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold"
        >
          Send
        </button>:
        <button
          disabled
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold"
        >
          Send
        </button>
        }
      </div>
    </div>
  );
}
