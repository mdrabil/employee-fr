// src/pages/LoginPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "../redux/authSlice";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 p-2">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 flex items-center justify-center gap-4">
         <span><IoLockClosed/> </span> DR HAKIM KLINIC <span><IoLockOpen/></span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              // value={form.email}
               onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 "
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                // value={form.password}
                // onChange={handleChange}
                 onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 "
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-orange-500"
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
                <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
