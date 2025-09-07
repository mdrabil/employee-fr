import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// ✅ Add Task (for today)
export const addTask = async (taskBody) => {
  try {
    const response = await axiosInstance.post(`/dailytasks`, taskBody);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Get My Tasks
export const getMyTasks = async () => {
  try {
    const response = await axiosInstance.get(`/dailytasks/my`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Get Task By Id
export const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(`/dailytasks/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Update Task Status
export const updateTaskStatus = async (dailyTaskId, taskId, body) => {
  try {
    const response = await axiosInstance.patch(
      `/dailytasks/${dailyTaskId}/tasks/${taskId}/status`,
      body
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// services/taskService.js
export const updateTaskStatusApi = async (dailyTaskId, taskId, body) => {
  try {
    const response = await axiosInstance.patch(
      `/dailytasks/${dailyTaskId}/tasks/${taskId}/status`,
      body
    );
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};


// ✅ Get Summary
export const getSummary = async (id) => {
  try {
    const response = await axiosInstance.get(`/dailytasks/summary/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Admin - Get All Tasks
export const getAllTasksAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/dailytasks`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Admin - Get Today Tasks
export const getTodayTasksAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/dailytasks/today`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Admin - Delete Daily Task
export const deleteDailyTaskAdmin = async (id) => {
  try {
    const response = await axiosInstance.delete(`/dailytasks/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
