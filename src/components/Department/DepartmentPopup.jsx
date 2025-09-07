import React, { useState, useEffect } from "react";
import { createDepartment, updateDepartment } from "../../api/Department";
import { showToast } from "../../utils/toastHelper";
import { confirmAction } from "../../utils/confirm";

const DepartmentPopup = ({ isEdit, data, close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true); // ✅ status state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setStatus(data.status || false); // ✅ populate status
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await confirmAction({
      title: "Are You Sure?",
      text: "Do you want to proceed?",
      icon: "success",
      confirmButtonText: isEdit ? "Update" : "Create",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return; // ❌ User cancelled

    try {
      setLoading(true);
      let result;
      if (isEdit) {
        result = await updateDepartment(data._id, { name, description, status });
      } else {
        result = await createDepartment({ name, description, status });
      }

      if (result.success) {
        showToast(isEdit ? "Department updated" : "Department created successfully!", "success");
    
        close();
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-5 rounded w-[90%] max-w-md">
        <h3 className="text-lg font-bold mb-3">{isEdit ? "Edit Department" : "Add Department"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />

          {/* ✅ Status toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              className="toggle-input"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <span className="text-gray-700 select-none">Active</span>
          </label>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={close}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 bg-[var(--main-color)] text-white rounded"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentPopup;
