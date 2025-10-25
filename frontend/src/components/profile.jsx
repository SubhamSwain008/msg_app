import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import defalutpic from "../assets/react.svg";

export default function MyProfile() {
  const { authUser, setName } = useAuthStore();
  const imgInputRef = useRef(null);
  const [profileUpdating, setProfileUpdating] = useState(false);
  const bigProfileRef = useRef(null);

  useEffect(() => {
    console.log({ authdata: authUser });
  }, [authUser]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileUpdating(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.put(
        "https://msg-app-subhamswain008s-projects.vercel.app/api/auth/update-profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data?.message) {
        setName(
          res.data.message.fullname,
          res.data.message._id,
          res.data.message.profilePic
        );
      }
    } catch (err) {
      console.error("Failed to update profile:", err.response?.data || err.message);
    } finally {
      setProfileUpdating(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-3 bg-gray-800 rounded-xl w-40 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-sm font-semibold mb-2">{authUser?.name || "User"}</h1>

      {profileUpdating ? (
        <div className="text-xs text-gray-300 mb-2 animate-pulse">Updating...</div>
      ) : (
        <div className="relative">
          <img
            src={authUser?.profilePic || defalutpic}
            alt="profile"
            onClick={() => imgInputRef.current.click()}
            onError={(e) => { e.target.onerror = null; e.target.src = defalutpic; }}
            onMouseEnter={() => {
              if (bigProfileRef.current) {
                bigProfileRef.current.style.display = "block";
                bigProfileRef.current.style.opacity = "1";
              }
            }}
            onMouseLeave={() => {
              if (bigProfileRef.current) {
                bigProfileRef.current.style.opacity = "0";
                setTimeout(() => { bigProfileRef.current.style.display = "none"; }, 200);
              }
            }}
            className="w-16 h-16 rounded-full cursor-pointer border-2 border-gray-500 object-cover mb-2 transition-transform duration-200 hover:scale-110"
          />

          {/* Big hover preview */}
          <img
            src={authUser?.profilePic || defalutpic}
            ref={bigProfileRef}
            alt="big-profile"
            style={{
              position: "absolute",
              top: "-40%",
              left: "120%",
              display: "none",
              borderRadius: "12px",
              minHeight: "100px",
              maxHeight: "120px",
              maxWidth: "120px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
              transform: "scale(1)",
              zIndex: 500,
            }}
          />
        </div>
      )}

      <input
        type="file"
        ref={imgInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </div>
  );
}
