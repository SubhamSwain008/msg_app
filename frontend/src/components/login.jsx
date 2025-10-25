import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();
  const { setName, connectScoket } = useAuthStore();

  const Submit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "https://msg-app-one.vercel.app/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");
      setName(res.data.fullname, res.data._id, res.data.profilePic);
      connectScoket();
      nav("/");
    } catch (err) {
      console.log(err);
      setErrorMsg("⚠️ Login failed. Please check your credentials.");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-gray-900 text-white px-6">
      {isLoggingIn ? (
        <div className="text-lg font-semibold animate-pulse">
          Logging you in...
        </div>
      ) : (
        <form
          onSubmit={Submit}
          className="bg-blue-800 bg-opacity-40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-5 border border-blue-500/30 transition-all duration-300 hover:shadow-blue-600/30"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-blue-100">
            Welcome Back 👋
          </h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/40 border border-gray-600 focus:border-blue-400 outline-none transition-all duration-200 placeholder-gray-400 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900/40 border border-gray-600 focus:border-blue-400 outline-none transition-all duration-200 placeholder-gray-400 text-white"
            required
          />

          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-blue-500/50 active:scale-95"
          >
            Log In
          </button>

          {errorMsg && (
            <p className="text-red-400 text-center text-sm mt-2 animate-fadeIn">
              {errorMsg}
            </p>
          )}

          <div className="text-center mt-4 text-gray-300">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => nav("/signup")}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
