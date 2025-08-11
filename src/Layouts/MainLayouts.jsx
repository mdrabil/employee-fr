import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from '../components/SidebarPage';
import Header from '../components/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const [isMobile, setIsMobile] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (isLoginPage && user) {
      navigate('/');
    }
  }, [user, isLoginPage, navigate]);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const showLayout = user && user?.user?.role?.name === 'admin' && !isLoginPage;
  const showHeader = user && !isLoginPage;
console.log('ismoboe',isMobile)
  return (
    <div className="flex flex-col md:flex-row  bg-[#f8fafc] overflow-x-hidden">
      {/* Mobile Menu Button */}
  

      {/* Sidebar */}
    {showLayout && (
<div >
    <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
</div>
)}

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 ">
    
        {/* Sticky Header */}
        {showHeader && (
          <header className="flex items-center  top-0 z-20 bg-white shadow-sm mx-2 md:mx-5 mt-2 md:mt-3 " style={{
            flexDirection:'row-reverse',
            paddingLeft:'20px'
          }}>
            <Header />         {showLayout && isMobile && (
        <div className="">
       
          <button
            // onClick={() => {
            //   const sidebar = document.getElementById('mobile-sidebar');
            //   if (sidebar) {
            //     sidebar.classList.toggle('open');
            //   }
            // }}
                onClick={() => setSidebarOpen(prev => !prev)}
            className="bg-[#004B29] text-white px-2 rounded-md shadow-lg"
          >
            ☰ 
          </button>
        </div>
      )}
          </header>
        )}

        {/* Main Content */}
        <main
          className="flex-1 p-2 md:p-4 lg:p-6 bg-white shadow-md rounded-md mx-2 md:mx-5 mb-2 md:mb-3 min-w-0 overflow-x-hidden"
          style={{
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <div className="w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
