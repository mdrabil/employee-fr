// src/pages/LoginPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { showToast } from "../utils/toastHelper";
import { loginSuccess } from "../redux/authSlice";

const LoginPage = () => {


  const [showPassword, setShowPassword] = useState(false);
const [loading,setloading] =useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    showToast("Email is required!", "warning");
    return;
  }
  if (!password.trim()) {
    showToast("Password is required!", "warning");
    return;
  }

  setloading(true);

  try {
    const user = await loginUser(email, password);

    if (user?.success) {
      console.log("login ke bad kya aya", user?.user?.employeeId);

   dispatch(
  loginSuccess({
    user: user.user,
    token: user.token,
  })
);

const role = user?.user?.role;
if (role === "admin") {
  navigate("/");
} else {
  navigate(`/employee-dashboard/${user?.user?.employeeId}`);
}



      socket.connect();
      socket.emit("user_connected", user?.user?._id);

      showToast("User Logged In", "success");
    } else {
      showToast(user?.message, "error");
    }
  } catch (err) {
    showToast("Login failed", "error");
  } finally {
    setloading(false);
  }
};




  return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-50 ">
  <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-sm md:max-w-md border border-[var(--main-color)] ">
    <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-center text-orange-600 flex items-center justify-center gap-2 md:gap-4">
      <span className="text-sm md:text-base lg:text-lg">
        <img
          src="https://arawebtechnologies.com/assets/images/araweb-logo.png"
          alt="logo"
          className="max-h-10"
        />
      </span>
    </h2>

    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div>
        <label className="block text-sm md:text-base font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm md:text-base outline-none"
        />
      </div>

      <div>
        <label className="block text-sm md:text-base font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm md:text-base outline-none"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs md:text-sm text-orange-500 hover:text-orange-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

<button
  type="submit"
  disabled={loading}
  className="w-full bg-(--main-color) hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 md:py-3 rounded transition-colors text-sm md:text-base"
>
  {loading ? "Loading..." : "Login"}
</button>


    </form>
  </div>
</div>

  );
};

export default LoginPage;
