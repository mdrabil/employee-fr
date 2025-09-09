// import React, { useState, useEffect } from "react";

// import Select from "react-select";
// import { addTask, updateTaskStatus } from "../../api/TaskApi";
// import { showToast } from "../../utils/toastHelper";
// import { getProjects } from "../../api/ProjectsApi";

// const TaskPopup = ({ isEdit, data, close }) => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false);
  
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//  Ptitle:'',
//     priority: "medium"
//   });



//     useEffect(() => {
//       const fetchProjects = async () => {
//         try {
//           setLoading(true);
//           const result = await getProjects();
//           if (result.success) {
//             // console.log('all project jo ',result?.projectdata)
//             setProjects(result?.projectdata?.data || []);
//           }
//         } catch (error) {
//           setProjects([]);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProjects();
//     }, []);

//   useEffect(() => {
//     if (isEdit && data) {
//       setFormData({
//         title: data.title || "",
//         description: data.description || "",
//         startTime: data.startTime || "",
//         endTime: data.endTime || "",
//         priority: data.priority || "medium"
//       });
//     }
//   }, [data, isEdit]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//       if (!formData.Ptitle && !formData.project) {
//     showToast("Please fill either Client Name or Project!",'warning');
//     return;
//   }

//     try {
//       if (isEdit) {
//         await updateTaskStatus(data.dailyTaskId, data._id, formData);
//         showToast("Task updated!", "success");
//       } else {
//         await addTask(formData,);
//         showToast("Task added!", "success");
//       }
//       close();
//     } catch (err) {
//       showToast("Error!", "error");
//     }
//   };

//     const projectOptions = projects.map(proj => ({
//     value: proj._id,
//     label: proj.name
//   }));
// return (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white w-[95%] max-w-lg p-6 rounded-md shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">
//         {isEdit ? "Edit Task" : "Add Task"}
//       </h2>

//       <form onSubmit={handleSubmit} className="grid gap-3">
//         {/* Title */}
//         <div>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             className="border p-2 rounded w-full"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Client Work */}
//         <div>
//           <input
//             type="text"
//             name="Ptitle"
//             placeholder="Client Name (Work)"
//             className="border p-2 rounded w-full"
//             value={formData.Ptitle}
//             onChange={handleChange}
         
//           />
//         </div>

//         {/* Project Select */}
//         <div>
//           <Select
//             options={projectOptions}
//             value={projectOptions.find(
//               (opt) => opt.value === formData.project
//             )}
//             onChange={(selected) =>
//               setFormData((prev) => ({ ...prev, project: selected.value }))
//             }
//             isSearchable
//             placeholder="Select Project"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <textarea
//             name="description"
//             placeholder="Description"
//             className="border p-2 rounded w-full"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Priority */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="priority"
//               value="low"
//               checked={formData.priority === "low"}
//               onChange={handleChange}
//               className="hidden"
//             />
//             <span
//               className={`px-4 py-2 rounded-lg border ${
//                 formData.priority === "low"
//                   ? "bg-green-500 text-white border-green-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               }`}
//             >
//               Low
//             </span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="priority"
//               value="medium"
//               checked={formData.priority === "medium"}
//               onChange={handleChange}
//               className="hidden"
//             />
//             <span
//               className={`px-4 py-2 rounded-lg border ${
//                 formData.priority === "medium"
//                   ? "bg-yellow-500 text-white border-yellow-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               }`}
//             >
//               Medium
//             </span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="priority"
//               value="high"
//               checked={formData.priority === "high"}
//               onChange={handleChange}
//               className="hidden"
//             />
//             <span
//               className={`px-4 py-2 rounded-lg border ${
//                 formData.priority === "high"
//                   ? "bg-red-500 text-white border-red-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               }`}
//             >
//               High
//             </span>
//           </label>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-2 mt-3">
//           <button
//             type="button"
//             onClick={close}
//             className="px-4 py-2 bg-gray-500 text-white rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-red-500 text-white rounded"
//           >
//             {isEdit ? "Update" : "Add"}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// };

// export default TaskPopup;



import { useSelector } from "react-redux";
import { getEmployees } from "../../api/EmployeeApi"; // ✅ naya API call
import { useEffect, useState } from "react";
import Select from "react-select";
import { addTask, updateTaskStatus } from "../../api/TaskApi";
import { showToast } from "../../utils/toastHelper";
import { getProjects } from "../../api/ProjectsApi";

const TaskPopup = ({ isEdit, data, close,  }) => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
const user = useSelector(state=>state?.auth?.user)
const isAdmin = user?.role==='admin'
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Ptitle: "",
    priority: "medium",
    assignedTo: "", // ✅ naya field
  });

  // fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const result = await getProjects();
        if (result.success) setProjects(result?.projectdata?.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // fetch employees only if admin
  useEffect(() => {
    if (isAdmin) {
      const fetchEmployees = async () => {
        try {
          const result = await getEmployees();
          if (result.success) setEmployees(result?.employeesdata?.data || []);
        } catch {
          setEmployees([]);
        }
      };
      fetchEmployees();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        Ptitle: data.Ptitle || "",
        priority: data.priority || "medium",
        assignedTo: data.assignedTo || "", // ✅ prefill for edit
      });
    }
  }, [data, isEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Ptitle && !formData.project) {
      showToast("Please fill either Client Name or Project!", "warning");
      return;
    }
      if (isAdmin && !formData.assignedTo) {
    showToast("Please assign this task to an employee!", "warning");
    return;
  }

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

  const projectOptions = projects.map((proj) => ({
    value: proj._id,
    label: proj.name,
  }));

  const employeeOptions = employees.map((emp) => ({
    value: emp._id,
    label: emp.firstName,
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3">
             {isAdmin && (
            <Select
              options={employeeOptions}
              value={employeeOptions.find(
                (opt) => opt.value === formData.assignedTo
              )}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, assignedTo: selected.value }))
              }
              isSearchable
              placeholder="Assign To Employee"
            />
          )}
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 rounded w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Client Work */}
          <input
            type="text"
            name="Ptitle"
            placeholder="Client Name (Work)"
            className="border p-2 rounded w-full"
            value={formData.Ptitle}
            onChange={handleChange}
          />

          {/* Project Select */}
          <Select
            options={projectOptions}
            value={projectOptions.find((opt) => opt.value === formData.project)}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, project: selected.value }))
            }
            isSearchable
            placeholder="Select Project"
          />

          {/* Assign To - Only Admin */}
       

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded w-full"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Priority */}
           <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={formData.priority === "low"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-lg border ${
                formData.priority === "low"
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Low
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={formData.priority === "medium"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-lg border ${
                formData.priority === "medium"
                  ? "bg-yellow-500 text-white border-yellow-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              Medium
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={formData.priority === "high"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`px-4 py-2 rounded-lg border ${
                formData.priority === "high"
                  ? "bg-red-500 text-white border-red-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              High
            </span>
          </label>
        </div>
          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default TaskPopup;