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


  if (!selectedPatient) return <div className="text-gray-400 " style={{
    width:'600px',
    // backgroundColor:'red',
    padding:'30px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }}>No patient selected</div>;

  return (
    
 <>
  <div className="bg-[#f0f9f4] p-4 rounded-lg shadow w-full lg:w-1/2 ">
        <div className='flex items-center justify-between'>
            <h2 className="text-lg font-bold mb-2 text-[#004B29]">
            Patient Details</h2>
              <h2 className="text-lg font-bold mb-2 text-[#004B29]">
            {selectedPatient?.gender}</h2>
           {role ==="admin" &&  <IoClose style={{
            cursor:'pointer'
           }} onClick={handleClose}/>}
        </div>
          {selectedPatient ? (
            <div className="space-y-2 text-sm text-gray-800">
              <p><strong>ID:</strong> {selectedPatient?.patientCode}</p>
              <p><strong>Name:</strong> {selectedPatient?.patientName}</p>
              <p><strong>AGE:</strong> {selectedPatient?.age || 'N/A'}</p>
              <p><strong>Problem:</strong> {selectedPatient?.reasonForVisit|| 'N/A'}</p>
              <p><strong>Address:</strong> {selectedPatient?.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {selectedPatient?.phone || 'N/A'}</p>

              {/* Buttons */}
            
            { role === "receptionist" ? "" :
              <div className="pt-4 space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm" onClick={()=>navigate(`/treatments/${selectedPatient?._id}`)}>
                  Old Problem
                </button>
          {selectedPatient?.status==="treated" ?  "" :   <Link to={`/user_details/${selectedPatient?._id}`}>   <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                  Cheching
                </button></Link> }
              </div>}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Select a patient to view details.</p>
          )}
        </div>
 </>
  )
}

export default PatientData