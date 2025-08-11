// // src/components/SidebarPage.jsx
// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaChevronDown, FaChevronRight, FaTimes } from "react-icons/fa";

// const SidebarPage = ({ isOpen, setIsOpen }) => {
//   // const [isMobile, setIsMobile] = useState(false);

//   // const closeMobileMenu = () => {
//   //   if (isMobile) setIsOpen(false);
//   // };

//   useEffect(() => {
//     const mobile = window.innerWidth <= 640;
//     setIsMobile(mobile);
//     if (!mobile) setIsOpen(true);
//   }, [setIsOpen]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [openSubmenu, setOpenSubmenu] = useState(null);

//   const navItems = [
//     { label: "Profile", path: "/profile" },
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Patient List", path: "/" },
//     {
//       label: "Treatments",
//       path: "/treatments",
//       submenu: [
//         { label: "Add Treatment", path: "/treatments" },
//         { label: "View Treatments", path: "/treatments" },
//       ],
//     },
//     { label: "Medicines", path: "/medicines" },
//     { label: "User", path: "/users" },
//     { label: "Role", path: "/roles" },
//     { label: "Term & Conditions", path: "/terms_condition" },
//     { label: "Settings", path: "/dashboard" },
//   ];

//   const checkScreenSize = () => {
//     const mobile = window.innerWidth <= 768;
//     setIsMobile(mobile);

//     // Desktop par sidebar always open
//     if (!mobile) {
//       setIsOpen(true);
//     } else {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleSubmenu = (index) => {
//     setOpenSubmenu(openSubmenu === index ? null : index);
//   };

//   const closeMobileMenu = () => {
//     if (isMobile) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isMobile && isOpen && (
//         <div
//           onClick={closeMobileMenu}
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//         ></div>
//       )}

//       {/* Sidebar */}
//       {/* <aside
//         id="mobile-sidebar"
//         className={`${
//           isMobile
//             ? "fixed top-0 left-0  h-full w-64 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out"
//             : "relative w-64 flex-shrink-0 "
//         } ${
//           isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"
//         } bg-[#f0f9f4] shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#004B29]/50 scrollbar-track-transparent scrollbar-thumb-rounded-md`}
//         style={{
//           border: '3px solid #00000',
//           boxShadow: 'rgba(0, 0, 0, 0.31) 0px 5px 15px',
//           borderRadius: '5px',
//           height: isMobile ? '100vh' : 'fit-content',
//           position:'sticky',
//           top:"0"

//         }}
//       > */}
//       {/* <aside
//   id="mobile-sidebar"
//   className={`
//     ${isMobile
//       ? "fixed top-0 left-0 h-full w-64 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out"
//       : "sticky top-3 w-64 flex-shrink-0"}
//     ${isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}
//     bg-[#f0f9f4] shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#004B29]/50 scrollbar-track-transparent scrollbar-thumb-rounded-md
//   `}
//   style={{
//     border: '3px solid #00000',
//     boxShadow: 'rgba(0, 0, 0, 0.31) 0px 5px 15px',
//     borderRadius: '5px',
//     height: isMobile ? '100vh' : 'fit-content',
//   }}
// > */}

// <aside
//   id="mobile-sidebar"
//   className={`
//     ${isMobile
//       ? "fixed top-0 left-0 h-full w-64 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out"
//       : "sticky top-0 h-screen w-64 flex-shrink-0"}   // top-0 and h-screen added
//     ${isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}
//     bg-[#f0f9f4] shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#004B29]/50 scrollbar-track-transparent scrollbar-thumb-rounded-md
//   `}
//   style={{
//     border: "3px solid #00000",
//     boxShadow: "rgba(0, 0, 0, 0.31) 0px 5px 15px",
//     borderRadius: "5px",
//   }}
// >


//         {/* Mobile Close Button */}
//         {isMobile && (
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             <h2 className="text-lg font-bold text-[#004B29]">Menu</h2>
//             <button
//               onClick={closeMobileMenu}
//               className="p-2 hover:bg-gray-100 rounded-md"
//             >
//               <FaTimes className="text-gray-600" />
//             </button>
//           </div>
//         )}

