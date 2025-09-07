import axiosInstance from "./axisoInstance";


// 🔹 Login function
export const loginUser = async (email, password) => {

 
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    console.log(response)
    // Agar login successful ho to token store kar lo
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);

    return { success: true, user, token };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: error?.response?.data?.message || "Login failed!" };
  }
};


export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};
