import React, { useEffect, useState } from 'react'
import { FaLessThanEqual, FaPlus } from "react-icons/fa";
import { FaUserAlt, FaUserCheck, FaUserTimes, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../../api/EmployeeApi';
import { usePaginate } from '../Pagination/usePagination';
// import { usePaginate } from '../Pagination/usePagination';

import { TiGroup } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi2";
import Pagination from '../Pagination/Pagination';
import LoadingOverlay from '../overlayloading/LoadingOverlay';
import EmployeePopup from './EmployeePopup';

const employees = [
  { name: "Anthony Lewis", role: "Software Developer", projects: 20, done: 13, progress: 7, productivity: 10, color: "purple",isActive: true },
  { name: "Brian Villalobos", role: "Developer", projects: 30, done: 10, progress: 20, productivity: 30, color: "yellow",isActive: true },
  { name: "Harvey Smith", role: "Full Stack Developer", projects: 25, done: 7, progress: 18, productivity: 20, color: "red",isActive: false },
  { name: "Stephan Peralt", role: "Software Developer", projects: 15, done: 13, progress: 2, productivity: 90, color: "green",isActive: false },
    { name: "Anthony Lewis", role: "Tester", projects: 20, done: 13, progress: 7, productivity: 10, color: "purple",isActive: true },
  { name: "Brian Villalobos", role: "Developer", projects: 30, done: 10, progress: 20, productivity: 30, color: "yellow",isActive: true },
  { name: "Harvey Smith", role: "Full Stack Developer", projects: 25, done: 7, progress: 18, productivity: 20, color: "red",isActive: false },
  { name: "Stephan Peralt", role: "Software Developer", projects: 15, done: 13, progress: 2, productivity: 90, color: "green",isActive: false },
    { name: "Anthony Lewis", role: "Tester", projects: 20, done: 13, progress: 7, productivity: 10, color: "purple",isActive: true },
  { name: "Brian Villalobos", role: "Developer", projects: 30, done: 10, progress: 20, productivity: 30, color: "yellow",isActive: true },
  { name: "Harvey Smith", role: "Full Stack Developer", projects: 25, done: 7, progress: 18, productivity: 20, color: "red",isActive: false },
  { name: "Stephan Peralt", role: "Software Developer", projects: 15, done: 13, progress: 2, productivity: 90, color: "green",isActive: false },
];




const AllEmployee = () => {


          const [loading, setLoading] = useState(false);
  const [filteredEmployees, setfilteredEmployees] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [allemployees, setEmployees] = useState([]);
const navigate = useNavigate()

  const fetchemployees = async () => {
    try {
      setLoading(true);
      const result = await getEmployees();
      if (result.success) {
        const deptArray = Array.isArray(result.employeesdata?.data) ? result?.employeesdata?.data : [];
        // console.log('emdopy ',deptArray)
        setEmployees(deptArray);
      } else {
        setEmployees([]);
       
      }
    } catch (error) {
      setEmployees([]);
   
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchemployees();
  }, []);



   useEffect(() => {
    let filtered = allemployees;
   
    if (search) {
      filtered = filtered.filter(
        (dept) =>
          dept.name.toLowerCase().includes(search.toLowerCase()) ||
          dept.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setfilteredEmployees(filtered);
  }, [allemployees, search]);


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredEmployees, 10);



       const activeEmp = paginatedData?.filter(t => t.status).length;
      const InactiveEmp = paginatedData?.filter(t => !t.status).length;
     const now = new Date();

// Current month and year
const currentMonth = now.getMonth();  // 0 = January
const currentYear = now.getFullYear();

// Count new joiners in this month
const newJoiner = paginatedData?.filter(emp => {
  if (!emp.joiningDate) return false; // skip if missing
  const joinDate = new Date(emp.joiningDate);
  return (
    joinDate.getMonth() === currentMonth &&
    joinDate.getFullYear() === currentYear
  );
}).length;
const totalProject = 20


    //   // Deadline highlight
    //   const today = new Date();
    //   const deadlineDate = new Date(proj.deadline);
    //   const isDeadlineNear = (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 3; // 3 days or less
  const stats = [
  { 
    title: "Total Employee", 
    value: allemployees?.length, 
    change: "+10.01%", 
    icon: <HiUserGroup/>, 
    color: "bg-[#212529]", 
    changeColor: "text-[#AB47BC]", 
    changeBg: "bg-[#F0DEF3]" 
  },
  { 
    title: "Active", 
    value: activeEmp, 
    change: "+10.01%", 
   icon: <TiGroup/>, 
    color: "bg-green-500", 
    changeColor: "text-[#F26522]", 
    changeBg: "bg-[#F265221A]" 
  },
  { 
    title: "Inactive", 
    value: InactiveEmp, 
    change: "+10.01%", 
    icon: <TiGroup/>, 
    color: "bg-red-500", 
    changeColor: "text-[#212529]", 
    changeBg: "bg-[#2125291A]" 
  },
  { 
    title: "New Joiners", 
    value: newJoiner, 
    change: "+10.01%", 
 icon: <TiGroup/>, 
    color: "bg-blue-500", 
    changeColor: "text-[#3B7080]", 
    changeBg: "bg-[#3B70801A]" 
  },
];
const handleClose = ()=>{
  setPopupOpen(false)
  fetchemployees()
}

  return (
    <div className=' bg-[#F9FAFB] Employee'>
      {loading && <LoadingOverlay />}

        <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div className="w-full sm:w-auto">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">
      Employee Dashboard
    </h2>
    <span className="text-sm text-gray-500 sm:ps-5">
      / Employee / <span className="text-gray-800">Employee Grid</span>
    </span>
  </div>

<div className="flex sm:flex-nowrap items-center gap-2 sm:gap-3 w-50 sm:w-auto">
  <button     onClick={() => {
          setEditData(null);
          setPopupOpen(true);
        }} className="flex items-center gap-2 px-3 py-2 border border-gray-300 RedButt  rounded-md w-full sm:w-auto">
    <FaPlus /> Add Employee
  </button>
</div>

</header>
{/* page start */}

    <div className="p-6 space-y-6">

        
      {/* Top Stats */}

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((item, i) => (
    <div
      key={i}
      className="flex justify-between shadow-[#C6C6C633] shadow-sm items-center gap-3 p-4 rounded-md border-[#E5E7EB] border-[0.8px] bg-[#FFFFFF]"
    >
      {/* Icon circle */}
     <div className='flex gap-3 py-[2px]'>
         <div className={`w-[45px] h-[45px] flex items-center justify-center rounded-full ${item.color}`}>
        {/* <img src={`${item.icon}`} className="text-white text-xl"/> */}
<span className='text-2xl text-white'>
        {item?.icon}

    </span>      </div>

      {/* Text section */}
    <div className="flex items-center justify-between">
  <div>
    <p className="text-sm text-gray-500 lg:whitespace-nowrap" style={{fontWeight:"500"}} >{item.title}</p>
    <h2 className="text-xl font-bold text-[#202C4B]" style={{fontWeight:"600"}} >{item.value}</h2>
  </div>
  
</div>
     </div>
     <div >
        <span className={`text-xs px-2 py-0.5 rounded-full ${item.changeColor} ${item.changeBg}`}>
    {item.change}
  </span>
     </div>

    </div>
  ))}
</div>


      {/* Employees Grid */}
      <div className='rounded-md border-[#E5E7EB] border-[0.8px] lg:flex  justify-between  items-center shadow-[#C6C6C633] shadow-sm p-4 bg-white'>
        <h2 className=" font-semibold text-[#202C4B] mb-2 lg-mb-0 text-lg">Employees Grid</h2>
      <div className='flex  gap-3' >
        <button className='border-[#E5E7EB] border-[0.8px] py-[6px] px-4 rounded' >Designation</button>
        <button  className='border-[#E5E7EB] border-[0.8px] py-[6px] px-4 rounded'>Sort By : Last 7 Days </button>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedData.length > 0 ? (
    allemployees.map((emp,index) => {
      // Calculate progress (for example using tasks completed)
    //   const totalTasks = proj.tasks.length;
 

    // 🔹 Hash function for consistency
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
};

// 🔹 Function to lighten a color
const lightenColor = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

// 🔹 Usage in component
const roleName = emp.role?.name || "Unknown";
const baseColor = stringToColor(roleName); // dark color for text
const lightBg = lightenColor(baseColor, 60); // lightened background


      return (  

        <>
    
          <div  className="bg-white shadow-[#C6C6C633] shadow-sm  rounded-md border-[#E5E7EB] border-[0.8px] p-4 text-center">

        <div className='flex justify-center items-start '>
               <div className=''>
                <input
      type="checkbox"
      className="w-5 h-5 accent-blue-600 border cursor-pointer"
    />
           </div>
          <div className="relative w-20 h-20 mx-auto mb-2">

<div onClick={()=>navigate(`/employee-dashboard/${emp?.employeeId}`)} className="w-20 h-20 rounded-full border-4 border-[#F26522] flex items-center justify-center overflow-hidden p-1 bg-white">
  <img
    src={`http://localhost:5000/api/${emp?.profileImage}`}
    alt="profile"
    className="w-full h-full object-cover object-center rounded-full"
  />
</div>


  {/* Active / Inactive dot */}
  <span
    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${
      emp.status ? "bg-green-500" : "bg-red-500"
    }`}
  ></span>
</div>
<div className='h-5 w-5' ></div>
        </div>

            <h3 className="font-bold text-gray-800">{emp?.firstName} {emp?.lastName}</h3>
            {/* <p className={`text-sm px-2 py-1 rounded font-medium  `} >{emp.role?.name}</p> */}
        <div className='flex justify-center'>

          <p
  className="text-sm font-medium px-2 w-fit mt-1 rounded"
  style={{
    color: baseColor,
    backgroundColor: lightBg,
  }}
>
  {roleName}
</p>
                {/* <p
  className={`text-sm font-medium px-2 w-fit  mt-1 rounded 
    
    ${emp.role?.name === "Digital Marketer" ? "text-[#FD3995] bg-[#FFEDF6]" : ""} 
    ${emp.role?.name === "Tester" ? "text-[#0DCAF0] bg-[#D3F5FC]" : ""} 
    ${emp.role?.name === "Developer" ? "text-[#AB47BC] bg-[#F7EEF9]" : ""} 
    ${emp.role?.name === "Full Stack Develper" ? "text-[#3B7080] bg-[#EDF2F4]" : ""} 
    ${emp.role?.name === "Project Manager" ? "text-green-600 bg-green-100" : ""}`}
>
  {emp.role?.name}
</p> */}
        </div>

            <div className="mt-3 grid grid-cols-3 font-normal text-sm text-gray-600">
              <div><p>Projects</p><span className="font-semibold text-[#202C4B] ">{emp.totalProjects}</span></div>
              <div><p>Done</p><span className="font-semibold text-[#202C4B]">{emp.completedProjects}</span></div>
              <div><p>Progress</p><span className="font-semibold text-[#202C4B]">{emp.productivity}</span></div>
            </div>
            <div className="mt-3">
              <p className="text-sm pb-1 font-medium ">Productivity : <span className="font-bold"   style={{
      width: `${emp.productivity}%`,
       color:
        emp.productivity <= 20
          ? "red"
          : emp.productivity <= 45
          ? "#FFC107"
          : emp.productivity <= 60
          ? "#AB47BC"
           : emp.productivity <= 80
          ? "#FD3995"
          : emp.productivity <= 90
          ? "green"
          : "green",
    }}>{emp.productivity}%</span></p>
             <div className="h-1 w-full rounded mt-1 bg-gray-200">
  <div
    className="h-1 rounded"
    style={{
      width: `${emp.productivity}%`,
      backgroundColor:
        emp.productivity <= 20
          ? "red"
          : emp.productivity <= 45
          ? "#FFC107"
          : emp.productivity <= 60
          ? "#AB47BC"
           : emp.productivity <= 80
          ? "#FD3995"
          : emp.productivity <= 90
          ? "green"
          : "green",
    }}
  ></div>
</div>

            </div>
          </div>
    
        </>
          );
        })
    ) : (
        <p className="col-span-full text-center text-gray-500 py-10">No Employee Found</p>
    )}
    </div>

      {/* Pagination */}
      <div className="w-full text-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
      
      
      
      
          {popupOpen && (
          <EmployeePopup
            isEdit={!!editData}
            data={editData}
            close={handleClose}
            
          />
        )}
      {/* <div className='flex item-center justify-center' ><button className='items-center flex bg-[#F26522] w-fit p-2 px-4 text-white  font-medium rounded'>Load More</button></div> */}
    </div>
    </div>
  )
}

export default AllEmployee