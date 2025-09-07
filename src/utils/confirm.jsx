// utils/confirm.js
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

// ✅ Small icons
const getIcon = (type) => {
  switch (type) {
    case "success":
      return ReactDOMServer.renderToString(<FaCheckCircle size={16} color="#4BB543" />);
    case "error":
      return ReactDOMServer.renderToString(<FaTimesCircle size={16} color="#FF4C4C" />);
    case "warning":
      return ReactDOMServer.renderToString(<FaExclamationTriangle size={16} color="#FFD900" />);
    default:
      return "";
  }
};

export const confirmAction = async ({
//   title = "Are you sure?",
  text = "",
  icon = "warning",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
}) => {
let   title = "Are you sure?" ;
  const result = await Swal.fire({
    title: `<div style="display:flex;align-items:center;gap:6px;justify-content:center;">
              ${getIcon(icon)} 
              <span style="font-size:16px;font-weight:500;">${title}</span>
            </div>`,
    text,
    icon: undefined,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,

    // 🎨 Theme
    confirmButtonColor: "var(--main-color)",
    cancelButtonColor: "#6B7280",
    background: "var(--bg-color)",
    color: "var(--text-color)",

    // ✅ Compact size
    width: "250px", // chhota popup
    padding: "1rem", // 8px padding only
    customClass: {
      popup: "rounded-md shadow-md",
      confirmButton: "px-5 py-1 text-xs rounded",
      cancelButton: "px-5 py-1 text-xs rounded",
    },
  });

  return result.isConfirmed;
};

