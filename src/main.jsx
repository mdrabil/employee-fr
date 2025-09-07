// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/print.css'
import App from './App.jsx'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <>
    <App />
<ToastContainer position="top-right"


  // position="top-right" 
  autoClose={3000}
  // hideProgressBar={false}
  // newestOnTop={false}
  // closeOnClick
  // rtl={false}
  // pauseOnFocusLoss
  // draggable
  // pauseOnHover
  theme="light"
  closeButton={false} 
/>
  </>,
)
