import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../redux/LoadingSlice";
import { GetAllRoles, CreateRole, UpdateRoles } from "../api/RolesApi";

const permissionsList = ["create", "read", "update", "delete"];
// Future me backend se modules fetch karne ka option bhi ho sakta hai
const modules = ["medicine", "patient", "treatment", "doctor"];

export default function RolePermissions() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const data = await GetAllRoles();
      const filtered = data.filter((role) => role.name.toLowerCase() !== "admin");
      setRoles(filtered || []);
    } catch {
      toast.error("Failed to fetch roles");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEdit = (role) => {
    setIsCreateMode(false);
    setSelectedRole({
      ...role,
      permissions: modules.reduce((acc, mod) => {
        acc[mod] = role.permissions?.[mod] || [];
        return acc;
      }, {}),
    });
    setModalOpen(true);
  };

const handleCheckboxChange = (module, perm) => {
  setSelectedRole((prev) => {
    const updatedPermissions = { ...prev.permissions }; // clone permissions object
    const current = updatedPermissions[module] ? [...updatedPermissions[module]] : [];

    if (current.includes(perm)) {
      updatedPermissions[module] = current.filter((p) => p !== perm);
    } else {
      updatedPermissions[module] = [...current, perm];
    }

    return {
      ...prev,
      permissions: updatedPermissions, // new reference
    };
  });
};


  const handleCreate = () => {

    setIsCreateMode(true);
    setSelectedRole({
      name: "",
      permissions: modules.reduce((acc, mod) => {
        acc[mod] = [];
        return acc;
      }, {}),
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedRole.name?.trim()) {
      toast.error("Role name is required");
      return;
    }
    try {
      if (isCreateMode) {
        await CreateRole(selectedRole);
        toast.success("Role created successfully");
      } else {
        await UpdateRoles(selectedRole._id, selectedRole);
        toast.success("Role updated successfully");
      }
      setModalOpen(false);
      fetchData();
    } catch {
      toast.error("Failed to save role");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Role Permissions</h1>
        {user?.user?.role?.name === "admin" && (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={handleCreate}
          >
            + Create Role
          </button>
        )}
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Role</th>
              {modules.map((m) => (
                <th key={m} className="py-2 px-4 text-left capitalize">{m}</th>
              ))}
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id} className="border-b">
                <td className="py-2 px-4 font-medium">{role.name}</td>
                {modules.map((m) => (
                  <td key={m} className="py-2 px-4">
                    {role.permissions?.[m]?.length
                      ? role.permissions[m].join(", ")
                      : "-"}
                  </td>
                ))}
                <td className="py-2 px-4">
                  {user?.user?.role?.name === "admin" && (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(role)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td
                  colSpan={modules.length + 2}
                  className="text-center py-4 text-gray-500"
                >
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {isCreateMode ? "Create New Role" : "Edit Role"}
            </h2>

            {/* Role Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Role Name</label>
              <input
                type="text"
                name="name"
                value={selectedRole.name}
                onChange={(e) =>
                  setSelectedRole((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border rounded px-2 py-1"
                placeholder="Enter role name"
                disabled={!isCreateMode && selectedRole.name.toLowerCase() === "admin"}
              />
            </div>

            {/* Permissions */}
            {modules.map((module) => (
              <div key={module} className="mb-3">
                <p className="font-semibold capitalize">{module}</p>
                <div className="flex flex-wrap gap-3 mt-1">
                  {permissionsList.map((perm) => (
                    <label key={perm} className="flex items-center gap-1">
                      <input
                        type="checkbox"

                        checked={selectedRole.permissions[module]?.includes(perm)}
                        onChange={() => handleCheckboxChange(module, perm)}
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
