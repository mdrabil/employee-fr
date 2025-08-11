import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import socket from '../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { AddPatient, DeletePatient } from '../redux/InitialPatient';
import { IoClose } from 'react-icons/io5';

const PatientData = () => {
    const user = useSelector(state=>state?.auth?.user)
  
    const role = user?.user?.role?.name || ''
   
const navigate = useNavigate()



    const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient.patient);

  useEffect(() => {
    // Socket se patient receive hote hi redux me set karo
    socket.on('receive_patient', (data) => {
      dispatch(AddPatient(data));
    });

    return () => {
      socket.off('receive_patient');
    };
  }, [dispatch]);


const handleClose = () => {
  // Broadcast karo null to sab client
  socket.emit("selected_patient", null);

  // Local Redux bhi clear karo
  dispatch(DeletePatient());
};

  console.log('Redux Patient:', selectedPatient);


  if (!selectedPatient) return (
    <div className="text-gray-400 w-full lg:w-auto p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[200px] bg-gray-50 rounded-lg">
      <div className="text-center">
        <p className="text-sm md:text-base">No patient selected</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Select a patient from the list to view details</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#f0f9f4] p-3 md:p-4 rounded-lg shadow w-full h-fit">
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-base md:text-lg font-bold text-[#004B29]">
            Patient Details
          </h2>
          <div className="flex items-center gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#004B29]">
              {selectedPatient?.gender}
            </h2>
            {role === "admin" && (
              <IoClose 
                className="cursor-pointer text-lg md:text-xl hover:text-red-500 transition-colors"
                onClick={handleClose}
              />
            )}
          </div>
        </div>
        
        {selectedPatient ? (
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-800">
            <div className="grid grid-cols-1 gap-2">
              <p className="flex flex-col sm:flex-row sm:items-center">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">ID:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.patientCode}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">Name:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.patientName}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">Age:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.age || 'N/A'}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-start">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">Problem:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.reasonForVisit || 'N/A'}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-start">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">Address:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.address || 'N/A'}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <strong className="text-[#004B29] min-w-[60px] sm:min-w-[80px]">Phone:</strong> 
                <span className="ml-0 sm:ml-2">{selectedPatient?.phone || 'N/A'}</span>
              </p>
            </div>

            {/* Buttons */}
            {role !== "receptionist" && (
              <div className="pt-3 md:pt-4 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex sm:flex-row flex-col">
                <button 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs md:text-sm transition-colors" 
                  onClick={() => navigate(`/treatments/${selectedPatient?._id}`)}
                >
                  Old Problem
                </button>
                {selectedPatient?.status !== "treated" && (
                  <Link to={`/user_details/${selectedPatient?._id}`} className="block sm:inline">
                    <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs md:text-sm transition-colors">
                      Checking
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">Select a patient to view details.</p>
        )}
      </div>
    </>
  )
}

export default PatientData