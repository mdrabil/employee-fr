import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import socket from "../socket/socket";
import { useState, useEffect } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth?.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Close dropdown on outside click
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    socket.emit("user_disconnected");
    socket.disconnect();
    navigate("/login");
  };

  return (
    <header className="w-full overflow-visible">
      <div className="flex  sm:flex-row justify-between items-start sm:items-center gap-3 p-3 md:p-4 lg:p-5">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2 text-[#FDA600] flex-shrink-0">
          <span className="text-xl sm:text-2xl">🩺</span>
          <span className="hidden sm:inline">DR HAKIM</span>
          <span className="sm:hidden">DR HAKIM</span>
        </h1>

        {/* User Dropdown */}
        {user && (
          <div className="relative dropdown-container w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 bg-[#FFF5E6] hover:bg-[#FFEACC] rounded-full shadow-sm transition-all w-full sm:w-auto text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-[#FDA600] text-base md:text-lg flex-shrink-0" />
                <span className="font-medium text-gray-800 truncate">
                  {user?.name}
                </span>
              </div>
              <FaCaretDown className="text-gray-500 flex-shrink-0" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#FFF5E6] transition-colors"
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/settings");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#FFF5E6] transition-colors"
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
