import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import defalutpic from "../assets/react.svg";

export default function MyProfile() {
  const { authUser, setName } = useAuthStore();
  const imgInputRef = useRef(null);
  const [profileUpadting, setProfileUpdating] = useState(false);

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
        "http://localhost:4000/api/auth/update-profile",
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
    <div className="flex flex-col items-center p-2 bg-gray-800 text-white rounded w-36">
      <h1 className="text-sm font-semibold mb-2">{authUser?.name || "User"}</h1>

      {profileUpadting ? (
        <div className="text-xs text-gray-300 mb-2">Updating...</div>
      ) : (
        <img
          src={authUser.profilePic || defalutpic}
          alt="profile"
          onClick={() => imgInputRef.current.click()}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defalutpic;
          }}
          className="w-16 h-16 rounded-full cursor-pointer border border-gray-500 object-cover mb-2"
        />
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
