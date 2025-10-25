import axios from "axios";

export default async function Logout() {
  try {
    const res = await axios.post(
      "https://msg-app-frontend-ten.vercel.app.app/api/auth/logout",
      {}, // empty body
      { withCredentials: true } // config goes here
    );

    console.log("Logout success:", res.data);
  } catch (e) {
    console.log("Logout error:", e.response?.data || e);
  }
}
