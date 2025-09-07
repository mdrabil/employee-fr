
// import React, { Component, useState, useEffect, useRef } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import './Sidebar.css'

// Sidebar Component
// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const userDropdownRef = useRef(null);
//   const [dropdowns, setDropdowns] = useState({
//     dashboard: false,      // Dashboard dropdown open or closed
//     projects: false,       // Projects dropdown open or closed
//     tickets: false,        // Tickets dropdown open or closed
//     clients: false,        // Clients dropdown open or closed
//     employees: false,      // Employees dropdown open or closed
//     accounts: false,       // Accounts dropdown open or closed
//     payroll: false,        // Payroll dropdown open or closed
//     app: false,            // App dropdown open or closed
//     otherPages: false      // Other pages dropdown open or closed
//   });

//   const location = useLocation(); // Current page path tracker

//   // Close dropdown 
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setShowUserDropdown(false);
//       }
//     };

//     if (showUserDropdown) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showUserDropdown]);

//   const navigationMenu = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: 'ri-dashboard-line',
//       items: [
//         { path: '/admin-dashboard', label: 'Admin Dashboard' },
//         { path: '/hr-dashboard', label: 'HR Dashboard' },
//         { path: '/project-dashboard', label: 'Project Dashboard' }
//       ]
//     },
//     {
//       id: 'projects',
//       label: 'Projects',
//       icon: 'ri-article-line',
//       items: [
//         { path: '/projects', label: 'Projects' },
//         { path: '/tasks', label: 'Tasks' },
//         { path: '/timesheet', label: 'Timesheet' },
//         { path: '/leaders', label: 'Leaders' }
//       ]
//     },
//     {
//       id: 'tickets',
//       label: 'Tickets',
//       icon: 'ri-ticket-2-line',
//       items: [
//         { path: '/tickets-view', label: 'Tickets View' },
//         { path: '/ticket-detail', label: 'Ticket Detail' }
//       ]
//     },
//     {
//       id: 'clients',
//       label: 'Our Clients',
//       icon: 'ri-user-3-line',
//       items: [
//         { path: '/clients', label: 'Clients' },
//         { path: '/client-profile', label: 'Client Profile' }
//       ]
//     },
//     {
//       id: 'employees',
//       label: 'Employees',
//       icon: 'ri-team-line',
//       items: [
//         { path: '/members', label: 'Members' },
//         { path: '/members-profile', label: 'Members Profile' },
//         { path: '/holidays', label: 'Holidays' },
//         { path: '/attendance-employees', label: 'Attendance Employees' },
//         { path: '/attendance', label: 'Attendance' },
//         { path: '/leave-request', label: 'Leave Request' },
//         { path: '/department', label: 'Department' },
//         { path: '/loan', label: 'Loan' }
//       ]
//     },
//     {
//       id: 'accounts',
//       label: 'Accounts',
//       icon: 'ri-money-dollar-circle-line',
//       items: [
//         { path: '/invoice', label: 'Invoice' },
//         { path: '/payments', label: 'Payments' }
//       ]
//     },
//     {
//       id: 'payroll',
//       label: 'Payroll',
//       icon: 'ri-wallet-3-line',
//       items: [
//         { path: '/employee-salary', label: 'Employee Salary' }
//       ]
//     },
//     {
//       id: 'app',
//       label: 'App',
//       icon: 'ri-apps-2-line',
//       items: [
//         { path: '/calendar', label: 'Calendar' },
//         { path: '/chat-app', label: 'Chat App' }
//       ]
//     },
//     {
//       id: 'otherPages',
//       label: 'Other Pages',
//       icon: 'ri-pages-line',
//       items: [
//         { path: '/contacts', label: 'Contacts' },
//         { path: '/notifications', label: 'Notifications' },
//         { path: '/messages', label: 'Messages' },
//         { path: '/settings', label: 'Settings' },
//         { path: '/profile', label: 'Profile' },
//         { path: '/help', label: 'Help & Support' }
//       ]
//     }
//   ];
//   const latestProjects = [
//     { id: 'figma-design', name: 'Deorags', status: 'Progress', color: 'orange' },
//     { id: 'keep-react', name: 'Deorags', status: 'Planning', color: 'blue' },
//     { id: 'staticmania', name: 'Deorags', status: 'Completed', color: 'green' }
//   ];
//   const latestMessages = [
//     { id: 'alex-morgan', name: 'Om Goyal', time: '2m', preview: 'Hey, can we review...', isRecent: true },
//     { id: 'jessica-chen', name: 'Md.Rabil', time: '1h', preview: 'The project the case of...', isRecent: false },
//     { id: 'ryan-park', name: 'Khusnuma', time: '3h', preview: 'I have a question...', isRecent: false },
//     { id: 'ryan-park-2', name: 'Asha Pal', time: '3h', preview: 'I have a question...', isRecent: false }
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleUserDropdown = () => {
//     setShowUserDropdown(!showUserDropdown);
//   };

//   const handleUserAction = (action) => {
//     setShowUserDropdown(false);
//     // Handle different user actions
//     switch(action) {
//       case 'profile':
//         // Navigate to profile page
//         console.log('Navigate to profile');
//         break;
//       case 'settings':
//         // Navigate to settings page
//         console.log('Navigate to settings');
//         break;
//       case 'logout':
//         // Handle logout
//         console.log('Logout user');
//         break;
//       default:
//         break;
//     }
//   };

//   const toggleDropdown = (dropdownName) => {
//     setDropdowns(prev => ({
//       ...prev,
//       [dropdownName]: !prev[dropdownName]
//     }));
//   };
// //  active links
//   const isActiveRoute = (path) => {
//     return location.pathname === path;
//   };

//   const renderNavigationMenu = () => (
//     <ul className='home-links'>
//       {navigationMenu.map((menuItem) => (
//         <li key={menuItem.id} className="dropdown-item">
//           <div 
//             className="dropdown-header" 
//             onClick={() => toggleDropdown(menuItem.id)}
//             style={{ cursor: 'pointer', userSelect: 'none' }}
//           >
//             <div style={{display: 'flex', alignItems: 'center'}}>
//               <i className={menuItem.icon}></i>
//               <span>{menuItem.label}</span>
//             </div>
//             <i className={`ri-arrow-${dropdowns[menuItem.id] ? 'up' : 'down'}-s-line dropdown-arrow`}></i>
//           </div>
//           <ul className="dropdown-menu" style={{ display: dropdowns[menuItem.id] ? 'block' : 'none' }}>
//             {menuItem.items.map((item) => (
//               <li key={item.path}>
//                 <Link 
//                   to={item.path} 
//                   className={isActiveRoute(item.path) ? "active" : ""}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </ul>
//   );
//   const renderLatestProjects = () => (
//     <div className="sidebar-section">
//       <h6 className="sidebar-heading">LATEST PROJECTS</h6>
//       <ul className="project-list">
//         {latestProjects.map((project) => (
//           <li key={project.id}>
//             <Link to={`/projects/${project.id}`}>
//               <div className="project-item">
//                 <div className="project-left">
//                   <span className={`project-dot ${project.color}`}></span>
//                   <span className="project-name" style={{whiteSpace:"nowrap"}}>{project.name}</span>
//                 </div>
//                 <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Link to="/projects" className="see-all-link">See all project</Link>
//     </div>
//   );

//   const renderLatestMessages = () => (
//     <div className="sidebar-section">
//       <h6 className="sidebar-heading">LATEST MESSAGE</h6>
//       <ul className="message-list">
//         {latestMessages.map((message) => (
//           <li key={message.id}>
//             <Link to={`/messages/${message.id}`}>
//               <div className="message-info">
//                 <div className="message-header">
//                   <b>{message.name}</b>
//                   <span className={`message-time ${message.isRecent ? 'recent' : ''}`}>{message.time}</span>
//                 </div>
//                 <div className="message-preview">{message.preview}</div>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Link to="/messages" className="see-all-link">See all message</Link>
//     </div>
//   );
//   return (
//     <>  
//       <div className="">
//         <div className="header-left">
//           <button className="mobile-toggle" onClick={toggleSidebar}>
//             <i className="ri-menu-line"></i>
//           </button>
//           <img 

//             src="https://arawebtechnologies.com/assets/images/araweb-logo.png" 
//             alt="Logo" 
//             className="header-logo w-12" 
//           />
//         </div>
//         <div className="header-right">
//           <span className="icon"><i className="ri-search-line"></i></span>
//           <span className="icon"><i className="ri-notification-3-line"></i></span>
//           <button className="btn-project">+ New Project</button>
//           <span className="icon add-task-mobile"><i className="ri-add-line"></i></span>
//           <div className="user-profile-container" ref={userDropdownRef}>
//             <img 
//               src="https://arawebtechnologies.com/assets/images/u1.png" 
//               alt="User" 
//               className="avatar" 
//               onClick={toggleUserDropdown}
//             />
//             {showUserDropdown && (
//               <div className="user-dropdown">
//                 <div className="user-dropdown-item" onClick={() => handleUserAction('profile')}>
//                   <i className="ri-user-line"></i>
//                   <span>My Profile</span>
//                 </div>
//                 <div className="user-dropdown-item" onClick={() => handleUserAction('settings')}>
//                   <i className="ri-settings-line"></i>
//                   <span>Settings</span>
//                 </div>
//                 <div className="user-dropdown-item logout" onClick={() => handleUserAction('logout')}>
//                   <i className="ri-logout-box-line"></i>
//                   <span>Logout</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//         {renderNavigationMenu()}
//         {renderLatestProjects()}
//         {renderLatestMessages()}
//       </div>
//     </>
//   )
// }
// export default Sidebar 




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiArticleLine,
  RiTicket2Line,
  RiUser3Line,
  RiTeamLine,
  RiMoneyDollarCircleLine,
  RiWallet3Line,
  RiApps2Line,
  RiPagesLine,
} from "react-icons/ri";
import { FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const dummyTabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <RiDashboardLine />,
      items: [
        { path: "/", label: "Admin Dashboard" },
        { path: "/employees", label: "Employee Dashboard" },
        { path: "/project-dashboard", label: "Project Dashboard" },
        { path: "/all-task", label: "Tasks" },
      ],
    },
    {
      id: "Department",
      label: "Department",
      icon: <RiArticleLine />,
      items: [
        { path: "/department", label: "Department" },
        // { path: "/tasks", label: "Tasks" },
        // { path: "/timesheet", label: "Timesheet" },
        // { path: "/leaders", label: "Leaders" },
      ],
    },
        {
      id: "Role",
      label: "Roles",
      icon: <RiArticleLine />,
      items: [
        { path: "/roles", label: "roles" },
        // { path: "/tasks", label: "Tasks" },
        // { path: "/timesheet", label: "Timesheet" },
        // { path: "/leaders", label: "Leaders" },
      ],
    },
    //     {
    //   id: "projects",
    //   label: "Projects",
    //   icon: <RiArticleLine />,
    //   items: [
    //     { path: "/projects", label: "Projects" },
    //     { path: "/tasks", label: "Tasks" },
    //     { path: "/timesheet", label: "Timesheet" },
    //     { path: "/leaders", label: "Leaders" },
    //   ],
    // },
    // {
    //   id: "tickets",
    //   label: "Tickets",
    //   icon: <RiTicket2Line />,
    //   items: [
    //     { path: "/tickets-view", label: "Tickets View" },
    //     { path: "/ticket-detail", label: "Ticket Detail" },
    //   ],
    // },
    // {
    //   id: "clients",
    //   label: "Our Clients",
    //   icon: <RiUser3Line />,
    //   items: [
    //     { path: "/clients", label: "Clients" },
    //     { path: "/client-profile", label: "Client Profile" },
    //   ],
    // },
    {
      id: "employees",
      label: "Employees",
      icon: <RiTeamLine />,
      items: [
        { path: "/employees", label: "Members" },
        { path: "/members-profile", label: "Members Profile" },
        { path: "/holidays", label: "Holidays" },
        { path: "/attendance-employees", label: "Attendance Employees" },
        { path: "/attendance", label: "Attendance" },
        { path: "/leave-request", label: "Leave Request" },
        { path: "/department", label: "Department" },
        { path: "/loan", label: "Loan" },
      ],
    },
    // {
    //   id: "accounts",
    //   label: "Accounts",
    //   icon: <RiMoneyDollarCircleLine />,
    //   items: [
    //     { path: "/invoice", label: "Invoice" },
    //     { path: "/payments", label: "Payments" },
    //   ],
    // },
    // {
    //   id: "payroll",
    //   label: "Payroll",
    //   icon: <RiWallet3Line />,
    //   items: [{ path: "/employee-salary", label: "Employee Salary" }],
    // },
    // {
    //   id: "app",
    //   label: "App",
    //   icon: <RiApps2Line />,
    //   items: [
    //     { path: "/calendar", label: "Calendar" },
    //     { path: "/chat-app", label: "Chat App" },
    //   ],
    // },
    // {
    //   id: "otherPages",
    //   label: "Other Pages",
    //   icon: <RiPagesLine />,
    //   items: [
    //     { path: "/contacts", label: "Contacts" },
    //     { path: "/notifications", label: "Notifications" },
    //     { path: "/messages", label: "Messages" },
    //     { path: "/settings", label: "Settings" },
    //     { path: "/profile", label: "Profile" },
    //     { path: "/help", label: "Help & Support" },
    //   ],
    // },
  ];

  const checkScreenSize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) setIsOpen(true);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSubmenu = (index) =>
    setOpenSubmenu(openSubmenu === index ? null : index);
  const closeMobileMenu = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0  w-60  z-40 md:hidden"
        ></div>
      )}

  <div style={{
    position:isMobile ? '':'fixed',
    left:'0',
    top:'0'
  }}
  // {`${
  //         isMobile
  //           ? "f"
  //           : "fixed top-10 h-screen w-64  flex-shrink-0 main-container-sidebar bg-white"
  //       }`}
        >
        <aside
        className={`${
          isMobile
            ? "fixed top-0 left-0 h-full w-64 max-w-[64vw] z-50 transform transition-transform duration-300 ease-in-out bg-white"
            : "fixed top-10 h-screen w-64  flex-shrink-0 main-container-sidebar bg-white"
        } ${
          isMobile && isOpen
            ? "translate-x-0"
            : isMobile
            ? "-translate-x-full"
            : "translate-x-0"
        } shadow-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-[#004B29]/50 scrollbar-track-transparent scrollbar-thumb-rounded-md`}
        // style={{
        //   boxShadow: "rgba(0, 0, 0, 0.31) 0px 5px 15px",
        //   borderRadius: "5px",
        //   backgroundColor: "rgb(213 231 236 / var(--tw-bg-opacity, 1))",
        //   scrollbarWidth: "none",
        // }}
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

        <div className="p-4 mt-5">
      {dummyTabs.map((item, index) => (
  <div key={index} className="mb-3">
    <div
      className={`flex justify-between items-center px-2 py-2  cursor-pointer rounded-md transition-colors duration-200 ${
        openSubmenu === index
          ? "bg-white text-[var(--main-color)]  font-semibold border-l-4 border-orange-500"
          : "hover:bg-[var(--main-color)] hover:text-white text-gray-800"
      }`}
      onClick={() => toggleSubmenu(index)}
    >
      {/* Left icon + label */}
      <div className="flex items-center gap-2 flex-1 text-xs md:text-sm">
        <span className="text-[14px]">{item.icon}</span> {/* Smaller icon */}
        <span className="truncate">{item.label}</span>
      </div>

      {/* Dropdown arrow */}
      {item.items && item.items.length > 0 && (
        <span className="text-[10px] ml-1">
          {openSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
        </span>
      )}
    </div>

    {/* Submenu */}
    {item.items && openSubmenu === index && (
      <div className="ml-3 mt-1">
        {item.items.map((sub, subIndex) => (
          <NavLink
            key={subIndex}
            to={sub.path}
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-3 py-1.5 mb-1 rounded-md transition-colors duration-200 text-xs ${
                isActive
                  ? "bg-[var(--second-color)]  text-[#004B29] font-medium"
                  : "hover:bg-[var(--second-color)] text-gray-700"
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
  </div>
    </>
  );
};

export default Sidebar;
