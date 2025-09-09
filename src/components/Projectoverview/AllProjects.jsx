import React, { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";
// import { deleteDepartment, getallProjects, updateDepartment } from "../../api/Department";
import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit, FaEye } from "react-icons/fa";
// import EmployeePopup from "./EmployeePopup";
import ProjectPopup from "../Projectoverview/ProjectPopup";

import { formatDateFrontend } from "../../api/CustomApi";
import { useNavigate } from "react-router-dom";
import { getProjects, updateProjects } from "../../api/ProjectsApi";
import { ProjectTable } from "./ProjectTable";

const AllProjects = () => {
  const [loading, setLoading] = useState(false);
  const [filteredProjects, setfilteredProjects] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [allProjects, setGetProjects] = useState([]);
const navigate = useNavigate()

  const fetchallProjects = async () => {
    try {
      setLoading(true);
      const result = await getProjects();
      if (result.success) {
        const deptArray = Array.isArray(result.projectdata?.data) ? result?.projectdata?.data : [];
        // console.log('projects ',deptArray)
        setGetProjects(deptArray);
      } else {
        setGetProjects([]);
       
      }
    } catch (error) {
      setGetProjects([]);
   
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchallProjects();
  }, []);


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredProjects, 10);
  // Filtered allProjects



  



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
    setGetProjects(prev =>
      prev.map(emp => emp._id === empId ? { ...emp, status: newStatus } : emp)
    );

    const result = await updateProjects(empId, { status: newStatus });
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
  let filtered = allProjects;

  setfilteredProjects(filtered);
}, [allProjects, search]);

const handleEdit = (data)=>{
setPopupOpen(true)
setEditData(data)
}

const handleClose = ()=>{
  setPopupOpen(false)
  fetchallProjects()
}

  return (
<div className="bg-[var(--bg-color)] min-h-screen relative p-4 md:p-6">
  {loading && <LoadingOverlay />}

  <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
    AllProjects 
    {/* <span className="text-[var(--text-color)] text-base md:text-lg">{allProjects.length}</span> */}
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
        + Add Project
      </button>
    </div>

 
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {paginatedData.length > 0 ? (
    paginatedData.map((proj) => {
      // Calculate progress (for example using tasks completed)
      const totalTasks = proj.tasks.length;
      const completedTasks = proj.tasks.filter(t => t.status === "complete").length;
      const progressPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Deadline highlight
      const today = new Date();
      const deadlineDate = new Date(proj.deadline);
      const isDeadlineNear = (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 3; // 3 days or less

      return (
        <div
          key={proj._id}
          className="bg-white rounded-lg shadow-md p-5 border hover:shadow-xl transition relative"
        >
          {/* Header: Project Name & Priority */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">{proj.name}</h3>
<div className="flex items-center gap-1">
              <span className={`px-2 py-1 rounded text-white text-sm ${
              proj.priority === "high" ? "bg-[var(--main-color)]" :
              proj.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
            }`}>
              {proj.priority.toUpperCase()}
            </span>
             <button
    onClick={() => {
      // Create a temporary print container
      const printContent = document.createElement("div");
      printContent.innerHTML = proj.description.replace(/\n/g, "<br/>");
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Description</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; white-space: pre-line; }
            </style>
          </head>
          <body>${printContent.innerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }}
    className="px-4 py-1 bg-blue-500 text-white rounded-md "
  >
    Print
  </button>
</div>
          </div>

          {/* Client Info */}
          <div className="mb-3 text-sm text-[var(--text-color)] space-y-1">
            <p><span className="font-semibold">Client:</span> {proj.client.name}</p>
            <p><span className="font-semibold">Email:</span> {proj.client.email}</p>
            <p><span className="font-semibold">Phone:</span> {proj.client.phone}</p>
          </div>

          {/* Employees */}
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-1">Assigned Employees:</h4> 
            <div className="flex flex-wrap gap-2">
              {proj.employees.map(emp => (
                <span
                  key={emp._id}
                  className="bg-[var(--pending-bg-color)] text-[var(--pending-text-color)] px-2 py-1 rounded-full text-xs"
                >
                  {emp.firstName} {emp.lastName} ({emp.role?.name})
                </span>
              ))}
            </div>
          </div>

          {/* Tasks & Progress */}
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-1">Progress:</h4>
            <div className="w-full bg-[var(--progress-bg-color)] rounded-full h-4 overflow-hidden">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: progressPercent === 100 
                    ? "var(--complete-bg-color)" 
                    : "var(--main-color)"
                }}
              />
            </div>
            <p className="text-xs mt-1 text-[var(--progress-text-color)]">{progressPercent}% completed</p>
          </div>

          {/* Deadline */}
          <div className="mb-3">
            <span className={`px-2 py-1 rounded text-sm ${
              isDeadlineNear ? "bg-red-600 text-white" : "bg-[var(--secondary-bg-color)] text-[var(--text-color)]"
            }`}>
              Deadline: {new Date(proj.deadline).toLocaleDateString()}
            </span>
          </div>
       {/* <div className="print-description" style={{ whiteSpace: "pre-line" }}>
    {proj.description}
  </div> */}


          {/* Status */}
          <div className="flex justify-between items-center mt-2">
            <span className={`px-2 py-1 rounded text-sm ${
              proj.status === "in progress" ? "bg-[var(--pending-bg-color)] text-[var(--pending-text-color)]" :
              proj.status === "complete" ? "bg-[var(--complete-bg-color)] text-[var(--complete-text-color)]" :
              "bg-gray-200 text-gray-600"
            }`}>
              {proj.status.toUpperCase()}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(proj)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => viewProject(proj)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaEye size={18} />
              </button>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="col-span-full text-center text-gray-500 py-10">No Projects Found</p>
  )}
</div>


   {/* {paginatedData.map((empt) => (

 <ProjectTable project={empt}/>
   ))} */}
    
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
    <ProjectPopup
      isEdit={!!editData}
      data={editData}
      close={handleClose}
      
    />
  )}
</div>

  );
};

export default AllProjects;
