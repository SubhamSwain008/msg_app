import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
    const nav = useNavigate();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCreating, setCreating] = useState(false);
    const [failMessage, setFail] = useState("");

    const signup = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await axios.post(
                "https://msg-app-one.vercel.app/api/auth/signup",
                { fullname, email, password },
                { withCredentials: true }
            );
            if (res.statusText === "Created") {
                nav("/");
                setCreating(false);
            }
        } catch (err) {
            console.log(err);
            setFail("⚠️ User creation failed. Try again.");
            setCreating(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-gray-900 text-white px-6">
            {isCreating ? (
                <div className="text-lg font-semibold animate-pulse">
                    Creating your account...
                </div>
            ) : (
                <form
                    onSubmit={signup}
                    className="bg-blue-800 bg-opacity-40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-5 border border-blue-500/30 transition-all duration-300 hover:shadow-blue-600/30"
                >
                    <h2 className="text-2xl font-bold text-center mb-2 text-blue-100">
                        Create Your Account
                    </h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900/40 border border-gray-600 focus:border-blue-400 outline-none transition-all duration-200 placeholder-gray-400 text-white"
                        required
                    />

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
                        Sign Up
                    </button>

                    {failMessage && (
                        <p className="text-red-400 text-center text-sm mt-2 animate-fadeIn">
                            {failMessage}
                        </p>
                    )}

                    <div className="text-center mt-4 text-gray-300">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => nav("/login")}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
