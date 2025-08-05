// src/components/Header.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-[#B5B1B1] text-white px-6 py-4 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo/Title */}
        <h1 className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
          🩺 <span>DR HAKIM</span>
        </h1>

        {/* User Info & Logout */}
        {user && (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-right leading-tight">
              <div className="text-lg font-semibold">👤 {user?.name}</div>
              <div className="text-sm text-white/90 font-medium">🔑 {user?.role?.name}</div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-[#FDA600] font-semibold px-4 py-1.5 rounded-full hover:bg-orange-200 transition-all text-sm shadow"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
