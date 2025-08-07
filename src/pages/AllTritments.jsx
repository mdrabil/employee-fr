import React, { useEffect, useState } from 'react'
import { GetAllPatientTreatment, GetSinglePatientTreatment } from '../api/TreatmentApi'

// 👇 import the function you already wrote
import { formatFrequency } from '../utils/dawatimes'
import { useNavigate, useParams } from 'react-router-dom';

const AllTreatments = () => {
  const navigate = useNavigate()
  const { id } = useParams(); // 👈 get ID from route
  const [treatments, setTreatments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = id 
          ? await GetSinglePatientTreatment(id)
          : await GetAllPatientTreatment();

        // If API for single returns an object, wrap it in array
        console.log(" treatment data",data)
        setTreatments(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <div className='flex gap-30 justify-between px-5'>
        <h2 className="text-2xl font-bold mb-4 text-center">All Treatments</h2>
        <h2 className="text-2xl font-bold mb-4 text-center" onClick={()=>navigate(-1)}>Back</h2>
      </div>
     {treatments?.length === 0 ? <>
     <div>
      <h2>No Any Treatmenst Founds</h2>
      </div></> :  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 text-orange-600">Dr. {treatment.doctorName}</h3>

            <div className="mb-2">
              <p className="font-semibold text-gray-700">Patient:</p>
              <p className="text-sm text-gray-600">
                {treatment?.patientId?.patientName || 'Unknown'} ({treatment?.patientId?.age} yrs)
              </p>
              <p className="text-sm text-gray-600">{treatment?.patientId?.phone}</p>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-gray-700">Problem:</p>
              <p className="text-sm text-gray-600">{treatment.patinentProblem}</p>
            </div>

            {treatment.symptoms && treatment.symptoms.trim() !== '' && (
              <div className="mb-2">
                <p className="font-semibold text-gray-700">Symptoms:</p>
                <p className="text-sm text-gray-600">{treatment.symptoms}</p>
              </div>
            )}

            <div className="mb-2">
              <p className="font-semibold text-gray-700">Medicines:</p>
              {(treatment.medicines || []).map((med, medIndex) => (
                <div key={medIndex} className="bg-gray-50 p-2 rounded mt-1">
                  <p className="text-sm font-medium text-black">
                    {med.name} - {med.type} ({med.quantity})
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatFrequency(med.times)}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Date: {treatment.date ? new Date(treatment.date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default AllTreatments
