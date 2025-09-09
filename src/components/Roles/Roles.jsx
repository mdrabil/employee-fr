import React, { useState, useEffect } from "react";
import RolesPopup from "./RolesPopup";
import Pagination from "../Pagination/Pagination";
import { TbTrash } from "react-icons/tb";
import LoadingButton from "../overlayloading/loadingButton";
import LoadingOverlay from "../overlayloading/LoadingOverlay";
import { deleteRoles, getRoles, updateRoles } from "../../api/Roles";
import { showToast } from "../../utils/toastHelper";
import { usePaginate } from "../Pagination/usePagination";
import { confirmAction } from "../../utils/confirm";
import { FaEdit } from "react-icons/fa";

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [search, setsearch] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [roles, setRoles] = useState([]);


  const fetchRoles = async () => {
    try {
      setLoading(true);
      const result = await getRoles();
      if (result.success) {
        const deptArray = Array.isArray(result.roles?.data) ? result?.roles?.data : [];
        // console.log('deptArray',deptArray)
        setRoles(deptArray);
      } else {
        setRoles([]);
        // showToast(result.message || "Failed to fetch Roles", "error");
      }
    } catch (error) {
      setRoles([]);
      // showToast("Error fetching Roles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);


    const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  } = usePaginate(filteredRoles, 10);
  // Filtered Roles



  

const handleDelete = async (id) => {
  const confirmed = await confirmAction({
    title: "Delete Roles?",
    // text: "This action cannot be undone!",
    icon: "warning",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!confirmed) return; // ❌ User cancelled

  try {
    setDeleteLoading(id);
    const result = await deleteRoles(id);

    if (result.success) {
      showToast("Roles deleted!", "success");
      fetchRoles();
    }
  } catch (error) {
    showToast("Error deleting Roles", "error");
  } finally {
    setDeleteLoading(null);
  }
};


const handleStatusChange = async (deptId, newStatus) => {
  try {
    const confirmed = await confirmAction({
      title: "Change Status?",
      text: `You are about to mark this Roles as ${newStatus ? "Active" : "Inactive"}.`,
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (!confirmed) return;

    const result = await updateRoles(deptId, { status: newStatus });
    if (result.success) {
      showToast(`Roles marked ${newStatus ? "Active" : "Inactive"}`, "success");
      fetchRoles(); // Refresh table
    }
  } catch (err) {
    showToast("Error updating status", "error");
  }
};

 useEffect(() => {
  let filtered = roles;
 
  if (search) {
    filtered = filtered.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  setFilteredRoles(filtered);
}, [roles, search]);

const handleClose = ()=>{
  setPopupOpen(false)
  fetchRoles()
}

  return (
<div className="bg-[var(--bg-color)] min-h-screen relative p-4 md:p-6">
  {loading && <LoadingOverlay />}

  <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
    Roles <span className="text-[var(--text-color)] text-base md:text-2xl">{roles.length}</span>
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
        + Add New Roles
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
                  title="Edit Roles"
                >
                  <FaEdit size={18} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(dept._id)}
                  className="text-[var(--main-color)] hover:text-red-600 transition-colors duration-200 p-1 rounded"
                  title="Delete Roles"
                >
                  <TbTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-[var(--text-color)] text-sm md:text-base">
                No Roles found.
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
    <RolesPopup
      isEdit={!!editData}
      data={editData}
      close={handleClose}
      
    />
  )}
</div>

  );
};

export default Roles;
