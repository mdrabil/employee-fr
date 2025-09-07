// import { toast } from "react-toastify";
// import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaClock } from "react-icons/fa";

// // Helper to return icon as HTML string (no JSX)
// const getIcon = (type) => {
//   const style = "margin-right: 8px; vertical-align: middle;";
//   switch (type) {
//     case "success":
//       return `<span style="${style}">${FaCheckCircle({ size: 18 })}</span>`;
//     case "error":
//       return `<span style="${style}">${FaTimesCircle({ size: 18 })}</span>`;
//     case "warning":
//       return `<span style="${style}">${FaExclamationTriangle({ size: 18 })}</span>`;
//     case "pending":
//       return `<span style="${style}">${FaClock({ size: 18 })}</span>`;
//     default:
//       return "";
//   }
// };

// export const showToast = (message, type = "success") => {
//   let bgColor = "";

//   switch (type) {
//     case "success":
//       bgColor = "#4BB543";
//       break;
//     case "error":
//       bgColor = "#FF4C4C";
//       break;
//     case "warning":
//       bgColor = "#ffd900ff";
//       break;
//     case "pending":
//       bgColor = "#FFA500";
//       break;
//     default:
//       bgColor = "#333";
//   }

//   toast(message, {
//     icon: false, // we'll handle icon in message itself
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     style: {
//       background: bgColor,
//       color: "#fff",
//       fontWeight: "500",
//       fontFamily: "'Poppins', sans-serif", // nice Google font
//       fontSize: "14px",
//       padding: "8px 14px", // less padding
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",
//     },
//   });
// };


import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

// ✅ Icon getter
const getIcon = (type) => {
  const style = { marginRight: "8px", verticalAlign: "center" };
  switch (type) {
    case "success":
      return <FaCheckCircle size={18} style={style} />;
    case "error":
      return <FaTimesCircle size={18} style={style} />;
    case "warning":
      return <FaExclamationTriangle size={18} style={style} />;
    case "pending":
      return <FaClock size={18} style={style} />;
    default:
      return null;
  }
};

export const showToast = (message, type = "success") => {
  let bgColor = "";

  switch (type) {
    case "success":
      bgColor = "#4BB543";
      break;
    case "error":
      bgColor = "#FF4C4C";
      break;
    case "warning":
      bgColor = "#FFD900";
      break;
    case "pending":
      bgColor = "#FFA500";
      break;
    default:
      bgColor = "#333";
  }

  toast(
    <div style={{ display: "flex", alignItems: "center" }}>
      {getIcon(type)}
      <span>{message}</span>
    </div>,
    {
      position: "top-right", // ✅ Mobile pe center me better lagega
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: bgColor,
        color: "#fff",
        fontWeight: "500",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "14px",
        padding: "1px 10px",
        borderRadius: "5px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        maxWidth: "280px", // ✅ Mobile pe chhota rakha
        width: "auto",
        // margin: "0 auto", 
      },
    }
  );
};
