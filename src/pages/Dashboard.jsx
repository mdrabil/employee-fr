import React, { useEffect, useState } from 'react';
import PatientData from '../components/PatientData';
import { GetAllPatients } from '../api/PatientApi';
import { GetAllPatientTreatment } from '../api/TreatmentApi';


import { formatDate } from '../api/CustomApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket/socket';
import { AddPatient } from '../redux/InitialPatient';
import { store } from '../redux/store';
import { setLoading } from '../redux/LoadingSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { GetAllUsers } from '../api/UsersApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const user = useSelector(state => state?.auth?.user);
  const role = user?.user?.role?.name || "";

  const [patients, setPatients] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient?.patient);

  const fetchData = async () => {
    store.dispatch(setLoading(true));
    try {
      const patientData = await GetAllPatients();
      const treatmentData = await GetAllPatientTreatment();
      const userData = await GetAllUsers();

      setPatients(patientData || []);
      setTreatments(treatmentData || []);
      setUsers(userData || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      store.dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    socket.on("new_patient_added", () => {
      fetchData();
    });

    return () => {
      socket.off("new_patient_added");
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const totalPatients = patients.length;
  const totalTreatments = treatments.length;
  const totalUsers = users.length;
  const done = patients.filter(p => p.status === 'treated').length;
  const pending = totalPatients - done || 0;

  const handleCheck = (data) => {
    socket.emit("selected_patient", data);
    dispatch(AddPatient(data));
  };

  // Graph data example
  const chartData = {
    labels: patients.map(p => formatDate(p.createdAt)),
    datasets: [
      {
        label: 'Patients Added',
        data: patients.map((_, index) => index + 1),
        borderColor: '#4cafef',
        backgroundColor: '#4cafef',
      },
    ],
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">{totalPatients}</h2>
          <p className="text-sm">Total Patients</p>
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">{totalTreatments}</h2>
          <p className="text-sm">Total Treatments</p>
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">{totalUsers}</h2>
          <p className="text-sm">Total Users</p>
        </div>
      </div>

      {/* Patient & User Data */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Patient Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-3/4">
          <h3 className="text-base font-bold p-4 border-b">Patient List</h3>
          <div className="table-responsive">
            <table className="min-w-full text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Appointment</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-gray-500 py-4">No patients</td>
                  </tr>
                ) : (
                  patients.map((p, i) => (
                    <tr key={p._id}>
                      <td className="py-2">{p.patientCode}</td>
                      <td className="py-2">{p.patientName}</td>
                      <td className="py-2">{formatDate(p.createdAt)}</td>
                      <td className="py-2">
                        {role === 'admin' ? (
                          <button
                            onClick={() => handleCheck(p)}
                            className={`px-3 py-1 rounded text-white ${p.status === 'treated' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          >
                            {p.status === 'treated' ? 'Checked' : 'Check Now'}
                          </button>
                        ) : (
                          <span className="text-gray-500">{p.status}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-1/4">
          <h3 className="text-base font-bold p-4 border-b">Users</h3>
          <div className="table-responsive">
            <table className="min-w-full text-left">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-gray-500 py-4 text-center">No users</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td className="py-2 px-3">{u.name}</td>
                      <td className="py-2 px-3">{u.role?.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-base font-bold mb-4">Patient Growth</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
