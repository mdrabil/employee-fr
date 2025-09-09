import React, { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";

import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit, FaSort } from "react-icons/fa";

import { formatDateFrontend } from "../../api/CustomApi";
import { getAllEmployeesAttendanceToday } from "../../api/Attanance";
import { FiEdit } from "react-icons/fi";
import { MdReport } from "react-icons/md";

const TodayAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");
// onst [search, setSearch] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [attendance, setAttendance] = useState([]);


  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const result = await getAllEmployeesAttendanceToday();
      if (result.success) {
        const deptArray = Array.isArray(result?.data?.attendance) ? result?.data?.attendance : [];
        // console.log('attned',result?.data)
        setAttendance(deptArray);
      } else {
        setAttendance([]);
        showToast(result.message || "Failed to fetch Attendance", "error");
      }
    } catch (error) {
      setAttendance([]);
      showToast("Error fetching Attendance", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredAttendance, 10);
  // Filtered Attendance



  

const handleDelete = async (id) => {
  // const confirmed = await confirmAction({
  //   title: "Delete Attendance?",
  //   // text: "This action cannot be undone!",
  //   icon: "warning",
  //   confirmButtonText: "Delete",
  //   cancelButtonText: "Cancel",
  // });

  // if (!confirmed) return; // ❌ User cancelled

  // try {
  //   setDeleteLoading(id);
  //   const result = await (id);

  //   if (result.success) {
  //     showToast("Attendance deleted!", "success");
  //     fetchAttendance();
  //   }
  // } catch (error) {
  //   showToast("Error deleting Attendance", "error");
  // } finally {
  //   setDeleteLoading(null);
  // }
};


const handleStatusChange = async (deptId, newStatus) => {
  try {
    const confirmed = await confirmAction({
      title: "Change Status?",
      text: `You are about to mark this Attendance as ${newStatus ? "Active" : "Inactive"}.`,
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (!confirmed) return;

    const result = await updateAttendance(deptId, { status: newStatus });
    if (result.success) {
      showToast(`Attendance marked ${newStatus ? "Active" : "Inactive"}`, "success");
      fetchAttendance(); // Refresh table
    }
  } catch (err) {
    showToast("Error updating status", "error");
  }
};

 useEffect(() => {
  let filtered = attendance;
 
  if (search) {
    filtered = filtered.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  setFilteredAttendance(filtered);
}, [attendance, search]);

const handleClose = ()=>{
  setPopupOpen(false)
  fetchAttendance()
}

  return (
      <div className='bg-[#F9FAFB] Employee'>
           <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
     <div className="w-full sm:w-auto">
       <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">
       Today  Attendance 
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
    <span>Current Status</span>
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
        {/* <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th>
        <th className="p-2 text-left"></th> */}
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
              <p className="font-medium text-gray-800">{emp?.employeeID?.firstName}</p>
              <p className="text-xs text-gray-500">{emp?.employeeID?.role?.name}</p>
            </div>
          </td>
          <td className="p-2 py-6">
            <span className="text-xs px-2 py-1 font-bold rounded bg-green-100 text-green-600">
              ● {emp?.attendanceStatus}
            </span>
          </td>

           <td className="p-2 py-6">{formatDateFrontend(emp?.checkIn,'time')}</td>
          <td className="p-2 py-6">{emp?.checkOut ? formatDateFrontend(emp?.checkOut,'time'):'null'}</td>
          <td className="p-2 py-6">{emp?.totalBreakFormatted}</td>
          <td className="p-2 py-6">{emp.lateBy}</td>
    

               <td className="p-2 py-6">
             <span
          className={`font-semibold ${
            emp?.currentStatus === "On Break"
              ? "text-orange-500 bg-red-100 px-3 py-2 rounded"
              : emp?.currentStatus === "Present"
              ? "text-green-600 bg-green-100 px-3 py-2 rounded"
              : emp?.currentStatus === "completed"
              ? "text-blue-600"
              : "text-red-500 bg-red-100 px-3 py-2 rounded"
          }`}
        >
          {emp?.currentStatus ? emp?.currentStatus :'Not Started'}
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
};
export default TodayAttendance;
