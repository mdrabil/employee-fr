// ListOfPatient.js
import React, { useEffect, useState } from 'react';
import PatientData from '../components/PatientData';
import { GetTodayPatient } from '../api/PatientApi';
import { formatDate } from '../api/CustomApi';

const ListOfPatient = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");








  const fetchPatients = async () => {
    try {
        const data = await GetTodayPatient();
        setPatients(data);
        console.log('get patient',data)
        setError("");
      } catch (err) {
        setError(err.message);
      }
    };
    
    useEffect(() => {
    fetchPatients();
  }, []);




  // const patients = [
  //   { id: 1, name: 'Amit Sharma', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  //   { id: 1, name: 'Pooja Mehra', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  //   { id: 1, name: 'Amit', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  //   { id: 1, name: 'Sharma', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  //   { id: 1, name: 'Rahul', dateofbirth: '1990-01-01', problem: 'Liver damage', address: 'Bihar', phone: '91+', status: 'pending' },
  

  // ];

  const totalPatients = patients.length;
  const done = patients.filter(p => p.status === 'treated').length;
  const pending = totalPatients - done || '0' ;
  const currentNo = patients.find(p => p.status === 'pending')?.id || 'N/A';

  const handleCheck = (data) => {
    setSelectedPatient(data);
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
          <h2 className="text-xl font-bold">{selectedPatient?.patientCode}</h2>
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
                <th className="py-2 px-4 text-center">Oppitment Time</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={p.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4">{p.patientCode}</td>
                  <td className="py-2 px-4 tex-center">{p.patientName}</td>
                  <td className="py-2 px-4 capitalize text-center">{formatDate(p?.createdAt)}</td>
                  <td className="py-2 px-4">
                    {p.status === 'new' ? (
                      <button
                        onClick={() => handleCheck(p)}
                        className="bg-[#FDA600] hover:bg-orange-600 text-white px-4 py-1 rounded"
                      >
                        new
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
