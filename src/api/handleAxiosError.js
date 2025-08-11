export const handleAxiosError = (error) => {
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