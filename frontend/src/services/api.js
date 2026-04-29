import axios from "axios";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// ✅ Attach JWT automatically
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

export default api;