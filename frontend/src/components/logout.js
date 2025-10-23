import axios from "axios";

export default async function Logout() {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/logout",
      {}, // empty body
      { withCredentials: true } // config goes here
    );

    console.log("Logout success:", res.data);
  } catch (e) {
    console.log("Logout error:", e.response?.data || e);
  }
}
