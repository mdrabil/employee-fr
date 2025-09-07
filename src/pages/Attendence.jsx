import React, { useEffect, useState } from 'react'
import { MdReport } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { getOverallAttendance } from '../api/Attanance';
import { formatDate } from '../api/CustomApi';


const stats = [
  { 
    title: "Total Employee", 
    value: 1007, 
    change: "+10.01%", 
    icon: "public/Images/AllEmpIimg/EmpGroup.png", 
    color: "bg-[#212529]", 
    changeColor: "text-[#AB47BC]", 
    changeBg: "bg-[#F0DEF3]" 
  },
  { 
    title: "Active", 
    value: 1007, 
    change: "+10.01%", 
    icon: "public/Images/AllEmpIimg/active.png", 
    color: "bg-green-500", 
    changeColor: "text-[#F26522]", 
    changeBg: "bg-[#F265221A]" 
  },
  { 
    title: "Inactive", 
    value: 1007, 
    change: "+10.01%", 
    icon: "public/Images/AllEmpIimg/inactive.png", 
    color: "bg-[#DC2626]", 
    changeColor: "text-[#212529]", 
    changeBg: "bg-[#2125291A]" 
  },
  { 
    title: "New Joiners", 
    value: 67, 
    change: "+10.01%", 
    icon: "public/Images/AllEmpIimg/newJoin.png", 
    color: "bg-blue-500", 
    changeColor: "text-[#3B7080]", 
    changeBg: "bg-[#3B70801A]" 
  },
];

  const data = [
    {
      name: "Anthony Lewis",
      role: "UI/UX Team",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:45 PM",
      break: "30 Min",
      late: "32 Min",
      hours: "8.35 Hrs",
      hoursColor: "bg-green-500 text-white",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Brian Villalobos",
      role: "Development",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      hours: "7.48 Hrs",
      hoursColor: "bg-[#DC2626] text-white",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
     {
      name: "Brian Villalobos",
      role: "Development",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      hours: "7.48 Hrs",
      hoursColor: "bg-[#DC2626] text-white",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
     {
      name: "Brian Villalobos",
      role: "Development",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      hours: "7.48 Hrs",
      hoursColor: "bg-[#DC2626] text-white",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
     {
      name: "Brian Villalobos",
      role: "Development",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      hours: "7.48 Hrs",
      hoursColor: "bg-[#DC2626] text-white",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
     {
      name: "Brian Villalobos",
      role: "Development",
      status: "Present",
      checkIn: "09:00 AM",
      checkOut: "06:12 PM",
      break: "20 Min",
      late: "20 Min",
      hours: "7.48 Hrs",
      hoursColor: "bg-[#DC2626] text-white",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];






const Attendence = () => {

    const [attendance, setAttendance] = useState();
  const [statsall, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Today's Attendance
    const fetchAttendance = async () => {
    
      try {
        setLoading(true);
        const result  = await getOverallAttendance();
        if(result?.success)
        setAttendance(result?.data?.records || null);
          console.log('over all attandance',result?.data?.records)
         setStats(result?.data?.stats || {});
      } catch (error) {
        setAttendance(null);
        // setStats({});
      } finally {
        setLoading(false);
      }
    };
  

      useEffect(() => {
      fetchAttendance();
      }, []);

  return (
      <div className='bg-[#F9FAFB] Employee'>
           <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
     <div className="w-full sm:w-auto">
       <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">
         Attendance Admin
       </h2>
       <span className="text-sm text-gray-500 sm:ps-5">
         / Employee / <span className="text-gray-800">Attendance Admin</span>
       </span>
     </div>
   
   <div className="flex sm:flex-nowrap items-center gap-2 sm:gap-3 w-50 sm:w-auto">
     <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 RedButt  rounded-md w-full sm:w-auto">
       <MdReport />Report
     </button>
   </div>
   </header>

<div className="px-4 py-4">
  <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-5">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-5">
      <div>
        <h2 className="text-xl font-bold text-gray-700">Attendance Details Today</h2>
        <p className="text-lg text-gray-400">Data from the 800+ total no of employees</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-md font-medium text-gray-600">Total Absentees today</p>
        <div className="flex -space-x-3">
          <img src="https://randomuser.me/api/portraits/men/34.jpg" className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
          <img src="https://randomuser.me/api/portraits/women/35.jpg" className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
          <img src="https://randomuser.me/api/portraits/men/36.jpg" className="w-6 h-6 rounded-full border-2 border-white" alt="user" />
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#DC2626] text-white text-xs font-bold border-2 border-white">+4</div>
        </div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
      {/* Present */}
      <div className="bg-white rounded p-3 py-4 border border-[#E5E7EB]">
        <p className="text-sm text-start font-medium text-gray-500">Present</p>
        <div className="flex pt-2 justify-between">
          <h2 className="text-xl font-bold text-gray-800">250</h2>
          <span className="text-xs px-4 flex items-center font-medium rounded bg-green-500 text-white">+1%</span>
        </div>
      </div>

      {/* Late Login */}
      <div className="bg-white rounded p-3 py-4 border border-[#E5E7EB]">
        <p className="text-sm text-start font-medium text-gray-500">Late Login</p>
        <div className="flex pt-2 justify-between">
          <h2 className="text-xl font-bold text-gray-800">45</h2>
          <span className="text-xs px-4 flex items-center font-medium rounded bg-[#DC2626] text-white">+1%</span>
        </div>
      </div>

      {/* Uninformed */}
      <div className="bg-white rounded p-3 py-4 border border-[#E5E7EB]">
        <p className="text-sm text-start font-medium text-gray-500">Uninformed</p>
        <div className="flex pt-2 justify-between">
          <h2 className="text-xl font-bold text-gray-800">15</h2>
          <span className="text-xs px-4 flex items-center font-medium rounded bg-[#DC2626] text-white">+1%</span>
        </div>
      </div>

      {/* Permission */}
      <div className="bg-white rounded p-3 py-4 border border-[#E5E7EB]">
        <p className="text-sm text-start font-medium text-gray-500">Permission</p>
        <div className="flex pt-2 justify-between">
          <h2 className="text-xl font-bold text-gray-800">03</h2>
          <span className="text-xs px-4 flex items-center font-medium rounded bg-green-500 text-white">+1%</span>
        </div>
      </div>

      {/* Absent */}
      <div className="bg-white rounded p-3 py-4 border border-[#E5E7EB]">
        <p className="text-sm text-start font-medium text-gray-500">Absent</p>
        <div className="flex pt-2 justify-between">
          <h2 className="text-xl font-bold text-gray-800">12</h2>
          <span className="text-xs px-4 flex items-center font-medium rounded bg-[#DC2626] text-white">+1%</span>
        </div>
      </div>
    </div>
  </div>
</div>


{/* attendence */}
<div className='px-4 py-4' >
  <div className="bg-white shadow-sm  rounded-lg border border-gray-200 ">
      {/* Header */}
      <div className="flex border-b border-[#E5E7EB] flex-wrap p-5 justify-between items-center gap-3 pb-4">
        <h2 className="text-lg font-semibold text-[#202C4B]">Admin Attendance</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="2025/08/20 - 2025/09/03"
            className="border border-[#E5E7EB] font-medium rounded-md text-sm px-2 py-2 "
          />
          <select className="border border-[#E5E7EB] font-medium rounded-md text-sm px-2 py-2 ">
            <option>Department</option>
          </select>
          <select className="border border-[#E5E7EB] font-medium rounded-md text-sm px-2 py-2">
            <option>Select Status</option>
          </select>
          <select className="border border-[#E5E7EB] font-medium rounded-md text-sm px-2 py-2">
            <option>Sort By: Last 7 Days</option>
          </select>
          {/* <input
            type="text"
            placeholder="Search"
            className="border rounded-md text-xs px-3 py-1 text-gray-600"
          /> */}
        </div>
      </div>

{/* sec heading */}
  <div className="flex border-b border-[#E5E7EB] flex-wrap p-5 py-3  justify-between items-center gap-3">
       <div className='flex gap-3 items-center'>
         <h2 className="text-md font-medium text-gray-700">Row Per Page</h2>
         <select name="" className='px-3 font-medium py-1 border-[#E5E7EB] border rounded' id="">
          <option value="10">10</option>
         </select>
         <p>Entries</p>
       </div>

        <div className="flex flex-wrap gap-2 ">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md text-sm px-3 py-2 border-[#E5E7EB] text-gray-600"
          />
        </div>
      </div>
      {/* Table */}
    <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-200 text-sm whitespace-nowrap">
    <thead className="bg-[#E5E7EB] text-[#111827]">
      <tr>
        <th className="p-5 py-4 text-left">
          <input
            type="checkbox"
            className="border-[#E5E7EB] border h-[18px] w-[18px]"
          />
        </th>
       <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-12">
    <span>Employee</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>

  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-12">
    <span>Status</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>

  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-4">
    <span>Check In</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-4">
    <span>Check Out</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-4">
    <span>Break</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-4">
    <span>Late</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
  <th className="p-2 text-left">
  <div className="flex border-r border-white items-center gap-4">
    <span>Production Hours</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
  <th className="p-2 text-left">
  <div className="flex  items-center gap-4">
    <span>Action</span>
    <button className="p-1 rounded  hover:bg-gray-200">
      <FaSort className='text-[#0000004B] size-4' />
    </button>
  </div>
</th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
      </tr>
    </thead>
    <tbody>
      {attendance?.map((emp, i) => (
        <tr
          key={i}
          className="border-y border-[#E5E7EB] hover:bg-gray-50"
        >
          <td className="p-5 py-6">
            <input
              type="checkbox"
              className="border-[#E5E7EB] border h-[18px] w-[18px]"
            />
          </td>
       
          <td className="p-2 py-6 flex items-center gap-2">
            <img
              src={`http://localhost:5000/api/${emp?.employeeID?.profileImage}`}
              alt={emp?.employeeID?.firstName}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800">{emp?.employeeID?.name}</p>
              <p className="text-xs text-gray-500">{emp?.employeeID?.role?.name}</p>
            </div>
          </td>
          <td className="p-2 py-6">
            <span className="text-xs px-2 py-1 font-bold rounded bg-green-100 text-green-600">
              ● {emp?.attendanceStatus}
            </span>
          </td>

           <td className="p-2 py-6">{formatDate(emp?.checkIn,'time')}</td>
          <td className="p-2 py-6">{emp?.checkOut ? formatDate(emp?.checkOut,'time'):'null'}</td>
          <td className="p-2 py-6">{emp?.totalBreakMinutes}</td>
          <td className="p-2 py-6">{emp.late}</td>
          <td className="p-2 py-6">
            <span
              className={`text-xs px-3 py-1 rounded ${emp?.extraHours}`}
            >
              {emp?.extraHours}
            </span>
          </td>
          <td className="p-2 text-gray-800 cursor-pointer">
            <FiEdit />
          </td> 
        </tr>
      ))}
     
    </tbody>
    
  </table>
   <div className='flex justify-between px-5 py-4 w-full font-normal'>
        <div>
          <h4 className='text-[#000000]' >Showing 1 - 10 of 10 entries</h4>
        </div>
        <div>
          <button className='RedButt fw-bold h-6 w-6 rounded-full'>1</button>
        </div>
      </div>
</div>

  </div>

</div>


   </div>
  )
}

export default Attendence
