// import { showToast } from "../utils/toastHelper";

// export const handleAxiosError = (error) => {
//   if (error.response) {
//     const { data, status } = error.response;
//     if (status === 400) {
//       throw new Error(data.message || "Invalid request.");
//     } else if (status === 401) {
//       throw new Error("Unauthorized. Please login again.");
//     } else if (status === 404) {
//       throw new Error("Patient not found.");
//     } else if (status === 500) {
//       throw new Error("Server error. Please try again later.");
//     } else {
//       throw new Error(data.message || "Something went wrong.");
//     }
//   } else if (error.request) {
//     throw new Error("No response from server. Check your network.");
//   } else {
//     throw new Error(error.message || "An unknown error occurred.");
//   }
// };




// // ✅ Centralized error handler
// export const handleApiError = (error) => {
//   console.error("API Error:", error);

//   // Agar backend ne error message diya ho to wahi show kare
//   const message = error?.response?.data?.message || "Something went wrong!";
  
//   showToast(message, "error");
  
//   return { success: false, message };
// };




import { showToast } from "../utils/toastHelper";

// ✅ Centralized error handler
export const handleApiError = (error) => {
  console.error("API Error:", error);

  let message = "Something went wrong!";

  if (error.response) {
    const { data, status } = error.response;

    if (status === 400) {
      message = data.message || "Invalid request.";
    } 
    else if (status === 401) {
      message = "Unauthorized. Please login again.";
    }
     else if (status === 404) {
      message = data.message || "Page not found.";
    } else if (status === 500) {
      message = "Server error. Please try again later.";
    } else {
      message = data.message || "Something went wrong.";
    }
  } else if (error.request) {
    message = "No response from server. Check your network.";
  } else {
    message = error.message || "An unknown error occurred.";
  }

  // ✅ Toast dikhana
  showToast(message, "error");

  // ✅ Consistent response
  return { success: false, message };
};
