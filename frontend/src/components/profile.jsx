import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import defalutpic from "../assets/react.svg";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { authUser, setName} = useAuthStore(); // assuming you can update authUser
  const imgInputRef = useRef(null);
  const [profileUpadting,setProfileUpdating]=useState(false);
  const nav=useNavigate();

  useEffect(() => {
    console.log({ authdata: authUser });
  }, [authUser]);

  const handleFileChange = async (e) => {
    setProfileUpdating(true);
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.put(
        "http://localhost:4000/api/auth/update-profile",
        formData,
        {
          withCredentials: true, 
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Profile updated:", res.data.message);
      
      
      if (res.data) {
        setName(res.data.message.fullname,res.data.message._id,res.data.message.profilePic);
      }
      setProfileUpdating(false);
    } catch (err) {
      console.error(" Failed to update profile:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <h1>{authUser?.name}</h1>

      {profileUpadting?<div>Profile updating</div>:
     <img
  src={authUser.profilePic || defalutpic}
  alt="profile"
  onClick={() => imgInputRef.current.click()}
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = defalutpic; // set fallback image
  }}
  style={{ cursor: "pointer", width: "100px", borderRadius: "50%" }}
/>
}
      <input
        type="file"
        ref={imgInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
    </>
  );
}
