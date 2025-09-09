

import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Get all Employees
export const getEmployees = async () => {
  try {
    const response = await axiosInstance.get("/employees");

    // console.log('data',response?.data)

    return { success: true, employeesdata:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

export const getSafeEmployees = async () => {
  try {
    const response = await axiosInstance.get("/employees/safe");

    // console.log('data',response?.data)

    return { success: true, employeesdata:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

export const getSingleEmployees = async (id) => {
  try {
    const response = await axiosInstance.get(`/employees/${id}`);

    // console.log('data',response?.data)

    return { success: true, employeesdata:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

export const getEmployeesDetails = async (employeeID) => {
  try {
    const response = await axiosInstance.get(`/employees/details/${employeeID}`);

    

    return { success: true, user:response?.data };
  } catch (error) {
    return handleApiError(error); // yahan toast trigger hoga
  }
};

// ✅ Create employeesdata
export const createEmployees = async (data) => {
  try {
    const response = await axiosInstance.post("/employees", data);
    // showToast("employeesdata created successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Update employeesdata
export const updateEmployee = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/employees/${id}`, data);
    // showToast("employeesdata updated successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Delete employeesdata
export const deleteEmployees = async (id) => {
  try {
    const response = await axiosInstance.delete(`/employees/${id}`);
    // showToast("employeesdata deleted successfully!", "success");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
