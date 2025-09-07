import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { store } from "../redux/store";
import { setLoading } from "../redux/LoadingSlice";
import { CreateUsers, DeleteUsers, GetAllUsers, GetSingleUsers } from "../api/UsersApi";
import { GetAllRoles } from "../api/RolesApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// const allroles = [
//   { _id: 123, role: "rider" },
//   { _id: 124, role: "customer" },
// ];

const Users = () => {
  const { id } = useParams();
  const [usersdata, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
const [allroles,setRoles] = useState([])
const [showAddModal, setShowAddModal] = useState(false);
const [newUserData, setNewUserData] = useState({ name: "", email: "", role: "" });

  const fetchData = async () => {
    store.dispatch(setLoading(true));
    try {
      const data = id ? await GetSingleUsers(id) : await GetAllUsers();

      const filtered = data.filter((role) => role?.role?.name.toLowerCase() !== "admin");
      setAllUsers(Array.isArray(filtered) ? filtered : [filtered]);
    } catch (err) {
      console.error(err);
    } finally {
      store.dispatch(setLoading(false));
    }
  };

    const user = useSelector((state) => state?.auth?.user);
    const dispatch = useDispatch();
  
    // Fetch Roles
    const fetchDataRole = async () => {
      dispatch(setLoading(true));
      try {
        const data = await GetAllRoles();
        // Admin role filter out
        const filtered = data.filter((role) => role.name.toLowerCase() !== "admin");
        setRoles(filtered || []);
      } catch {
        toast.error("Failed to fetch roles");
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    useEffect(() => {
      fetchDataRole();
    }, []);


  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditClick = (user) => {
    setEditData({
      ...user,
      role: typeof user.role === "object" ? user.role._id : user.role, // Store role id
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

const handleSave = async (formData) => {
  // 1️⃣ Basic validation
  if (!formData?.name?.trim()) {
    alert("Name is required");
    return;
  }
  if (!formData?.email?.trim()) {
    alert("Email is required");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email address");
    return;
  }
  if (!formData?.role) {
    alert("Role is required");
    return;
  }

  try {
    store.dispatch(setLoading(true)); // optional loader

    // 2️⃣ Send to backend (role should be ID, not name)
    const payload = {
      ...formData,
      role: typeof formData.role === "object" ? formData.role._id : formData.role
    };

    console.log("Saving to backend:", payload);

    const res = await UpdateUsers(formData._id, payload);

    // 3️⃣ Handle success
    alert("User updated successfully");
    setShowModal(false);
    fetchData(); // refresh user list

  } catch (error) {
    console.error("Error updating user:", error);
    alert(error?.response?.data?.message || "Failed to update user. Please try again.");
  } finally {
    store.dispatch(setLoading(false)); // stop loader
  }
};

const handleDeleteClick = async (id) => {
  if (!id) {
    toast?.error("User ID not found!");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return; // agar user cancel kare to yaha ruk jao

  try {
    const res = await DeleteUsers(id);

    if (res) {
      toast.success("User deleted successfully!");
      // yaha pe list refresh kar sakte ho
    } else {
      toast.error(res?.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error(error?.message || "Something went wrong while deleting user");
  }
};


const handleAddChange = (e) => {
  const { name, value } = e.target;
  setNewUserData((prev) => ({ ...prev, [name]: value }));
};

const handleAddSave = async () => {
  if (!newUserData.name.trim()) {
    toast.error("Name is required");
    return;
  }
  if (!newUserData.email.trim()) {
    toast.error("Email is required");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newUserData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!newUserData.role) {
    toast.error("Role is required");
    return;
  }

  try {
    store.dispatch(setLoading(true));
    const res = await CreateUsers(newUserData); // <-- yeh API call banani hogi
    if (res?.success) {
      toast.success("User added successfully!");
      setShowAddModal(false);
      setNewUserData({ name: "", email: "", role: "" });
      fetchData();
    } else {
      toast.error(res?.message || "Failed to add user");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    store.dispatch(setLoading(false));
  }
};


  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4 md:space-y-6">
      {/* Top Info Boxes */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 md:p-4 rounded shadow w-full sm:w-auto">
            <p className="font-bold text-sm md:text-lg">Total Users</p>
            <p className="text-xl md:text-2xl">{usersdata.length}</p>
          </div>
        </div>

       <button
  onClick={() => setShowAddModal(true)}
  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow text-sm md:text-base"
>
  Add New User
</button>

      </div>

      {/* Search */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 md:p-3 border rounded shadow text-sm md:text-base"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="table-responsive">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Name</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Email</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Role</th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">
                  Permissions
                </th>
                <th className="px-2 md:px-4 py-2 text-xs md:text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {usersdata.length > 0 ? (
                usersdata.map((user) => (
                  <tr key={user._id}>
                    <td className="px-2 md:px-4 py-2">{user?.name}</td>
                    <td className="px-2 md:px-4 py-2">{user?.email}</td>
                    <td className="px-2 md:px-4 py-2">
                      {typeof user?.role === "object"
                        ? user?.role?.name
                        : user?.role}
                    </td>
                    <td className="px-2 md:px-4 py-2 text-xs md:text-sm text-center">
                      {Array.isArray(user?.role?.permissions)
                        ? user?.role?.permissions.join(", ")
                        : "—"}
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      <div className="flex flex-col sm:flex-row gap-1 md:gap-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-600 text-xs md:text-sm"
                        >
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                         onClick={() => handleDeleteClick(user?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-400 text-sm md:text-base"
                  >
                    No user data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">Edit Users</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData?.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={editData?.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={editData?.role || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm md:text-base"
                >
                  <option value="">Select Role</option>
                  {allroles.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-base font-medium mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editData?.status || false}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full p-2 border rounded text-sm md:text-base"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-6">
              <button
                onClick={() => handleSave(editData)}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm md:text-base"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    
{showAddModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <h2 className="text-lg md:text-xl font-bold mb-4">Add New User</h2>
      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={handleAddChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={newUserData.email}
            onChange={handleAddChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          />
        </div>
        <div>
          <label className="block text-sm md:text-base font-medium mb-1">
            Role
          </label>
          <select
            name="role"
            value={newUserData.role}
            onChange={handleAddChange}
            className="w-full p-2 border rounded text-sm md:text-base"
          >
            <option value="">Select Role</option>
            {allroles.map((r) => (
              <option key={r._id} value={r._id}>
                {r?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-6">
        <button
          onClick={handleAddSave}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm md:text-base"
        >
          Save
        </button>
        <button
          onClick={() => {
            setShowAddModal(false);
            setNewUserData({ name: "", email: "", role: "" });
          }}
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-sm md:text-base"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Users;
