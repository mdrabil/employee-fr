// src/pages/LoginPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "../redux/authSlice";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import imglogo from '../assets/images/hakim-logo1.png'
const LoginPage = () => {
  // const [form, setForm] = useState({
  //   // name: "",
  //   email: "",
  //   password: "",
  //   // role: "customer",
  // });

  const [showPassword, setShowPassword] = useState(false);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // alert(email)

      const user = await loginUser(email, password);
      dispatch(loginSuccess(user));
         socket.connect();
         console.log('userid',user)
    socket.emit("user_connected", user?.user?._id);
      navigate('/dashboard')
    } catch (err) {
      dispatch(loginFail(err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex items-center justify-center  p-2 md:p-4">
      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-sm md:max-w-md" style={{
        border:'1px solid green inset'
      }}>
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-center text-orange-600 flex items-center justify-center gap-2 md:gap-4">
         {/* <span className="text-lg md:text-xl"><IoLockClosed/></span>  */}
         <span className="text-sm md:text-base lg:text-lg"><img src={imglogo} alt="" /></span> 
         {/* <span className="text-lg md:text-xl"><IoLockOpen/></span> */}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {/* <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div> */}

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              // value={form.email}
               onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                // value={form.password}
                // onChange={handleChange}
                 onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base pr-12"
                required
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

          {/* <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 "
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
        
            </select>
          </div> */}

          {/* <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
          >
            Login
          </button> */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 md:py-3 rounded transition-colors text-sm md:text-base"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-xs md:text-sm text-center mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
