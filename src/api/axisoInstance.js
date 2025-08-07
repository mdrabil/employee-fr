import axios from "axios";
import { store } from "../redux/store";
// import store from "../app/store";

const axiosInstance = axios.create({
  baseURL: "https://crm-be-13lj.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth?.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
