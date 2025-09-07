import React, { useState, useEffect } from "react";
import { getDepartments } from "../../api/Department";
import { getRoles } from "../../api/Roles";
import { MdClose } from "react-icons/md";
import { confirmAction } from "../../utils/confirm";
import { createEmployees, updateEmployee } from "../../api/EmployeeApi";
import { showToast } from "../../utils/toastHelper";

const EmployeePopup = ({ isEdit, data, close }) => {
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Single state for all fields
  const [formData, setFormData] = useState({
    employeeId: data?.employeeId || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phone: data?.phone || "",
    dob: data?.dob?.split("T")[0] || "",
    gender: data?.gender || "male",
    designation: data?.designation || "",
    workLocation: data?.workLocation || "",
    status: data?.status || true,
    joiningDate: data?.joiningDate?.split("T")[0] || "",
    role: data?.role?._id || "",
    department: data?.department?._id || "",
    salary: data?.salary || { base: "", hra: "", bonus: "", deductions: "", currency: "INR" },
    bankDetails: data?.bankDetails || { accountHolderName: "", accountNumber: "", ifscCode: "", bankName: "", branch: "" },
    emergencyContact: data?.emergencyContact || { name: "", relation: "", phone: "" },
    profileImage: data?.profileImage || "",
    documents: data?.documents || [],
  });

  const [profilePreview, setProfilePreview] = useState(data?.profileImage || "");

  // ✅ Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Nested object handler (for salary, bankDetails, emergencyContact)
  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  // ✅ Fetch Roles & Departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResult = await getDepartments();
        const roleResult = await getRoles();
console.log('department',deptResult)
        if (deptResult?.success) setDepartments(deptResult?.department?.data || []);
        if (roleResult?.success) setRoles(roleResult?.roles?.data || []);
      } catch (error) {
        console.error("Error fetching roles or departments:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();

  Object.keys(formData).forEach((key) => {
    if (["salary", "bankDetails", "emergencyContact"].includes(key)) {
      fd.append(key, JSON.stringify(formData[key]));
    } else if (key === "documents") {
      formData.documents.forEach((doc, i) => {
        if (doc.file) {
          fd.append(`documents[${i}][type]`, doc.type);
          fd.append(`documents[${i}][number]`, doc.number);
          fd.append(`documents[${i}][file]`, doc.file);
        }
      });
    } else if (key === "profileImage" && formData.profileImage instanceof File) {
      fd.append("profileImage", formData.profileImage); // 👈 multer catch karega
    } else {
      fd.append(key, formData[key]);
      fd.append("joiningDate",  new Date());

    }
  });

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
      result = await updateEmployee(data._id, fd);
    } else {
      result = await createEmployees(fd);
    }

    if (result.success) {
      showToast(
        isEdit ? "Employee updated" : "Employee created successfully!",
        "success"
      );
      close();
    }
  } catch (error) {
    showToast("Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white w-[95%] lg:w-full max-w-5xl p-6 py-3 relative max-h-[95vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl text-[#212529] font-semibold">
            Employee Details <span className="text-(--main-color)">- {formData.employeeId}</span>
          </h2>
          <button onClick={close} className="text-gray-600 hover:text-red-500">
            <MdClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First & Last Name */}
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-3 rounded-md w-full" />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-3 rounded-md w-full" />

          {/* Email & Phone */}
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded-md w-full" />
          <input type="text" name="phone" value={formData.phone} 
            onChange={(e) => {
    const value = e.target.value;
    // ✅ Only digits and max 10
    if (/^\d{0,10}$/.test(value)) {
      handleChange(e);
    }
  }}
           placeholder="Phone" className="border p-3 rounded-md w-full" />

          {/* DOB & Gender */}
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-3 rounded-md w-full" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-3 rounded-md w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Role & Department */}
          <select name="role" value={formData.role} onChange={handleChange} className="border p-3 rounded-md w-full">
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
          <select name="department" value={formData.department} onChange={handleChange} className="border p-3 rounded-md w-full">
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Profile Image */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium">Profile Image</label>
            {profilePreview && <img src={profilePreview} alt="Preview" className="w-28 h-28 object-cover rounded mb-2 border" />}
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
                  setProfilePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="border p-2 w-full rounded-md"
            /> */}
            <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profileImage: e.target.files[0], // 👈 File object set hoga
      }));
    }
  }}
/>

          </div>

          {/* Salary */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium">Salary</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {["base", "hra", "bonus", "deductions", "currency"].map((field) => (
                <input
                  key={field}
                  type={field === "currency" ? "text" : "number"}
                  name={field}
                  placeholder={field}
                  value={formData.salary[field]}
                  onChange={(e) => handleNestedChange(e, "salary")}
                  className="border p-2 rounded"
                />
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium">Bank Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["accountHolderName", "accountNumber", "ifscCode", "bankName", "branch"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={formData.bankDetails[field]}
                  onChange={(e) => handleNestedChange(e, "bankDetails")}
                  className="border p-2 rounded"
                />
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium">Emergency Contact</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {["name", "relation", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field}
                  value={formData.emergencyContact[field]}
                  onChange={(e) => handleNestedChange(e, "emergencyContact")}
                  className="border p-2 rounded"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-10 w-full">
            <button type="button" onClick={close} className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePopup;
