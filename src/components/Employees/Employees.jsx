import React, { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";
// import { deleteDepartment, getemployees, updateDepartment } from "../../api/Department";
import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit, FaEye } from "react-icons/fa";
import EmployeePopup from "./EmployeePopup";
import ProjectPopup from "../Projectoverview/ProjectPopup";
import { getEmployees, updateEmployee } from "../../api/EmployeeApi";
import { formatDate } from "../../api/CustomApi";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setfilteredEmployees] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employees, setEmployees] = useState([]);
const navigate = useNavigate()

  const fetchemployees = async () => {
    try {
      setLoading(true);
      const result = await getEmployees();
      if (result.success) {
        const deptArray = Array.isArray(result.employeesdata?.data) ? result?.employeesdata?.data : [];
        console.log('emdopy ',deptArray)
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


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredEmployees, 10);
  // Filtered employees



  



const handleStatusChange = async (empId, newStatus) => {
  try {
    const confirmed = await confirmAction({
      title: "Change Status?",
      text: `You are about to mark this Employee as ${newStatus ? "Active" : "Inactive"}.`,
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (!confirmed) return;

    // ✅ Optimistic update
    setEmployees(prev =>
      prev.map(emp => emp._id === empId ? { ...emp, status: newStatus } : emp)
    );

    const result = await updateEmployee(empId, { status: newStatus });
    if (result.success) {
      showToast(`Employee marked ${newStatus ? "Active" : "Inactive"}`, "success");
    } else {
      showToast("Error updating status", "error");
    }
  } catch (err) {
    showToast("Error updating status", "error");
  }
};

useEffect(() => {
  let filtered = employees;

  if (search) {
    filtered = filtered.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      (emp.phone && emp.phone.includes(search))
    );
  }
  setfilteredEmployees(filtered);
}, [employees, search]);


const handleClose = ()=>{
  setPopupOpen(false)
  fetchemployees()
}

  return (
<div className="bg-[var(--bg-color)] min-h-screen relative p-4 md:p-6">
  {loading && <LoadingOverlay />}

  <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
    Employees 
    {/* <span className="text-[var(--text-color)] text-base md:text-lg">{employees.length}</span> */}
  </h2>

  <div className="mb-4 items-start p-4 bg-white rounded shadow-sm">
    {/* Filters & Add */}
    <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-3 mb-4 items-start">
      <input
        type="text"
        placeholder="Search by name or description..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="px-3 py-2 border rounded border-[var(--border-main)] w-full sm:w-auto flex-1"
      />

      <button
        onClick={() => {
          setEditData(null);
          setPopupOpen(true);
        }}
        className="px-3 py-2 bg-[var(--main-color)] text-white rounded w-full sm:w-auto"
      >
        + Add New Member
      </button>
    </div>

 
   {/* Table */}
      <div className="overflow-x-auto">
       <table className="w-full min-w-[500px] border-collapse">
         <thead>
           <tr className="bg-[var(--secondary-bg-color)] text-left">
             <th className="p-2 text-sm md:text-base">Employee ID</th>
             <th className="p-2 text-sm md:text-base">Name</th>
             <th className="p-2 text-sm md:text-base">Details</th>
             <th className="p-2 text-sm md:text-base">Designation</th>
             <th className="p-2 text-sm md:text-base">Joining Date</th>
             <th className="p-2 text-sm md:text-base">Status</th>
             <th className="p-2 text-sm md:text-base text-right">Actions</th>
           </tr>
         </thead>
         <tbody>
           {paginatedData.map((empt) => (
             <tr
               key={empt._id}
               className="border-b border-gray-200 hover:bg-[var(--bg-color)] transition"
             >
               <td className="p-2 text-sm md:text-base">{empt?.employeeId}</td>
               <td className="p-2 text-sm md:text-base">{empt.firstName} {empt?.lastName}</td>
            
         <td className="p-2 text-sm md:text-base">

               <div>
<span>{empt?.email}</span>
<span>{empt?.phone}</span>
               </div>
          </td>
               <td className="p-2 text-sm md:text-base">{empt.department?.name || "not found"}</td>
               <td className="p-2 text-sm md:text-base">{formatDate(empt?.joiningDate,'date') || "not found"}</td>
             
               <td className="p-2">
                 <label className="inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    className="toggle-input"
                    checked={empt.status}
                    onChange={(e) => handleStatusChange(empt._id, e.target.checked)}
                  />
                 </label>
               </td>
               <td className="p-2 flex justify-end items-center gap-2 md:gap-3">
             
                 <button
                   onClick={() => {
                     setEditData(empt);
                     setPopupOpen(true);
                   }}
                   className="text-[var(--text-color)] hover:text-blue-500 transition-colors duration-200 p-1 rounded"
                   title="Edit Department"
                 >
                   <FaEdit size={18} />
                 </button>
 
              
                 <button
                   onClick={() => navigate(`/${empt?._id}`)}
                   className="text-[var(--main-color)] hover:text-red-600 transition-colors duration-200 p-1 rounded"
                   title="Delete Department"
                 >
                   <FaEye size={18} />
                 </button>
               </td>
             </tr>
           ))}
           {paginatedData.length === 0 && !loading && (
             <tr>
               <td colSpan="4" className="text-center p-4 text-[var(--text-color)] text-sm md:text-base">
                 No Employee found.
               </td>
             </tr>
           )}
         </tbody>
       </table>
     </div> 


{/* card format  */}
     {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {paginatedData.length > 0 ? (
         paginatedData.map((emp) => (
           <div
             key={emp._id}
             className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition relative border"
           >
           
             <div className="flex items-center gap-4 mb-4">
               <img
                 src={emp.profileImage || "/placeholder-profile.png"}
                 alt={emp.firstName}
                 className="w-16 h-16 rounded-full object-cover border"
               />
               <div>
                 <h3 className="font-semibold text-lg">
                   {emp.firstName} {emp.lastName}
                 </h3>
                 <p className="text-sm text-gray-500">{emp.designation || "Not Assigned"}</p>
               </div>
             </div>
     
          
             <div className="text-sm mb-2 space-y-1">
               <p><span className="font-semibold">Email:</span> {emp.email}</p>
               <p><span className="font-semibold">Phone:</span> {emp.phone}</p>
               <p><span className="font-semibold">Employee ID:</span> {emp.employeeId}</p>
               <p><span className="font-semibold">Department:</span> {emp.department?.name || "Not Found"}</p>
               <p><span className="font-semibold">Joining Date:</span> {formatDate(emp.joiningDate, 'date')}</p>
             </div>
     
          
             <div className="flex items-center justify-between mt-3">
               <label className="inline-flex items-center cursor-pointer">
                 <input
                   type="checkbox"
                   className="toggle-input"
                   checked={emp.status}
                   onChange={(e) => handleStatusChange(emp._id, e.target.checked)}
                 />
                 <span className="ml-2 text-sm">{emp.status ? "Active" : "Inactive"}</span>
               </label>
     
             
               <div className="flex items-center gap-2">
                 <button
                   onClick={() => {
                     setEditData(emp);
                     setPopupOpen(true);
                   }}
                   className="text-blue-500 hover:text-blue-700 transition"
                   title="Edit Employee"
                 >
                   <FaEdit size={18} />
                 </button>
                 <button
                   onClick={() => navigate(`/${emp._id}`)}
                   className="text-red-500 hover:text-red-700 transition"
                   title="View Employee"
                 >
                   <FaEye size={18} />
                 </button>
               </div>
             </div>
           </div>
         ))
       ) : (
         <p className="col-span-full text-center text-gray-500 py-10">
           No Employees found.
         </p>
       )}
     </div> */}
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
</div>

  );
};

export default Employees;
