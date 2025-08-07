import { toast } from "react-toastify";
import axiosInstance from "./axisoInstance";


// const handleSaveTreatment = async () => {
//   try {
//     const payload = {
//       patientId: patient._id,
//       patientmedicine: patientmedicine,
//     };

//     const response = await axios.post("/api/treatments", payload); // Change path as needed

//     console.log("Saved successfully", response.data);
//     toast.success("Treatment saved successfully!");
//   } catch (error) {
//     console.error("Error saving treatment:", error);
//     toast.error("Something went wrong");
//   }
// };


export const createTreatment = async (patientData) => {
  try {
    const response = await axiosInstance.post("/treatments", patientData);
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


export const GetAllPatientTreatment = async () => {
  try {
     const response = await axiosInstance.get("/treatments");

    // Sort by createdAt (latest first)
    const sortedData = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    return sortedData;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const GetSinglePatientTreatment = async (id) => {
  console.log(id)
  try {
     const response = await axiosInstance.get(`/treatments/${id}`);

    // Sort by createdAt (latest first)
    const sortedData = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    return sortedData;
  } catch (error) {
    handleAxiosError(error);
  }
};



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