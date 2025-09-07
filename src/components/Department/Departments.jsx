import React, { useState, useEffect } from "react";
import DepartmentPopup from "./DepartmentPopup";
import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";
import { deleteDepartment, getDepartments, updateDepartment } from "../../api/Department";
import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit } from "react-icons/fa";

const Departments = () => {
  const [loading, setLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [departments, setDepartments] = useState([]);


  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const result = await getDepartments();
      if (result.success) {
        const deptArray = Array.isArray(result.department?.data) ? result?.department?.data : [];
        setDepartments(deptArray);
      } else {
        setDepartments([]);
        showToast(result.message || "Failed to fetch departments", "error");
      }
    } catch (error) {
      setDepartments([]);
      showToast("Error fetching departments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredDepartments, 10);
  // Filtered Departments



  

const handleDelete = async (id) => {
  const confirmed = await confirmAction({
    title: "Delete Department?",
    // text: "This action cannot be undone!",
    icon: "warning",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!confirmed) return; // ❌ User cancelled

  try {
    setDeleteLoading(id);
    const result = await deleteDepartment(id);

    if (result.success) {
      showToast("Department deleted!", "success");
      fetchDepartments();
    }
  } catch (error) {
    showToast("Error deleting department", "error");
  } finally {
    setDeleteLoading(null);
  }
};


const handleStatusChange = async (deptId, newStatus) => {
  try {
    const confirmed = await confirmAction({
      title: "Change Status?",
      text: `You are about to mark this department as ${newStatus ? "Active" : "Inactive"}.`,
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (!confirmed) return;

    const result = await updateDepartment(deptId, { status: newStatus });
    if (result.success) {
      showToast(`Department marked ${newStatus ? "Active" : "Inactive"}`, "success");
      fetchDepartments(); // Refresh table
    }
  } catch (err) {
    showToast("Error updating status", "error");
  }
};

 useEffect(() => {
  let filtered = departments;
 
  if (search) {
    filtered = filtered.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  setFilteredDepartments(filtered);
}, [departments, search]);

const handleClose = ()=>{
  setPopupOpen(false)
  fetchDepartments()
}

  return (
<div className="bg-[var(--bg-color)] min-h-screen relative p-4 md:p-6">
  {loading && <LoadingOverlay />}

  <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
    Departments <span className="text-[var(--text-color)] text-base md:text-lg">{departments.length}</span>
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
        + Add New Department
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse">
        <thead>
          <tr className="bg-[var(--secondary-bg-color)] text-left">
            <th className="p-2 text-sm md:text-base">Name</th>
            <th className="p-2 text-sm md:text-base">Description</th>
            <th className="p-2 text-sm md:text-base">Status</th>
            <th className="p-2 text-sm md:text-base text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((dept) => (
            <tr
              key={dept._id}
              className="border-b border-gray-200 hover:bg-[var(--bg-color)] transition"
            >
              <td className="p-2 text-sm md:text-base">{dept.name}</td>
              <td className="p-2 text-sm md:text-base">{dept.description}</td>
              <td className="p-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={dept.status}
                    onChange={(e) => handleStatusChange(dept._id, e.target.checked)}
                  />
                </label>
              </td>
              <td className="p-2 flex justify-end items-center gap-2 md:gap-3">
                {/* Edit */}
                <button
                  onClick={() => {
                    setEditData(dept);
                    setPopupOpen(true);
                  }}
                  className="text-[var(--text-color)] hover:text-blue-500 transition-colors duration-200 p-1 rounded"
                  title="Edit Department"
                >
                  <FaEdit size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(dept._id)}
                  className="text-[var(--main-color)] hover:text-red-600 transition-colors duration-200 p-1 rounded"
                  title="Delete Department"
                >
                  <TbTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-[var(--text-color)] text-sm md:text-base">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
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

  {/* Popup */}
  {popupOpen && (
    <DepartmentPopup
      isEdit={!!editData}
      data={editData}
      close={handleClose}
      
    />
  )}
</div>

  );
};

export default Departments;
