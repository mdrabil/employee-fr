import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookAppoitment from "./pages/BookAppoitment";
import ListOfPaitent from "./pages/ListOfPaitent";
import MainLayouts from "./Layouts/MainLayouts";
import User_Details from "./pages/User_Details";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // ✅ import your store & persistor
import AllTreatmentsPage from "./pages/AllTritments";
import MedicineTable from "./pages/MedicineTable";
import AddMedicine from "./components/AddMedicine";
import LoadingOverlay from "./components/overlayloading/LdingOverlay;";
import Users from "./pages/Users";
import TermsCondition from "./pages/TermsCondition";
import RolePermissions from "./pages/Roles";
import UserProfile from "./pages/UsersProfile";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainLayouts>
                 <LoadingOverlay />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/book_appointment" element={<BookAppoitment />} />
              <Route path="/" element={<ListOfPaitent />} />
              <Route path="/user_details/:UserId" element={<User_Details />} />
              <Route path="/treatments" element={<AllTreatmentsPage />} />
           
<Route path="/treatments/:id" element={<AllTreatmentsPage />} />

              <Route path="/medicines" element={<MedicineTable/>} />
              <Route path="/add-medicines" element={<AddMedicine/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/terms_condition" element={<TermsCondition/>} />
              <Route path="/roles" element={<RolePermissions/>} />
              <Route path="/profile" element={<UserProfile/>} />
            </Routes>
          </MainLayouts>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
