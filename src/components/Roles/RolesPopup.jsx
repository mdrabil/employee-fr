import React, { useState, useEffect } from "react";
import { createRoles, updateRoles } from "../../api/Roles";
import { showToast } from "../../utils/toastHelper";
import { confirmAction } from "../../utils/confirm";
import { getModule } from "../../api/Module";

const RolesPopup = ({ isEdit, data, close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const [permissions, setPermissions] = useState([]); // ✅ final data

  // ✅ Fetch modules
  const fetchModules = async () => {
    try {
      setLoading(true);
      const result = await getModule();
      if (result.success) {
        const modules = Array.isArray(result.module?.module) ? result.module?.module : [];

        // console.log('module',result?.module?.module)
        // agar edit hai to existing permissions merge karo
        if (isEdit && data?.permissions) {

        
const merged = modules.map((m) => {
  const found = data.permissions.find(
    (p) => p.module._id === m._id
  );
  return {
    module: m._id,
    moduleName: m.name,
    canCreate: found?.canCreate || false,
    canRead: found?.canRead || false,
    canUpdate: found?.canUpdate || false,
    canDelete: found?.canDelete || false,
  };
});
setPermissions(merged);


          setPermissions(merged);
        } else {
          // new role → sab false
          setPermissions(
            modules.map((m) => ({
              module: m._id,
              moduleName: m.name,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            }))
          );
        }
      } else {
        setPermissions([]);
        showToast(result.message || "No modules found", "error");
      }
    } catch (error) {
      setPermissions([]);
      showToast("Error fetching Modules", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
    if (data) {
      console.log('roles ka data',data?.permissions)
      setName(data.name || "");
      setDescription(data.description || "");
      setStatus(data.status || false);
    }
  }, [data]);

  // ✅ single change
  const handlePermissionChange = (moduleId, key, value) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.module === moduleId ? { ...perm, [key]: value } : perm
      )
    );
  };

  // ✅ select all
  const handleSelectAll = (moduleId, checked) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.module === moduleId
          ? {
              ...perm,
              canCreate: checked,
              canRead: checked,
              canUpdate: checked,
              canDelete: checked,
            }
          : perm
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const payload = { name, description, status, permissions };
      let result;

      if (isEdit) {
        result = await updateRoles(data._id, payload);
      } else {
        result = await createRoles(payload);
      }

      if (result.success) {
        showToast(isEdit ? "Roles updated" : "Roles created successfully!", "success");
        close();
      }
    } catch (error) {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

// ✅ Filtered permissions based on search
const filteredPermissions = permissions.filter((perm) =>
  perm.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-auto">
      <div className="bg-white p-5 rounded w-[95%] max-w-3xl">
        <h3 className="text-lg font-bold mb-3">{isEdit ? "Edit Roles" : "Add Roles"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Role Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />

     

     

     {/* ✅ Permissions Table */}
<div className="mt-3 mb-3 overflow-hidden rounded-lg border border-gray-200">
  <div className="max-h-[300px] overflow-y-scroll">
<div>
  {/* ✅ Search input */}


  {/* ✅ Select All Modules */}
  <div className="flex items-center justify-between gap-2 px-3 py-1">
      <input
    type="text"
    placeholder="Search module"
    className=" p-2 rounded mb-2 outline-none"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
       {/* <span className="ml-auto text-gray-600">
     Total  {filteredPermissions.length}
    </span> */}
    <input
      type="checkbox"
      className="cursor-pointer toggle-input"
      checked={filteredPermissions.every(
        (perm) => perm.canCreate && perm.canRead && perm.canUpdate && perm.canDelete
      )}
      onChange={(e) => {
        const checked = e.target.checked;
        setPermissions((prev) =>
          prev.map((perm) => ({
            ...perm,
            canCreate: checked,
            canRead: checked,
            canUpdate: checked,
            canDelete: checked,
          }))
        );
      }}
    />
 
 
  </div>
</div>





    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 text-left">Module</th>
          <th className="px-4 py-2 text-center">Create</th>
          <th className="px-4 py-2 text-center">Read</th>
          <th className="px-4 py-2 text-center">Update</th>
          <th className="px-4 py-2 text-center">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {filteredPermissions.map((perm) => (
          <tr key={perm.module} className="hover:bg-gray-50 transition">
            {/* Module column */}
            <td className="px-4 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer toggle-input"
                  checked={
                    perm.canCreate &&
                    perm.canRead &&
                    perm.canUpdate &&
                    perm.canDelete
                  }
                  onChange={(e) =>
                    handleSelectAll(perm.module, e.target.checked)
                  }
                />
                <span className="font-medium">{perm.moduleName}</span>
              </div>
            </td>

            {/* Create */}
            <td className="px-4 py-2 text-center">
              <input
                type="checkbox"
                className="cursor-pointer toggle-input"
                checked={perm.canCreate}
                onChange={(e) =>
                  handlePermissionChange(perm.module, "canCreate", e.target.checked)
                }
              />
            </td>

            {/* Read */}
            <td className="px-4 py-2 text-center">
              <input
                type="checkbox"
                className="cursor-pointer toggle-input"
                checked={perm.canRead}
                onChange={(e) =>
                  handlePermissionChange(perm.module, "canRead", e.target.checked)
                }
              />
            </td>

            {/* Update */}
            <td className="px-4 py-2 text-center">
              <input
                type="checkbox"
                className="cursor-pointer toggle-input"
                checked={perm.canUpdate}
                onChange={(e) =>
                  handlePermissionChange(perm.module, "canUpdate", e.target.checked)
                }
              />
            </td>

            {/* Delete */}
            <td className="px-4 py-2 text-center">
              <input
                type="checkbox"
                className="cursor-pointer toggle-input"
                checked={perm.canDelete}
                onChange={(e) =>
                  handlePermissionChange(perm.module, "canDelete", e.target.checked)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

     {/* ✅ Status toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer mt-2">
          
                    <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="toggle-input"
                     type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
                    />
                </label>
            <span className="text-gray-700 select-none">Active</span>
          </label>
          {/* ✅ Actions */}
          <div className="flex justify-end gap-2 mt-3">
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

export default RolesPopup;
