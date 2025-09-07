
import { useEffect, useState } from "react";
import { getProjects } from "../api/ProjectsApi";
import Card from "../components/Card/Card";
import Project from "../components/Projectoverview/Project";
import Team from "../components/Team/Team";
import { getEmployees } from "../api/EmployeeApi";
import LoadingOverlay from "../components/overlayloading/LoadingOverlay";

const Dashboard = () => {
const [allProjects, setGetProjects] = useState([]);
const [teamMembers, setTeamMembers] = useState([]);
const [loading, setLoading] = useState(false);

const fetchAllData = async () => {
  try {
    setLoading(true);

    // 🔹 Fetch projects
    const result = await getProjects();
    if (result.success) {
      const projectsArray = Array.isArray(result.projectdata?.data)
        ? result.projectdata.data
        : [];
      console.log("Projects:", projectsArray);
      setGetProjects(projectsArray);
    } else {
      setGetProjects([]);
    }

    // 🔹 Fetch employees
    const employeesRes = await getEmployees();
    if (employeesRes.success) {
      const employeesArray = Array.isArray(employeesRes?.employeesdata?.data)
        ? employeesRes?.employeesdata?.data
        : [];
      console.log("Employees:", employeesArray);
      setTeamMembers(employeesArray);
    } else {
      setTeamMembers([]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setGetProjects([]);
    setTeamMembers([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAllData();
}, []);




  return (
    <div className="home-container">
      <div className="home-content">
      {loading && <LoadingOverlay />}
        <Card  allProjects={allProjects}/>
        <Project allProjects={allProjects}/>
        <Team allEmployee = {teamMembers}/>
      
      </div>
    </div>
  )
}

export default Dashboard




//     <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//        <div className=" border-(--border-main)">
//           <div className='flex items-center justify-between'>

// <div className='bg-(--sc-bg-color) w-15 h-15 flex items-center justify-center rounded-full'>
// <FaRegFileAlt className='text-(--main-color) text-3xl'/>
// </div>
// <div className='flex items-center gap-5'>
//   <h2>
//   <MdArrowOutward />
// </h2>
//    <span>+2</span>
// </div>
//           </div>
//         </div>
//         <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
//           <h2 className="text-lg font-bold">{totalTreatments}</h2>
//           <p className="text-sm">Total Treatments</p>
//         </div>
//         <div className="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
//           <h2 className="text-lg font-bold">{totalUsers}</h2>
//           <p className="text-sm">Total Users</p>
//         </div>
//       </div>