//         {/* Navigation Items */}
//         <div className="p-4">
//           {navItems.map((item, index) => (
//             <div key={item.path || index} className="mb-2">
//               {/* Main menu item */}
//               <div
//                 className={`flex justify-between items-center px-3 py-2 cursor-pointer rounded-md transition-colors duration-200 ${
//                   openSubmenu === index || window.location.pathname === item.path
//                     ? "bg-white text-[#004B29] font-bold border-l-4 border-orange-500"
//                     : "hover:bg-[#055B39] hover:text-white text-black"
//                 }`}
//                 onClick={() => {
//                   if (item.submenu) {
//                     toggleSubmenu(index);
//                   } else {
//                     closeMobileMenu();
//                   }
//                 }}
//               >
//                 <NavLink
//                   to={item.path}
//                   className="flex-1 text-sm md:text-base"
//                   onClick={(e) => item.submenu && e.preventDefault()}
//                 >
//                   {item.label}
//                 </NavLink>
//                 {item.submenu && (
//                   <span className="text-xs">
//                     {openSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
//                   </span>
//                 )}
//               </div>

//               {/* Submenu items */}
//               {item.submenu && openSubmenu === index && (
//                 <div className="ml-4 border-l border-gray-300 mt-1">
//                   {item.submenu.map((sub) => (
//                     <NavLink
//                       key={sub.path}
//                       to={sub.path}
//                       onClick={closeMobileMenu}
//                       className={({ isActive }) =>
//                         `block px-3 py-2 mb-1 rounded-md transition-colors duration-200 text-sm ${
//                           isActive
//                             ? "bg-orange-100 text-[#004B29] font-semibold"
//                             : "hover:bg-orange-50 text-gray-700"
//                         }`
//                       }
//                     >
//                       {sub.label}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default SidebarPage;




import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaChevronDown, FaChevronRight, FaTimes, 
  FaUser, FaTachometerAlt, FaList, FaTooth, FaPills, 
  FaUsers, FaUserShield, FaFileContract, FaCog 
} from "react-icons/fa";

const SidebarPage = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const navItems = [
    { label: "Profile", path: "/profile", icon: <FaUser /> },
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Patient List", path: "/", icon: <FaList /> },
    {
      label: "Treatments",
      path: "/treatments",
      icon: <FaTooth />,
      submenu: [
        // { label: " Treatment", path: "/treatments" },
        { label: "View Treatments", path: "/treatments" },
      ],
    },
    { label: "Medicines", path: "/medicines", icon: <FaPills /> },
    { label: "User", path: "/users", icon: <FaUsers /> },
    { label: "Role", path: "/roles", icon: <FaUserShield /> },
    { label: "Term & Conditions", path: "/terms_condition", icon: <FaFileContract /> },
    { label: "Settings", path: "/dashboard", icon: <FaCog /> },
  ];

  const checkScreenSize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setIsOpen(!mobile);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}

      <aside
        id="mobile-sidebar"
        className={`
          ${isMobile
            ? "fixed top-0 left-0 h-full w-64 max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out"
            : "sticky top-0 h-screen w-64 flex-shrink-0"}
          ${isMobile && isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}
          bg-[#f0f9f4] shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#004B29]/50 scrollbar-track-transparent scrollbar-thumb-rounded-md
        `}
        style={{
          border: "3px solid #00000",
          boxShadow: "rgba(0, 0, 0, 0.31) 0px 5px 15px",
          borderRadius: "5px",
        }}
      >
        {isMobile && (
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#004B29]">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        )}

        <div className="p-4 mt-10">
          {navItems.map((item, index) => (
            <div key={item.path || index} className="mb-2">
              <div
                className={`flex justify-between items-center px-3 py-2 cursor-pointer rounded-md transition-colors duration-200 ${
                  openSubmenu === index || window.location.pathname === item.path
                    ? "bg-white text-[#004B29] font-bold border-l-4 border-orange-500"
                    : "hover:bg-[#055B39] hover:text-white text-black"
                }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(index);
                  } else {
                    closeMobileMenu();
                  }
                }}
              >
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 flex-1 text-sm md:text-base"
                  onClick={(e) => item.submenu && e.preventDefault()}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </NavLink>
                {item.submenu && (
                  <span className="text-xs">
                    {openSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
              </div>

              {item.submenu && openSubmenu === index && (
                <div className="ml-4 border-l border-gray-300 mt-1">
                  {item.submenu.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block px-3 py-2 mb-1 rounded-md transition-colors duration-200 text-sm ${
                          isActive
                            ? "bg-orange-100 text-[#004B29] font-semibold"
                            : "hover:bg-orange-50 text-gray-700"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarPage;
