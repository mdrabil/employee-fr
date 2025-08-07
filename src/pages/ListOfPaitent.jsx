// ListOfPatient.js
import React, { useEffect, useState } from 'react';
import PatientData from '../components/PatientData';
import { GetTodayPatient } from '../api/PatientApi';
import { formatDate } from '../api/CustomApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket/socket';
import { AddPatient } from '../redux/InitialPatient';
import { store } from '../redux/store';
import { setLoading } from '../redux/LoadingSlice';

const ListOfPatient = () => {
  const user = useSelector(state=>state?.auth?.user)

  const role = user?.user?.role?.name || ""
 
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
const navigate = useNavigate()
const fetchPatients = async () => {
   store.dispatch(setLoading(true));
    try {
        const data = await GetTodayPatient();
        setPatients(data);
        console.log('get patient',data)
        setError("");
      } catch (err) {
        setError(err.message);
      }finally {
    store.dispatch(setLoading(false));
  }
    };


useEffect(() => {
  // Existing listener
  // socket.on("receive_patient", (data) => {
  //   setSelectedPatient(data);
  // });

  // 🔥 Listen for new patient being added
  socket.on("new_patient_added", () => {
    console.log("New patient received, refreshing list...");
    fetchPatients();  // refresh patient list
  });

  return () => {
    socket.off("receive_patient");
    socket.off("new_patient_added");
  };
}, []);

  
    
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
 

  // const handleCheck = (data) => {
  //   // alert()
  //   console.log('selected pa data',data)
  
  //     socket.emit("selected_patient", data);
  // };


//   import { useDispatch, useSelector } from "react-redux";
// import { setPatient } from "../redux/selectedPatientSlice";
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient?.patient);

const handleCheck = (data) => {

  if (selectedPatient?._id === data._id);

  // Emit socket event
  socket.emit("selected_patient", data);
  dispatch(AddPatient(data));

  // Save in redux
};

  return (
    <div className="p-4 space-y-6 min-h-screen">
      {/* Stat Boxes */}


{user?.user?.role?.name==='receptionist' &&    <div className="flex justify-center items-center gap-4 my-4">
      <button
        onClick={() => navigate('/')}
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Booked Appointment
      </button>

      <button
        onClick={() => navigate('/book_appointment')}
        className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Book Appointment
      </button>
    </div>}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <table className="min-w-full text-center">
            <thead className="bg-[#004B29] text-white">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4 text-center">Oppitment Time</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
        <tbody>
  {patients.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center text-gray-500 py-4">
        No patients added
      </td>
    </tr>
  ) : (
    patients.map((p, index) => {
      const isAdmin = user?.user?.role?.name === 'admin';
      const isSelected = selectedPatient?._id === p._id;

      let statusLabel = '';
      let statusClass = '';

      if (p.status === 'treated') {
        statusLabel = 'Checked';
        statusClass = 'bg-green-500';
      } else if (isSelected) {
        statusLabel = 'Checking';
        statusClass = 'bg-blue-500';
      } else {
        statusLabel = isAdmin ? 'Check Now' : 'Pending';
        statusClass = isAdmin ? 'bg-yellow-500' : 'bg-red-500';
      }

      return (
        <tr key={p._id || index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
          <td className="py-2 px-4">{p.patientCode}</td>
          <td className="py-2 px-4 text-center">{p.patientName}</td>
          <td className="py-2 px-4 text-center capitalize">{formatDate(p?.createdAt)}</td>
        <td className="py-2 px-4">
  {user?.user?.role?.name === 'admin' ? (
    <button
      onClick={() => handleCheck(p)}
      className={`${statusClass} hover:opacity-90 text-white px-4 py-1 rounded`}
    >
      {statusLabel}
    </button>
  ) : (
    <button
      disabled
      className={`${statusClass} opacity-50 cursor-not-allowed text-white px-4 py-1 rounded`}
    >
      {statusLabel}
    </button>
  )}
</td>

        </tr>
      );
    })
  )}
</tbody>

          </table>
        </div>

        {/* Side Patient Detail */}
       <PatientData 
    //  selectedPatient={selectedPatient}
       />
      </div>
    </div>
  );
};

export default ListOfPatient;
