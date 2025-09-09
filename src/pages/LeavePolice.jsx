import React from "react";

const leavePolicies = [
  { type: "Casual Leave", days: 12, description: "For personal or urgent work." },
  { type: "Sick Leave", days: 10, description: "For medical emergencies." },
  { type: "Paid Leave", days: 15, description: "Annual paid leave." },
  { type: "Maternity Leave", days: 180, description: "For female employees." },
  { type: "Paternity Leave", days: 15, description: "For male employees." },
  { type: "Compensatory Leave", days: "-", description: "For extra working days." },
];

const LeavePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Leave Policy</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Our leave policies are designed to provide employees with flexibility and support for personal, medical, and family needs.
        </p>
      </div>

      {/* Leave Summary Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Annual Leave</h2>
          <p className="text-gray-500">
            Each employee is entitled to a certain number of paid leave days every year. Leaves can be used for vacations, personal work, or emergencies.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Sick Leave</h2>
          <p className="text-gray-500">
            Sick leaves can be availed in case of medical emergencies. Employees should notify their manager as soon as possible.
          </p>
        </div>
      </div>

      {/* Leave Policy Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Leave Type</th>
              <th className="py-3 px-6 text-left">Number of Days</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {leavePolicies.map((leave, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-6 text-gray-700 font-medium">{leave.type}</td>
                <td className="py-4 px-6 text-gray-700">{leave.days}</td>
                <td className="py-4 px-6 text-gray-600">{leave.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes Section */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Important Notes</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Leave approval is subject to manager's discretion and company policy.</li>
          <li>Unavailed leaves cannot be carried forward without prior approval.</li>
          <li>Employees should notify their team before taking leave.</li>
          <li>Maternity and Paternity leaves follow statutory regulations.</li>
        </ul>
      </div>
    </div>
  );
};

export default LeavePolicyPage;
