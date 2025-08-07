// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000")
// const socket = io("https://crm-be-13lj.onrender.com")


export default socket;
