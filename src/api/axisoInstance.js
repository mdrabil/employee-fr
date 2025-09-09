import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";

// 🔹 Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState(); // 👈 Redux ka state fetch karo
    const token = state?.auth?.token || localStorage.getItem("authToken");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    // ✅ Agar FormData hai to content-type khud Axios set karega
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expire ya invalid
      store.dispatch(logout()); // 👈 Redux state clear
      localStorage.removeItem("authToken"); // 👈 localStorage bhi clear karo
      window.location.href = "/login"; // 👈 redirect forcefully
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
