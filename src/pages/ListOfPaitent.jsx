// ListOfPatient.js
import React, { useState } from 'react';
import PatientData from '../components/PatientData';

const ListOfPatient = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    { id: 1, name: 'Amit Sharma', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
    { id: 1, name: 'Pooja Mehra', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
    { id: 1, name: 'Amit', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
    { id: 1, name: 'Sharma', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
    { id: 1, name: 'Rahul', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  

  ];

  const totalPatients = patients.length;
  const done = patients.filter(p => p.status === 'checked').length;
  const pending = patients.filter(p => p.status === 'pending').length;
  const currentNo = patients.find(p => p.status === 'pending')?.id || 'N/A';

  const handleCheck = (id) => {
    setSelectedPatient(id);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
          <h2 className="text-xl font-bold">{totalPatients}</h2>
          <p>Total Patients</p>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
          <h2 className="text-xl font-bold">{done}</h2>
          <p>Completed</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow text-center">
          <h2 className="text-xl font-bold">{pending}</h2>
          <p>Pending</p>
        </div>
        <div className="bg-orange-100 text-orange-800 p-4 rounded shadow text-center">
          <h2 className="text-xl font-bold">{currentNo}</h2>
          <p>Current No.</p>
        </div>
      </div>

      {/* Patient List & Side Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patient Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full lg:w-3/4">
          <table className="min-w-full text-left">
            <thead className="bg-[#004B29] text-white">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={p.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4">{p.id}</td>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4 capitalize">{p.status}</td>
                  <td className="py-2 px-4">
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => handleCheck(p)}
                        className="bg-[#FDA600] hover:bg-orange-600 text-white px-4 py-1 rounded"
                      >
                        Check
                      </button>
                    ) : (
                      <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        Checked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Patient Detail */}
       <PatientData 
     selectedPatient={selectedPatient}
       />
      </div>
    </div>
  );
};

export default ListOfPatient;
