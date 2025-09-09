import React, { useCallback, useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProjects, updateProjects } from "../../api/ProjectsApi";
import { usePaginate } from "../Pagination/usePagination";
import { getRandomColor } from "../../utils/randomColor";
import { formatDateFrontend } from "../../api/CustomApi";
import { showToast } from "../../utils/toastHelper";
import { confirmAction } from "../../utils/confirm";
import debounce from "lodash.debounce";
import { getStatusStyles } from "../../utils/progressReport";


const AllProjects = () => {


    const [loading, setLoading] = useState(false);
    const [filteredProjects, setfilteredProjects] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [search, setsearch] = useState("");
   const [openDropdown, setOpenDropdown] = useState(null);
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
  
  
  
    
  
  
  
  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const confirmed = await confirmAction({
        title: "Change Status?",
        text: `You are Sure To Update Status. ${newStatus}`,
        icon: "warning",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });
      if (!confirmed) return;
  
   
  
      const result = await updateProjects(projectId, { status: newStatus });
      if (result.success) {
        showToast(`Project Status Updated marked ${newStatus}`, "success");
        setOpenDropdown(null)
        fetchallProjects()

      } else {
        showToast("Error updating status", "error");
      }
    } catch (err) {
      showToast("Error updating status", "error");
    }
  };

  const [progressValues, setProgressValues] = useState({}); // projectId: progress

  const handleSliderChange = (projectId, value) => {
  // frontend update
  setProgressValues(prev => ({ ...prev, [projectId]: value }));
  // backend update with debounce
  handleProgressChange(projectId, value);
};

  const handleProgressChange = useCallback(


  debounce(async (projectId, newProgress) => {
      //     const confirmed = await confirmAction({
      //   title: "Change Status?",
      //   text: `You are Sure To Update Status. ${newProgress}`,
      //   icon: "warning",
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "Cancel",
      // });
      // if (!confirmed) return;
    try {
      const res = await updateProjects(projectId, { progress: newProgress });
      if (res.success) {
        showToast(`Progress updated to ${newProgress}%`, "success");
        fetchallProjects(); // refresh frontend data
        setOpenDropdown(null)
      }
    } catch (err) {
      showToast("Error updating progress", "error");
    }
  }, 1000),
  []
);
  
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







