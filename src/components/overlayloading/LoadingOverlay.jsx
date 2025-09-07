// src/components/LoadingOverlay.jsx
// import { useSelector } from "react-redux";

// const LoadingOverlay = () => {


//   return (
//     <div className="fixed inset-0 bg-white/90 z-[9999] flex items-center justify-center">
//       <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
//       <p className="ml-4 text-lg font-semibold text-[#004B29]">Loading...</p>
//     </div>
//   );
// };


// export default LoadingOverlay;


import React from "react";

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
      <svg
        className="animate-spin h-12 w-12 text-[var(--main-color)] mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default LoadingOverlay;

