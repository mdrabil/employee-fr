import { toast } from "react-toastify";
import axiosInstance from "./axisoInstance";
import { handleAxiosError } from "./handleAxiosError";

export const CreateRole = async (patientData) => {
  try {
    const response = await axiosInstance.post("/admin", patientData);
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
export const GetAllRoles = async () => {
  try {
    const response = await axiosInstance.get("/admin");
    // Sort by createdAt (latest first)
    const sortedData = response?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sortedData;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 2. Get a single patient by ID
export const GetSinglRoles= async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 3. Update patient by ID
export const UpdateRoles = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`/admin/${id}`, updateData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 4. Delete patient by ID
export const DeleteRoles = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// ✅ 5. Get Today’s Patients (you already have this, adding for completeness)


// 🔐 Centralized error handler

