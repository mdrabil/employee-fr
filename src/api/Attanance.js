
// import { handleApiError } from "./apiErrorHander";
// import axiosInstance from "./axisoInstance";

import { handleApiError } from "./apiErrorHander";
import axiosInstance from "./axisoInstance";

// // ✅ Get all attendance
// export const getAllAttendance = async () => {
//   try {
//     const response = await axiosInstance.get("/attendance");
//     console.log('data',response?.data)
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ Get attendance of a single employee
// export const getEmployeeAttendance = async (employeeId) => {
//   try {
//     const response = await axiosInstance.get(`/attendance/employee/${employeeId}`);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ Mark attendance (checkIn / checkOut)
// export const markAttendance = async (employeeId, type) => {
//   try {
//     const response = await axiosInstance.post("/attendance/mark", { employeeId, type });
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ Start break
// export const startBreak = async (employeeId) => {
//   try {
//     const response = await axiosInstance.post("/attendance/break/start", { employeeId });
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ End break
// export const endBreak = async (employeeId) => {
//   try {
//     const response = await axiosInstance.post("/attendance/break/end", { employeeId });
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ Undo last action
// export const undoLastAction = async (employeeId) => {
//   try {
//     const response = await axiosInstance.post("/attendance/undo", { employeeId });
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// // ✅ Admin manual update
// export const updateAttendance = async (id, updates) => {
//   try {
//     const response = await axiosInstance.put(`/attendance/${id}`, updates);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return handleApiError(error);
//   }
// };


// export const punchInUser = (empNo) => axiosInstance.post(`/attendance/${empNo}/punch-in`);
// export const punchOut = (empNo) => axiosInstance.post(`/attendance/${empNo}/punch-out`);
// export const startBreak = (empNo) => axiosInstance.post(`/attendance/${empNo}/break-start`);
// export const endBreak = (empNo) => axiosInstance.post(`/attendance/${empNo}/break-end`);
// export const getTodayAttendance = (empNo) => axiosInstance.get(`/attendance/${empNo}/today`);




// ✅ Punch In
export const punchInUser = async (empNo) => {
  try {
    const response = await axiosInstance.post(`/attendance/${empNo}/punch-in`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Punch Out
export const punchOut = async (empNo) => {
  try {
    const response = await axiosInstance.post(`/attendance/${empNo}/punch-out`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Start Break
export const startBreak = async (empNo) => {
  try {
    const response = await axiosInstance.post(`/attendance/${empNo}/break-start`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ End Break
export const endBreak = async (empNo) => {
  try {
    const response = await axiosInstance.post(`/attendance/${empNo}/break-end`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// ✅ Get Today's Attendance
export const getTodayAttendance= async (empNo) => {
  try {
    const response = await axiosInstance.get(`/attendance/${empNo}/today`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};


export const getAllEmployeesAttendanceToday = async () => {
  try {
    const response = await axiosInstance.get(`/attendance`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};


export const getOverallAttendance = async () => {
  try {
    const response = await axiosInstance.get(`/attendance/overall`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};


export const getEmployeeOverallAttendance = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/attendance/employee/${employeeId}/overall`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
