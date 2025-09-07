import { FaEye, FaEdit } from "react-icons/fa";

export const ProjectTable = ({ project }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 text-sm md:text-base">Project Name</th>
            <th className="p-2 text-sm md:text-base">Client</th>
            <th className="p-2 text-sm md:text-base">Employees</th>
            <th className="p-2 text-sm md:text-base">Priority</th>
            <th className="p-2 text-sm md:text-base">Start Date</th>
            <th className="p-2 text-sm md:text-base text-red-600">Deadline</th>
            <th className="p-2 text-sm md:text-base">Status</th>
            <th className="p-2 text-sm md:text-base text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
            {/* Project Name */}
            <td className="p-2 font-semibold">{project?.name}</td>

            {/* Client */}
            <td className="p-2">
              <div>
                <p className="font-medium">{project?.client?.name}</p>
                <p className="text-sm text-gray-500">{project?.client?.email}</p>
                <p className="text-sm text-gray-500">{project?.client?.phone}</p>
              </div>
            </td>

            {/* Employees */}
            <td className="p-2">
              <ul className="list-disc list-inside">
                {project?.employees?.map((emp) => (
                  <li key={emp._id} className="text-sm">
                    {emp.firstName} {emp.lastName} (
                    <span className="text-gray-500">{emp.role?.name}</span>)
                  </li>
                ))}
              </ul>
            </td>

            {/* Priority */}
            <td className="p-2 capitalize">{project?.priority}</td>

            {/* Start Date */}
            <td className="p-2">{new Date(project?.startDate).toLocaleDateString()}</td>

            {/* Deadline */}
            <td className="p-2 font-semibold text-red-600">
              {new Date(project?.deadline).toLocaleDateString()}
            </td>

            {/* Status */}
            <td className="p-2 capitalize">{project?.status}</td>

            {/* Actions */}
            <td className="p-2 flex justify-end items-center gap-3">
              <button
                onClick={() => console.log("Edit", project?._id)}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Edit Project"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => console.log("View", project?._id)}
                className="text-green-500 hover:text-green-700 transition"
                title="View Project"
              >
                <FaEye size={18} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
