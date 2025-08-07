// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import SidebarPage from '../components/SidebarPage'
// import Header from '../components/Header'

// const MainLayouts = ({children}) => {
// const location = useLocation()
//     const isLoggedIn =location.pathname==='/login'



//   return <>
//     <div className="flex min-h-screen">
//       { !isLoggedIn && <SidebarPage />}
//       <div className="flex flex-col flex-1">
//         { !isLoggedIn && <Header />}
//         <main className="p-4">{children}</main>
//       </div>
//     </div>
//   </>
// }

// export default MainLayouts
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from '../components/SidebarPage';
import Header from '../components/Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    // ✅ User is null → Redirect to /login
    if (!user) {
      navigate('/login');
    }

    // ✅ If logged-in user visits /login → Redirect to /dashboard
    if (isLoginPage && user) {
      navigate('/');
    }
  }, [user, isLoginPage, navigate]);

  console.log('user data',user)
  // ✅ Show Sidebar/Header only if user is logged in and not on login page
  const showLayout = user && user?.user?.role?.name ==='admin' && !isLoginPage;
  const showHeader = user &&  !isLoginPage;

  return (
    <div className="flex h-screen ">
      {showLayout && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {showHeader && <Header />}
        <main className="p-4 overflow-auto shadow-md rounded-md bg-white">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
