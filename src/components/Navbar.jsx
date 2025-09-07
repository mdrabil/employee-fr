// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiSearch,
//   FiBell,
//   FiPlus,
//   FiUser,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const getName = localStorage.getItem("adminName");

//   const handleProfileNavigate = () => {
//     navigate("/profile");
//     setIsDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (e.target.closest(".user-dropdown-container")) return;
//     setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
//       <div className="flex justify-between items-center px-4 md:px-12 py-2">
//         {/* Left: Logo */}
//         <div>
//           <img
//             className="w-28 md:w-32"
//             src="https://arawebtechnologies.com/assets/images/araweb-logo.png"
//             alt="Logo"
//           />
//         </div>

//         {/* Right: Menu */}
//         <div className="flex items-center gap-4 text-gray-600">
//           {/* Search Icon */}
//           <button className="hover:text-gray-900">
//             <FiSearch size={20} />
//           </button>

//           {/* Notification Icon */}
//           <button className="relative hover:text-gray-900">
//             <FiBell size={20} />
//             <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//           </button>

//           {/* Desktop New Project Button */}
//           <button className="hidden sm:block bg-[#DC3545] hover:bg-[#b02a37] text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition">
//             + New Project
//           </button>

//           {/* Mobile Add Button */}
//           <button className="sm:hidden hover:text-gray-900">
//             <FiPlus size={22} />
//           </button>

//           {/* User Profile */}
//           <div className="relative user-dropdown-container">
//             <img
//               src="https://arawebtechnologies.com/assets/images/u1.png"
//               alt="User"
//               className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
//               onClick={toggleDropdown}
//             />

//             {/* Dropdown */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
//                 <ul className="py-1 text-sm">
//                   <li
//                     onClick={handleProfileNavigate}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                   >
//                     <FiUser size={16} />
//                     <span>My Profile</span>
//                   </li>
//                   <li
//                     onClick={() => navigate("/settings")}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                   >
//                     <FiSettings size={16} />
//                     <span>Settings</span>
//                   </li>
//                   <li
//                     onClick={() => {
//                       localStorage.clear();
//                       navigate("/login");
//                     }}
//                     className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
//                   >
//                     <FiLogOut size={16} />
//                     <span>Logout</span>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import ProjectPopup from "./Projectoverview/ProjectPopup";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { persistor } from "../redux/store";

const Navbar = ({ setSidebarOpen, isMobile }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleProfileNavigate = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(".user-dropdown-container")) return;
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout());           // redux state clear
    persistor.purge();            // persisted storage clear
    navigate("/login");           // redirect to login
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50" style={{
    maxWidth:'1600px',
    margin:'auto'
  }}>
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle Button */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="text-gray-700 hover:text-gray-900 text-2xl"
            >
              ☰
            </button>
          )}

          <img onClick={()=>navigate('/')}
            className="w-20 md:w-32"
            src="https://arawebtechnologies.com/assets/images/araweb-logo.png"
            alt="Logo"
          />
        </div>

        {/* Right: Menu */}
        <div className="flex items-center gap-5 text-gray-600">
          {/* Search Icon */}
          <button className="hover:text-gray-900">
            <FiSearch size={20} />
          </button>

          {/* Notification Icon */}
          <button className="relative hover:text-gray-900">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Desktop New Project Button */}
          <button className="project-btn" onClick={()=>setPopupOpen(true)}>
            + New Project
          </button>

          {/* User Profile */}
          <div className="relative user-dropdown-container">
            <img
              src="https://arawebtechnologies.com/assets/images/u1.png"
              alt="User"
              className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
              onClick={toggleDropdown}
            />

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul className="py-1 text-sm">
                  <li
                    onClick={handleProfileNavigate}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <FiUser size={16} />
                    <span>My Profile</span>
                  </li>
                  <li
                    onClick={() => navigate("/settings")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  >
                    <FiSettings size={16} />
                    <span>Settings</span>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

          {popupOpen && (
            <ProjectPopup
              isEdit={!!editData}
              data={editData}
              close={()=>setPopupOpen(fasle)}
              
            />
          )}
      </div>
    </header>

    
  );
};

export default Navbar;

