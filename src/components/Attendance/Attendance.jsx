import React, { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";

import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit } from "react-icons/fa";
import { getAllAttendance } from "../../api/Attanance";
import { formatDate } from "../../api/CustomApi";

const Attendances = () => {
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
      const result = await getAllAttendance();
      if (result.success) {
        const deptArray = Array.isArray(result?.data?.data) ? result?.data?.data : [];
        console.log('attned',deptArray)
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
  const confirmed = await confirmAction({
    title: "Delete Attendance?",
    // text: "This action cannot be undone!",
    icon: "warning",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!confirmed) return; // ❌ User cancelled

  try {
    setDeleteLoading(id);
    const result = await deleteAttendance(id);

    if (result.success) {
      showToast("Attendance deleted!", "success");
      fetchAttendance();
    }
  } catch (error) {
    showToast("Error deleting Attendance", "error");
  } finally {
    setDeleteLoading(null);
  }
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
    <div className="bg-[var(--bg-color)] min-h-screen relative p-4 md:p-6">
      {loading && <LoadingOverlay />}
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
        Attendance Admin <span className="text-[var(--text-color)] text-base md:text-lg">({attendance.length})</span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Present</p>
          <p className="text-lg font-bold text-green-600">250</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Late Login</p>
          <p className="text-lg font-bold text-red-600">45</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Uninformed</p>
          <p className="text-lg font-bold text-red-600">15</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Permission</p>
          <p className="text-lg font-bold text-green-600">3</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Absent</p>
          <p className="text-lg font-bold text-red-600">12</p>
        </div>
      </div>

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
          onClick={() => alert("Open Add Attendance Modal")}
          className="px-3 py-2 bg-[var(--main-color)] text-white rounded w-full sm:w-auto"
        >
          + Add New Attendance
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-[var(--secondary-bg-color)] text-left">
              <th className="p-2 text-sm md:text-base">Employee</th>
              <th className="p-2 text-sm md:text-base">Status</th>
              <th className="p-2 text-sm md:text-base">Check In</th>
              <th className="p-2 text-sm md:text-base">Check Out</th>
              <th className="p-2 text-sm md:text-base">Break</th>
              <th className="p-2 text-sm md:text-base">Late</th>
              <th className="p-2 text-sm md:text-base">Production Hours</th>
              <th className="p-2 text-sm md:text-base text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((att) => (
              <tr key={att._id} className="border-b border-gray-200 hover:bg-[var(--bg-color)] transition">
                <td className="p-2">{att.employee}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white ${att.status === "present" ? "bg-green-500" : "bg-red-500"}`}>
                    {att.status}
                  </span>
                </td>
                <td className="p-2">{formatDate(att.checkIn,'time')}</td>
                <td className="p-2">{formatDate(att.checkOut,'time')}</td>
                <td className="p-2">{att.totalBreakMinutes || 0} Min</td>
                <td className="p-2">{att.lateByMinutes || 0} Min</td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded text-white bg-green-500">{att.totalHours?.toFixed(2) || 0} Hrs</span>
                </td>
                <td className="p-2 flex justify-end items-center gap-2 md:gap-3">
                  <button
                    onClick={() => alert("Edit attendance")}
                    className="text-[var(--text-color)] hover:text-blue-500 transition-colors duration-200 p-1 rounded"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(att._id)}
                    className="text-[var(--main-color)] hover:text-red-600 transition-colors duration-200 p-1 rounded"
                  >
                    <TbTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && !loading && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-[var(--text-color)] text-sm md:text-base">
                  No Attendance found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
    </div>
  );
};
export default Attendances;
