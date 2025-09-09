
import { showToast } from "../utils/toastHelper";
import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Get all departments
export const getDepartments = async () => {
  try {
    const response = await axiosInstance.get("/departments");

    // console.log('data',response?.data)

    return { success: true, department:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

export const getSingleDepartments = async (id) => {
  try {
    const response = await axiosInstance.get(`/departments/${id}`);

    // console.log('data',response?.data)

    return { success: true, department:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

// ✅ Create department
export const createDepartment = async (data) => {
  try {
    const response = await axiosInstance.post("/departments", data);
    // showToast("Department created successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Update department
export const updateDepartment = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/departments/${id}`, data);
    // showToast("Department updated successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Delete department
export const deleteDepartment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/departments/${id}`);
    // showToast("Department deleted successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
