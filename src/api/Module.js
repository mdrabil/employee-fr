import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Get all Roles
export const getModule = async () => {
  try {
    const response = await axiosInstance.get("/modules");

    console.log('module',response?.data)

    return { success: true, module:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};