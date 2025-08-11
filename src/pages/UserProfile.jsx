import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate()
  const user = useSelector((state) => state?.auth?.user?.user);
  console.log("user profile", user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">User data not found</p>
      </div>
    );
  }

  const role = user.role; // role object
  const permissions = role?.permissions || {}; // permissions object

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between"> 
              <h1 className="text-2xl font-bold">{user?.name}</h1>
          <h1 onClick={()=>navigate('/')} className="text-2xl font-bold"> <IoClose/> </h1>
        </div>
          <p className="text-sm">{user?.email}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Role */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Role</h2>
            <p className="text-gray-600 capitalize">{role?.name}</p>
          </div>

          {/* Permissions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Permissions</h2>
            {permissions && Object.keys(permissions).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(permissions).map(([module, actions], index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-orange-600 capitalize">
                      {module}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {actions.map((action, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-800"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No permissions assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
