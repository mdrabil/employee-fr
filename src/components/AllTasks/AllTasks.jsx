import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import { TbArrowsSort } from "react-icons/tb";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiCalendar, FiMessageSquare, FiEye } from "react-icons/fi";
import { MdAttachFile } from "react-icons/md";
import { TbCheckbox } from "react-icons/tb";
import { getAllTasksAdmin, getMyTasks, updateTaskStatus, updateTaskStatusApi } from "../../api/TaskApi";
import TaskPopup from "./TaskPopup";
import { showToast } from "../../utils/toastHelper";
import { formatDateFrontend } from "../../api/CustomApi";
import { useSelector } from "react-redux";

const AllTasks = () => {
 const user = useSelector((state) => state?.auth?.user);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
  
const fetchTasks = async () => {
  setLoading(true);
  let res;

  if (user?.role === "admin") {
    // ✅ Admin ko sabke tasks milenge
    res = await getAllTasksAdmin();
  } else {
    // ✅ Employee ko sirf apne tasks milenge
    res = await getMyTasks();
  }

  if (res.success) setTasks(res.data?.data);
  console.log("tasks data", res?.data);

  setLoading(false);
};

useEffect(() => {
  fetchTasks();
}, [user?.role]);
  
    // Add task button click
    const handleAddClick = () => {
      setEditTask(null);
      setPopupOpen(true);
    };
  
    // Edit task button click
    const handleEditClick = (task) => {
      setEditTask(task);
      setPopupOpen(true);
    };
  
     const [openDropdown, setOpenDropdown] = useState(null);

  // const handleStatusChange = async (taskId, status) => {
    
  //   const res = await updateTaskStatus(taskId, status);
  //   if (res.success) {
  //     alert(`Status updated to ${status}`);
  //     setOpenDropdown(null);
  //   }
  // };
    // Mark task completed
    // const handleStatusChange = async (dailyTaskId, taskId,status) => {
    //   const res = await updateTaskStatus(dailyTaskId, taskId,  status);
    //   if (res.success) {
    //     showToast("Task completed!", "success");
    //     fetchTasks();
    //   }
    // };

    const handleStatusChange = async (dailyTaskId, taskId, status) => {

     

  const res = await updateTaskStatusApi(dailyTaskId, taskId, { status });
  if (res.success) {
    showToast("Task updated!", "success");
    setOpenDropdown(null)
    fetchTasks(); // reload fresh data
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return {
        badge: "bg-green-100 text-green-700",
        progress: "bg-green-500",
        text: "text-green-700 font-semibold",
      };
    case "in-progress":
      return {
        badge: "bg-yellow-100 text-yellow-700",
        progress: "bg-yellow-500",
        text: "text-yellow-700 font-semibold",
      };
    case "pending":
    default:
      return {
        badge: "bg-gray-100 text-gray-700",
        progress: "bg-gray-400",
        text: "text-gray-500",
      };
  }
};


  return (
    <div className=" bg-[#F9FAFB] Employee">
      {/* header1 */}
<header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-3 border-b border-[#F3F4F6] bg-white">
  {/* Left Title */}
  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Task</h2>

  {/* Right Actions */}
  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
    {/* Search */}
    <IoSearch className="size-5 text-gray-600 cursor-pointer" />

    {/* Notification */}
    <div className="relative">
      <FaRegBell className="size-5 text-gray-600 cursor-pointer" />
      <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-[#DC2626]"></span>
    </div>

    {/* Button */}
    <button onClick={handleAddClick} className="flex items-center gap-2 px-3 py-2 border RedButt rounded-md">
      <FaPlus /> Add Task
    </button>

    {/* Avatar */}
    <img
      src="https://randomuser.me/api/portraits/men/45.jpg"
      alt="profile"
      className="h-10 w-10 rounded-full"
    />
  </div>
</header>


      {/*haeder2 */}
<div className="flex flex-col w-full lg:flex-row justify-between gap-4 px-5 py-3 border-b border-[#F3F4F6] bg-white font-medium">
  {/* Left Tabs */}
  <div className="flex  items-center gap-2 bg-[#F3F4F6] p-1.5 rounded w-fit ">
    <button className="flex items-center gap-2 text-[#0A0A0A] bg-white px-3 py-1 rounded-md">
      <RxDashboard /> Board
    </button>
    <button className="flex items-center gap-2 px-3 py-1 rounded-md">
      <MdOutlineFormatListBulleted /> List
    </button>
    <button className="flex items-center gap-2 px-3 py-1 rounded-md">
      <AiTwotoneCalendar /> Calendar
    </button>
  </div>

  {/* Right Actions */}
<div className="flex flex-wrap items-center lg:justify-end gap-2 sm:gap-3 text-[#0A0A0A] w-full">
  <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md">
    <LuFilter /> Filter
  </button>
  <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md">
    <TbArrowsSort /> Sort
  </button>

  {/* Select aligned like buttons */}
  <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
    <LiaLayerGroupSolid className="text-gray-600 size-5 mr-2" />
    <select className="outline-none bg-transparent">
      <option value="">Group By</option>
    </select>
  </div>
</div>

</div>



      {/* page */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {tasks.map((item) => {
            const isToday =
      new Date(item?.date).toDateString() === new Date().toDateString();

        return (
        <div
           key={item._id}
        className={`shadow-sm rounded-lg bg-white overflow-hidden ${
          isToday ? "border-1 border-[var(--main-color)]" : "border border-gray-200"
        }`}
      
        >
          {/* Header */}
          <div className="flex justify-between border-b border-gray-200 items-center px-4 py-4">
            <h2 className="font-semibold text-[#111827] text-xl">
              {item?.employee?.firstName} {item?.employee?.lastName}
            </h2>
              <h2 className="font-semibold text-[#111827] text-xl">
              {formatDateFrontend(item?.date,'date')}
            </h2>
          </div>

          {/* Tasks Scrollable Area */}
          <div className="max-h-80 overflow-y-auto">
{item?.tasks?.map((task) => {
  const styles = getStatusStyles(task.status);

  return (
    <div
      key={task._id}
      className="relative p-3 m-4 bg-white rounded-lg border border-gray-200 space-y-3"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
      <div className="flex flex-col">
           <span className="text-xs font-semibold text-[var(--main-color)]">
          {task?.project?.name ? task?.project?.name : task?.Ptitle || "Office Work" }
        </span>
        <span className="text-sm font-semibold text-gray-500">
          {task?.title} 
        </span>
      </div>
          
          {/* Header */}
      

        {/* Dropdown */}
        <div className="relative">
             {/* <span
        className={`text-sm font-medium px-2 py-0.5 rounded ${
          task.priority === "high"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {task.priority}
      </span> */}
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === task._id ? null : task._id)
            }
            className="text-gray-400"
          >
            ⋮
          </button>

          
          {openDropdown === task._id && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {["pending", "in-progress", "completed"].map((status) => (
                <div
                  key={status}
                  onClick={() =>
                    handleStatusChange(item._id, task._id, status)
                  }
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Priority */}
   

      {/* Description */}
      <h3 className="font-semibold text-[#111827] text-md">
        {task.description}
      </h3>

      {/* Progress */}
      <div>
        <div className="flex justify-between mb-1">
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-sm mt-1 ${styles.text}`}>{task.status}</p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className={`h-2 rounded ${styles.progress}`}
            style={{
              width:
                task.status === "completed"
                  ? "100%"
                  : task.status === "in-progress"
                  ? "50%"
                  : "10%",
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-md text-gray-500">
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1">
            <FiCalendar /> {task.startTimeFormatted ? task?.startTimeFormatted :formatDateFrontend(task?.startTime,'time')} - {task.endTimeFormatted ? task?.endTimeFormatted :formatDateFrontend(task?.endTime,'time')}
          </span>
          <span className="flex items-center gap-1">
            <MdAttachFile /> {task?.meetings?.length} {task.remarks || "Meetings"}
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare /> {item.pendingTasks}
          </span>
          <span className="flex items-center gap-1">
            <TbCheckbox /> {item.completedTasks}
          </span>
        </div>
      </div>
    </div>
  );
})}

          </div>

          {/* Add Task */}
          <div onClick={handleAddClick} className="border-t font-medium border-gray-200 px-4 py-5 text-md text-gray-500 cursor-pointer hover:bg-gray-50 flex items-center gap-2">
            <FaPlus className="text-gray-400" />
            <span>Add Task</span>
          </div>
        </div>
)})}
    </div>
   {popupOpen && (
        <TaskPopup
          isEdit={!!editTask}
          data={editTask}
          close={() => { setPopupOpen(false); fetchTasks(); }}
        />
      )}
    </div>
  );
};

export default AllTasks;