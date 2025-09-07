

import axios from "axios";
import { store } from "../redux/store";
import { toast } from "react-toastify";

// 🔹 Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// // 🔹 Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state?.auth?.token || localStorage.getItem("authToken");

//     if (token) config.headers["Authorization"] = `Bearer ${token}`;
//     config.headers["Content-Type"] = "application/json";

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
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



export default axiosInstance;
