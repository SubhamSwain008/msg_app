import { useChatStore } from "./useChatstore";
import { useState } from "react";

export default function ChatBox({ chatarray }) {
  const { sendMessages, selectedUser } = useChatStore();
  const [inputText, setInputText] = useState("");

  return (
    <>
  
        <div className="flex flex-col h-full justify-between p-4">
        
          <div className="flex flex-col gap-2 overflow-y-auto">
            {chatarray.map((val, idx) => (
              <div
                key={idx}
                className={`flex ${
                  val.senderId === selectedUser ? "justify-start":"justify-end" 
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-3 py-2 text-white ${
                    val.senderId === selectedUser
                      ? "bg-blue-600 text-right"
                      : "bg-gray-700 text-left"
                  }`}
                >
                  {val.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-900 text-white rounded-xl px-3 py-2 outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={() => {
                if (inputText.trim() !== "") {
                  sendMessages(selectedUser, inputText);
                  setInputText("");
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      
    </>
  );
}
