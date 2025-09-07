import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getProjects } from "../../api/ProjectsApi"; // 👈 tumhe api create karni hogi
import { getEmployees } from "../../api/EmployeeApi"; // optional agar employee bhi chahiye
import { confirmAction } from "../../utils/confirm";
import { showToast } from "../../utils/toastHelper";
import { createTask, updateTask } from "../../api/TasksApi"; // 👈 tumhe ye bhi banana hoga

const TaskPopup = ({ isEdit, data, close }) => {
  const [open, setOpen] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    project: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    durationHours: "",
    status: "pending",
    priority: "medium",
    remarks: "",
    tags: []
  });

  // Fetch projects for dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await getProjects();
        if (result.success) {
          setProjects(result.projects || []);
        }
      } catch (error) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Prefill if edit
  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        project: data.project?._id || "",
        title: data.title || "",
        description: data.description || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        durationHours: data.durationHours || "",
        status: data.status || "pending",
        priority: data.priority || "medium",
        remarks: data.remarks || "",
        tags: data.tags || []
      });
    }
  }, [isEdit, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    const confirmed = await confirmAction({
      title: "Are You Sure?",
      text: "Do you want to proceed?",
      icon: "success",
      confirmButtonText: isEdit ? "Update" : "Create",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return;

    try {
      setLoading(true);
      let result;
      if (isEdit) {
        result = await updateTask(data._id, payload);
      } else {
        result = await createTask(payload);
      }

      if (result.success) {
        showToast(isEdit ? "Task updated!" : "Task created successfully!", "success");
        close();
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // Project options
  const projectOptions = projects.map(proj => ({
    value: proj._id,
    label: proj.name
  }));

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white w-[95%] lg:w-full max-w-3xl p-6 py-3 relative max-h-[95vh] overflow-y-auto rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#212529] mb-4">
              {isEdit ? "Edit Task" : "Create Task"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Project */}
              <div className="col-span-2 border border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Project</label>
                <Select
                  options={projectOptions}
                  value={projectOptions.find(opt => opt.value === formData.project)}
                  onChange={(selected) =>
                    setFormData(prev => ({ ...prev, project: selected.value }))
                  }
                  isSearchable
                />
              </div>

              {/* Title */}
              <div className="col-span-2 border border-[#DEE2E6] rounded-md p-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  className="w-full outline-none"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Start / End Time */}
              <div className="border border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  className="w-full outline-none"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="border border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  className="w-full outline-none"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>

              {/* Duration */}
              <div className="border border-[#DEE2E6] rounded-md p-3">
                <input
                  type="number"
                  name="durationHours"
                  placeholder="Duration (hours)"
                  className="w-full outline-none"
                  value={formData.durationHours}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="border border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm">Status</label>
                <select
                  name="status"
                  className="w-full outline-none"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority */}
              <div className="border border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm">Priority</label>
                <select
                  name="priority"
                  className="w-full outline-none"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2 border border-[#DEE2E6] rounded-md p-3">
                <textarea
                  name="description"
                  placeholder="Task description"
                  className="w-full outline-none min-h-[80px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Remarks */}
              <div className="col-span-2 border border-[#DEE2E6] rounded-md p-3">
                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  className="w-full outline-none min-h-[60px]"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </form>

            <div className="flex justify-start mt-6 gap-3">
              <button
                onClick={() => { setOpen(false); close(); }}
                type="button"
                className="px-4 py-2 bg-[#6C757D] text-white rounded-md"
              >
                Cancel
              </button>
              <button
                // onClick={handleSubmit}
                type="submit"
                className="px-4 py-2 bg-[#DC3545] text-white rounded-md"
              >
                {isEdit ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPopup;
