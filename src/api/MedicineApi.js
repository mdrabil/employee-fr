import { toast } from "react-toastify";
import axiosInstance from "./axisoInstance";

//  export const GetTodayPatient = async () => {
//   try {
//     const response = await axiosInstance.get("/patients/today");
//    // Sort by createdAt (latest first)
// const filteredDataByTime = response?.data?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

// return filteredDataByTime
//   } catch (error) {
//     // Check for server response error
//     if (error.response) {
//       const { data, status } = error.response;

//       // You can handle specific status codes
//       if (status === 400) {
//         throw new Error(data.message || "Invalid request.");
//       } else if (status === 401) {
//         throw new Error("Unauthorized. Please login again.");
//       } else if (status === 500) {
//         throw new Error("Server error. Please try again later.");
//       } else {
//         throw new Error(data.message || "Something went wrong.");
//       }

//     } else if (error.request) {
//       // Request was made but no response received
//       throw new Error("No response from server. Check your network.");
//     } else {
//       // Any other error
//       throw new Error(error.message || "An unknown error occurred.");
//     }
//   }
// };

// src/api/patient.js


export const CreateMedicine = async (patientData) => {
  try {
    const response = await axiosInstance.post("/medicines", patientData);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      const message = data.message || "Something went wrong.";

      if (status === 400 || status === 422) {
        toast.error(message); // Backend validation error
      } else if (status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (status === 500) {
        toast.error("Server error. Try again later.");
      } else {
        toast.error(message);
      }

      throw new Error(message);
    } else if (error.request) {
      toast.error("No response from server. Check your connection.");
      throw new Error("No response from server.");
    } else {
      toast.error(error.message || "An error occurred.");
      throw new Error(error.message || "Unknown error.");
    }
  }
};




// ✅ 1. Get all patients
export const GetAllMedicine = async () => {
  try {
    const response = await axiosInstance.get("/medicines");
    // Sort by createdAt (latest first)
    const sortedData = response?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sortedData;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 2. Get a single patient by ID
export const GetSingleMedicine = async (id) => {
  try {
    const response = await axiosInstance.get(`/medicines/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 3. Update patient by ID
export const UpdateMedicine = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/medicines/${id}`, updateData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 4. Delete patient by ID
export const DeleteMedicine = async (id) => {
  try {
    const response = await axiosInstance.delete(`/medicines/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 5. Get Today’s Patients (you already have this, adding for completeness)


// 🔐 Centralized error handler
const handleAxiosError = (error) => {
  if (error.response) {
    const { data, status } = error.response;
    if (status === 400) {
      throw new Error(data.message || "Invalid request.");
    } else if (status === 401) {
      throw new Error("Unauthorized. Please login again.");
    } else if (status === 404) {
      throw new Error("Patient not found.");
    } else if (status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error(data.message || "Something went wrong.");
    }
  } else if (error.request) {
    throw new Error("No response from server. Check your network.");
  } else {
    throw new Error(error.message || "An unknown error occurred.");
  }
};
