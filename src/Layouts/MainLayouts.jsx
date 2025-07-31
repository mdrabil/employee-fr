import React from 'react'
import { useLocation } from 'react-router-dom'
import SidebarPage from '../components/SidebarPage'
import Header from '../components/Header'

const MainLayouts = ({children}) => {
const location = useLocation()
    const isLoggedIn =location.pathname==='/login'



  return <>
    <div className="flex min-h-screen">
      { !isLoggedIn && <SidebarPage />}
      <div className="flex flex-col flex-1">
        { !isLoggedIn && <Header />}
        <main className="p-4">{children}</main>
      </div>
    </div>
  </>
}

export default MainLayouts