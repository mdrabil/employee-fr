

import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Get all Projects
export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects");

    console.log('data',response?.data)

    return { success: true, projectdata:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

export const getSingleProjects = async (id) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`);

    console.log('data',response?.data)

    return { success: true, projectdata:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

// ✅ Create Projectsdata
export const createProjects = async (data) => {
  try {
    const response = await axiosInstance.post("/projects", data);
    // showToast("Projectsdata created successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Update Projectsdata
export const updateProjects = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}`, data);
    // showToast("Projectsdata updated successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Delete Projectsdata
export const deleteProjects = async (id) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}`);
    // showToast("Projectsdata deleted successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
