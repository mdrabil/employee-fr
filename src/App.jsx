import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import MainLayouts from "./Layouts/MainLayouts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store"; // ✅ import your store & persistor

// import LoadingOverlay from "./components/overlayloading/LoadingOverlay";

import Dashboard from "./pages/Dashboard";
import Departments from "./components/Department/Departments";
import Employees from "./components/Employees/Employees";
import Roles from "./components/Roles/Roles";
import AllProjects from "./components/Projectoverview/AllProjects";
import EmployeeDashboard from "./pages/EmployeeDashboard";
// import Attendances from "./components/Attendance/Attendance";
import ProtectedRoute from "./Layouts/ProtectedRoute";
import Attendence from "./pages/Attendence";
import AllEmployee from "./components/Employees/AllEmployees";
import ProjectList from "./components/Projectoverview/ProjectList";
import AllTasks from "./components/AllTasks/AllTasks";
import TodayAttendance from "./components/Attendance/TodayAttendance";
import ProjectDetails from "./components/Projectoverview/ProjectDetails";
import LeavePolicyPage from "./pages/LeavePolice";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainLayouts>
                 {/* <LoadingOverlay /> */}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
         
              <Route path="/" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                    <Dashboard />
  
    </ProtectedRoute>
                
                } />

                             
              {/* <Route path="/admin-dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/" element={
            
                    <Dashboard />
 

                
                } /> */}


              <Route path="/employee-dashboard/:employeeId" element={<EmployeeDashboard/>} />
              <Route path="/project-dashboard" element={<ProjectList />} />
              <Route path="/project-details/:id" element={<ProjectDetails />} />
              <Route path="/attendance" element={<Attendence/>} />
              <Route path="/attendance-employees" element={<TodayAttendance/>} />

              <Route path="/department" element={<Departments />} />
              <Route path="/leave-policy" element={<LeavePolicyPage />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/all-task" element={<AllTasks />} />
              <Route path="/employees" element={<AllEmployee/>} />


              
  
            </Routes>
          </MainLayouts>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
