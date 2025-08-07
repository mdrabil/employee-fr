// src/components/SidebarPage.jsx
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const SidebarPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Patient List", path: "/" },
    { label: "Treatments", path: "/treatments" },
    { label: "Medicines", path: "/medicines" },
  ];

  // Responsive media query detection
  const checkScreenSize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) setIsOpen(true); // Always open on desktop
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-[#004B29] text-white px-3 py-2 rounded-md md:hidden"
        >
          ☰ Menu
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#004B29] text-white pt-20 px-3 w-52 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)} // close on click (mobile)
            className={({ isActive }) =>
              `block px-4 py-2 rounded-l-md mb-2 ${
                isActive
                  ? "bg-white text-[#004B29] rounded font-bold border-l-4 border-orange-500"
                  : "hover:bg-[#055B39]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-30"
        ></div>
      )}
    </>
  );
};

export default SidebarPage;
