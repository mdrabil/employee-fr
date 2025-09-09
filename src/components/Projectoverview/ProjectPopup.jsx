import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getEmployees } from "../../api/EmployeeApi";
import { confirmAction } from "../../utils/confirm";
import { createProjects, updateProjects } from "../../api/ProjectsApi";
import { showToast } from "../../utils/toastHelper";

const ProjectPopup = ({ isEdit, data, close }) => {
  const [open, setOpen] = useState(true);
  const [allemployees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    files: null,
    employees: [], // array of selected employee objects
    lead: [],      // array of selected lead objects
    startDate: "",
    deadline: "",
    description: "",
    client: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const result = await getEmployees();
        if (result.success) {
          const empArray = Array.isArray(result.employeesdata?.data)
            ? result.employeesdata.data
            : [];
          setEmployees(empArray);
        }
      } catch (error) {
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Prefill if edit
  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data.name || "",
        category: "",
        priority: data.priority || "",
        files: null,
        // employees: data.employees?.slice(0, 10) || [],
      employees: data.employees?.map(emp => emp._id) || [],  // only ids
      lead: data.lead?.slice(0, 10) || [], 
        startDate: data.startDate ? data.startDate.split("T")[0] : "",
        deadline: data.deadline ? data.deadline.split("T")[0] : "",
        description: data.description || "",
        client: {
          name: data.client?.name || "",
          email: data.client?.email || "",
          phone: data.client?.phone || ""
        },
      });
    }
  }, [isEdit, data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") setFormData(prev => ({ ...prev, files }));
    else if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        client: { ...prev.client, [key]: value }
      }));
    } else setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


     const payload = {
    ...formData,
    // no need to map, ids are already stored
  };

    const confirmed = await confirmAction({
      title: "Are You Sure?",
      text: "Do you want to proceed?",
      icon: "success",
      confirmButtonText: isEdit ? "Update" : "Create",
      cancelButtonText: "Cancel",
    });

    if (!confirmed) return; // ❌ User cancelled
// console.log('payload',payload)
    try {
      setLoading(true);
      let result;
      if (isEdit) {
        result = await updateProjects(data._id,  payload);
      } else {
        result = await createProjects( payload );
      }

      if (result.success) {
        showToast(isEdit ? "Project  updated" : "Project created successfully!", "success");
    
        close();
      }
    } catch (error) {
      // showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };





const employeeOptions = allemployees.map(emp => ({
  value: emp._id,
  label: `${emp.firstName} ${emp.lastName} (${emp.role?.name})`, // search ke liye string
  empObj: emp, // original object for custom rendering
}));

// Custom format label for color
const formatOptionLabel = ({ label, empObj }) => (
  <div className="flex justify-between">
    <span style={{ color: '#16A34A' }}>{empObj.firstName} {empObj.lastName}</span>
    <span style={{ color: 'var(--main-color)',fontWeight:'bold' }}>{empObj.role?.name}</span>
  </div>
);

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white w-[95%] lg:w-full max-w-4xl p-6 py-3 relative max-h-[95vh] overflow-y-auto rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#212529] mb-4">
              {isEdit ? "Edit Project" : "Create Project"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Title */}
              <div className="col-span-2 border border-[#DEE2E6] rounded-md p-3">
                <input
                  type="text"
                  name="title"
                  className="w-full outline-none"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Priority */}
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">
                  Project Priority
                </label>
                <select
                  name="priority"
                  className="w-full outline-none p-1"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Files */}
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Project Files</label>
                <input
                  type="file"
                  name="files"
                  multiple
                  className="w-full cursor-pointer"
                  onChange={handleChange}
                />
              </div>

              {/* Employees MultiSelect */}

              
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Employees</label>
{/* <Select
  isMulti
  options={employeeOptions}
  value={employeeOptions.filter(opt =>
    formData.employees.some(emp => emp._id === opt.value)
  )}
  onChange={(selected) =>
    setFormData(prev => ({
      ...prev,
      employees: selected.map(s => employees.find(emp => emp._id === s.value))
    }))
  }
  formatOptionLabel={formatOptionLabel}
  isSearchable
/> */}

{/* Employees MultiSelect */}
<Select
  isMulti
  options={employeeOptions}
  value={employeeOptions.filter(opt =>
    formData.employees.includes(opt.value) // only _id
  )}
  onChange={(selected) =>
    setFormData(prev => ({
      ...prev,
      employees: selected.map(s => s.value) // store only _id
    }))
  }
  formatOptionLabel={formatOptionLabel}
  isSearchable
/>
              </div>

              {/* Lead MultiSelect */}
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Project Lead</label>

<Select
  isMulti
  options={employeeOptions}
  value={employeeOptions.filter(opt =>
    formData.lead?.includes(opt.value)
  )}
  onChange={(selected) =>
    setFormData(prev => ({
      ...prev,
      lead: selected ? selected.map(s => s.value) : [] // null safe
    }))
  }
  formatOptionLabel={formatOptionLabel}
  isSearchable
/>

              </div>

              {/* Dates */}
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full outline-none"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <label className="text-sm font-medium text-[#212529A6] mb-1 block">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  className="w-full outline-none"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              {/* description */}
              <div className="col-span-2 border-[#DEE2E6] border rounded-md p-3">
              <div className="col-span-2 border-[#DEE2E6] border rounded-md p-3">
  <textarea
    name="description"
    placeholder="Project description (You can write points here)"
    className="w-full outline-none min-h-[120px]"
    value={formData.description}
    onChange={handleChange}
  />
</div>

              </div>

              {/* Client Info */}
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <input
                  type="text"
                  name="client.name"
                  placeholder="Client Name"
                  className="w-full outline-none"
                  value={formData.client.name}
                  onChange={handleChange}
                />
              </div>
              <div className="border col-span-2 md:col-span-1 border-[#DEE2E6] rounded-md p-3">
                <input
                  type="email"
                  name="client.email"
                  placeholder="Client Email"
                  className="w-full outline-none"
                  value={formData.client.email}
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
                onClick={handleSubmit}
                type="submit"
                className="px-4 py-2 bg-[#DC3545] text-white rounded-md"
              >
                {isEdit ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPopup;
