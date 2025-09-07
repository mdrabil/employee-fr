import React, { useState, useEffect } from "react";

import Select from "react-select";
import { addTask, updateTaskStatus } from "../../api/TaskApi";
import { showToast } from "../../utils/toastHelper";
import { getProjects } from "../../api/ProjectsApi";

const TaskPopup = ({ isEdit, data, close }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    priority: "medium"
  });



    useEffect(() => {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const result = await getProjects();
          if (result.success) {
            console.log('all project jo ',result?.projectdata)
            setProjects(result?.projectdata?.data || []);
          }
        } catch (error) {
          setProjects([]);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }, []);

  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        startTime: data.startTime || "",
        endTime: data.endTime || "",
        priority: data.priority || "medium"
      });
    }
  }, [data, isEdit]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTaskStatus(data.dailyTaskId, data._id, formData);
        showToast("Task updated!", "success");
      } else {
        await addTask(formData);
        showToast("Task added!", "success");
      }
      close();
    } catch (err) {
      showToast("Error!", "error");
    }
  };

    const projectOptions = projects.map(proj => ({
    value: proj._id,
    label: proj.name
  }));
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{isEdit?"Edit Task":"Add Task"}</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
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
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
          />
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="border p-2 rounded"/>
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="border p-2 rounded"/>
          <select name="priority" value={formData.priority} onChange={handleChange} className="border p-2 rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={close} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">{isEdit?"Update":"Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskPopup;
