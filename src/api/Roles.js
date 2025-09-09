

import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Get all Roles
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get("/roles");

    // console.log('data',response?.data)

    return { success: true, roles:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

// ✅ Create Role
export const createRoles = async (data) => {
  try {
    const response = await axiosInstance.post("/roles", data);
    // showToast("Role created successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Update Role
export const updateRoles = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/roles/${id}`, data);
    // showToast("Role updated successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Delete Role
export const deleteRoles = async (id) => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}`);
    // showToast("Role deleted successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
