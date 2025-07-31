// src/components/SidebarPage.jsx
import { NavLink } from "react-router-dom";

const SidebarPage = () => {
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "book", path: "/book" },
  ];

  return (
    <aside className="w-64 bg-[#004B29] text-white pt-20 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-l-md mb-2 ${
              isActive ? "bg-white text-[#004B29] rounded font-bold border-l-4 border-orange-500" : "hover:bg-[#055B39]"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default SidebarPage;