const getProgressColor = (progress) => {
  if (progress <= 30) return "bg-red-500";
  if (progress <= 70) return "bg-yellow-500";
  return "bg-green-500";
};




  return (
    <div className=" bg-[#F9FAFB] Employee">
 <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div className="w-full sm:w-auto">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">All Projects</h2>
    <span className="text-sm text-gray-500 block sm:inline sm:ps-5">
      / Employee / <span className="text-gray-800">All Projects</span>
    </span>
  </div>

  {/* Action button */}

</header>

{/* Subheader */}
<div className="flex flex-col lg:flex-row justify-between gap-4 px-5 py-3 border-b border-[#F3F4F6] bg-white font-medium">
  {/* Left: Search + Filter */}
  <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
    <div className="flex bg-[#F9FAFB] items-center gap-2 border border-gray-300 rounded-md px-2 py-2 w-full sm:w-64">
      <IoSearchOutline className="text-gray-500" />
      <input
        type="text"
        placeholder="Search projects..."
        className="flex-1  outline-none text-sm font-normal"
      />
    </div>
    <button className="flex items-center text-[#0A0A0A] gap-2 px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto">
      <LuFilter /> All Projects
    </button>
  </div>

  {/* Right: View Switcher */}
  <div className="flex items-center gap-2 bg-[#F3F4F6] p-1.5 rounded w-fit self-start lg:self-auto">
    <button className="flex items-center gap-2 text-[#0A0A0A] bg-white px-3 py-1 rounded-md">
      <RxDashboard /> Grid
    </button>
    <button className="flex items-center gap-2 px-3 py-1 rounded-md">
      <MdOutlineFormatListBulleted /> List
    </button>
  </div>
</div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {paginatedData.map((project, idx) => {

        const styles = getStatusStyles(project?.status)
        return  (

        <div
          key={idx}
          className="bg-white border rounded-lg border-[#F3F4F6] p-5 shadow-sm flex flex-col py-8 gap-4"
        >
          {/* Header */}
         {/* Header with side line */}
<div className="flex flex-wrap gap-3 mb-5 justify-between items-start">
  {/* Left section with rounded border */}
  <div className="relative pl-3">
    <div
      className="absolute top-0 left-0 h-full w-[4px] rounded-full"
      style={{ backgroundColor: getRandomColor() }}
    ></div>

    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-1">
      {project?.name}
      {/* {project.star} */}
    </h3>
    <p className="text-sm text-gray-500">
      {/* {project?.description} */}description

    </p>
  </div>

  {/* Status (separate, no border) */}
  <span
    className={`text-xs font-medium px-2 py-2 capitalize rounded ${styles?.badge}`}
  >
    {project.status}
  </span>
</div>



          {/* Deadline */}
          <div className="flex font-medium items-center justify-between text-sm text-gray-600 ">
          <div className="flex items-center  text-gray-600 gap-1 font-bold">
  <AiTwotoneCalendar  />
  <span className=" text-[var(--main-color)] ">
     Deadline: {formatDateFrontend(project.deadline,'date')}
    </span>
          </div>



                {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === project?._id ? null :project?._id)
            }
            className="text-gray-400"
          >
            <BsThreeDots className="ml-auto cursor-pointer" />
            
          </button>
          {/* {openDropdown === project?._id && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {["in-progress", "completed", "stop", "hold", "cancel", "continue"].map((status) => (
                <div
                  key={status}
                  onClick={() =>
                    handleStatusChange(project?._id, status)
                  }
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                >
                  {status}
                </div>
              ))}




            </div>
          )} */}

          {openDropdown === project?._id && (
  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
    {/* Status options */}
    {["in-progress", "completed", "on hold", "cancelled", "continue"].map((status) => (
      <div
        key={status}
        onClick={() => handleStatusChange(project?._id, status)}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700 rounded"
      >
        {status}
      </div>
    ))}

    {/* Divider */}
    <div className="border-t my-2"></div>

    {/* Progress Slider */}
    <div className="flex flex-col gap-1 px-2">
      <label className="text-xs text-gray-500">Progress: {progressValues[project._id] ?? project?.progress}%</label>
   <input
  type="range"
  min="0"
  max="100"
  value={progressValues[project._id] ?? project?.progress}
  onChange={(e) => handleSliderChange(project._id, Number(e.target.value))}
  // className="w-full"
        className="w-full h-2 rounded-lg accent-blue-500"
/>
    
    </div>
  </div>
)}

        </div>
          </div>

          {/* Progress */}
    

<div>
  {/* Header */}
  <div className="flex justify-between mb-2">
    <p className="text-sm text-gray-500 font-medium">Progress</p>
    <p className={`text-sm mt-1 ${styles.text}`}>
      {project?.progress}%
    </p>
  </div>

  {/* Progress bar */}
  <div className="w-full bg-gray-200 h-2 rounded">
   <div
      className={`${getProgressColor(project?.progress)} h-2 rounded`}
      style={{ width: `${project?.progress}%` }}
    />
  </div>
</div>


          {/* Members + Stats */}
          <div className="flex justify-between items-center">
<div className="flex -space-x-2">
  {project.employees.map((emp, i) => (
    <div key={i} className="relative group">
      {/* Profile Image */}
      <img
        src={`http://localhost:5000/api/${emp?.profileImage}`}
        alt={emp?.name}
        className="w-10 h-10 rounded-full border-2 border-white object-cover"
      />

      {/* Tooltip on hover */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max px-3 py-1 
                      bg-gray-800 text-white text-xs rounded-md opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        <p className="font-semibold">{emp?.firstName}</p>
        <p className="text-gray-300">{emp?.role?.name}</p>
      </div>
    </div>
  ))}
</div>


       <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
  <div className="flex items-center gap-1">
    <FaRegFileAlt className="text-gray-500 font-medium" />
    {/* {project.tasks} */}
     tasks
  </div>
  <div className="flex items-center gap-2">
    <RxActivityLog className="text-gray-500 font-medium" />
    {/* {project.activities}  */}
    activities
  </div>
</div>

          </div>

          {/* Footer */}
<div className="grid grid-cols-2 gap-4 font-medium pt-3 border-t border-[#F3F4F6] text-sm text-gray-600">
  {/* Client */}
  <div className="flex flex-col gap-1">
    <span className="text-gray-500 font-medium">Client</span>
    <span className="text-gray-800">
      {project?.client?.name || 'client'}
      
      </span>
  </div>

  {/* Budget */}
  <div className="flex flex-col gap-1">
    <span className="text-gray-500 font-medium">Download Documents</span>
    {/* <span className="text-gray-800">{project.budget}</span> */}
                 <button
    onClick={() => {
      // Create a temporary print container
      const printContent = document.createElement("div");
      printContent.innerHTML = project?.description.replace(/\n/g, "<br/>");
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

  {/* Start Date */}
  <div className="flex flex-col gap-1">
    <span className="text-gray-500 font-medium">Start Date</span>
    <span className="text-gray-800">{formatDateFrontend(project.startDate,'date')}</span>
  </div>

  {/* Priority */}
  <div className="flex flex-col text-center gap-1">
    <span className="text-gray-500 text-center font-medium">Priority</span>
         <span className={`px-2 py-1 rounded text-center  text-white text-sm ${
              project?.priority === "high" ? "bg-[var(--main-color)]" :
              project?.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
            }`}>
              {project?.priority.toUpperCase()}
            </span>
  </div>
</div>

        </div>
       )
      }
      )}
    </div>

    </div>
  );
};

export default AllProjects;