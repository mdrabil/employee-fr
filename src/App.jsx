import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import BookAppoitment from './pages/BookAppoitment'
import ListOfPaitent from './pages/ListOfPaitent'
import MainLayouts from './Layouts/MainLayouts'
import User_Details from './pages/User_Details'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainLayouts>

      <Routes>
        <Route path='/login' element={<LoginPage/>} ></Route>
        <Route path='/book' element={<BookAppoitment/>} ></Route>
        <Route path='/dashboard' element={<ListOfPaitent/>} ></Route>
        <Route path='/user_details/:UserId' element={<User_Details/>} ></Route>
      </Routes>
        </MainLayouts>
      </BrowserRouter>
    </div>
  )
}

export default App