import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const PatientData = ({selectedPatient}) => {
 
  return (
 <>
  <div className="bg-[#f0f9f4] p-4 rounded-lg shadow w-full lg:w-1/2 ">
          <h2 className="text-lg font-bold mb-2 text-[#004B29]">Patient Details</h2>
          {selectedPatient ? (
            <div className="space-y-2 text-sm text-gray-800">
              <p><strong>ID:</strong> {selectedPatient.id}</p>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>DOB:</strong> {selectedPatient.dateofbirth || 'N/A'}</p>
              <p><strong>Problem:</strong> {selectedPatient.problem || 'N/A'}</p>
              <p><strong>Address:</strong> {selectedPatient.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone || 'N/A'}</p>

              {/* Buttons */}
              <div className="pt-4 space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                  Old Problem
                </button>
             <Link to={`/user_details/${selectedPatient?.id}`}>   <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                  Cheching
                </button></Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Select a patient to view details.</p>
          )}
        </div>
 </>
  )
}

export default PatientData