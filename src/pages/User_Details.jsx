
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetSinglePatient } from '../api/PatientApi';
import { GetAllMedicine } from '../api/MedicineApi';
import { useDispatch, useSelector } from 'react-redux';
import { AddPatientMedicine, DeleteAllMedicinesForPatient, DeletePatientMedicine } from '../redux/Pmedicine';
import PriviewData from '../components/PriviewData';
import { toast } from 'react-toastify';
import { createTreatment } from '../api/TreatmentApi';
import { useMediaQuery } from '@mui/material';
const User_Details = () => {
  const { UserId } = useParams();
  const isTabletOrBelow = useMediaQuery('(max-width: 768px)');

  const patientmedicine = useSelector(
    (state) => state.patientmedicine.patientmedicine[UserId] || []
  );
  const navigate = useNavigate();

  const [patient, setPatients] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState('');
  const [selectedDawaList, setSelectedDawaList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [selectedDose, setSelectedDose] = useState(null);
  const [selectedFreq, setSelectedFreq] = useState({
  morning: { beforeMeal: false, afterMeal: false },
  afternoon: { beforeMeal: false, afterMeal: false },
  night: { beforeMeal: false, afterMeal: false }
});

  const [symptoms, setSymptoms] = useState('');
  const [medicines, setMedicines] = useState([]);
const [showPriviewData,setShowPriviewData]= useState(false)
 

const dispatch = useDispatch()

// const { patientmedicine } = useSelector(state => state.patientmedicine);

const handleAddMedicine = () => {
  if (!selectedMedicine) return toast.error("Please select a medicine");

  const allFalse = Object.values(selectedFreq).every(
    (time) => !time.beforeMeal && !time.afterMeal
  );

  if (allFalse) {
    toast.error("Please select at least one frequency (before/after meal)");
    return;
  }
// alert(selectedMedicine?.type)
  const newEntry = {
    name: selectedMedicine.name,
    type:selectedMedicine?.type,
    patientId:UserId,
    dose: selectedDose,
    frequency: selectedFreq,
  };

  dispatch(AddPatientMedicine(newEntry));

  // Reset state
  setSelectedMedicine(null);
  setSelectedDose('');
setSelectedFreq({
  morning: { beforeMeal: false, afterMeal: false },
  afternoon: { beforeMeal: false, afterMeal: false },
  night: { beforeMeal: false, afterMeal: false }
});

  setSearch('');
};

    const doseOptions = ['2ml', '5ml', '7.5ml', '10ml', '15ml', '20ml'];


  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log('dawa add ha ',patientmedicine)
 

  const handleDelete = (index) => {
    const deletedmedicine = {
      patientId:UserId,
       nameToDelete :index?.name

    }
    console.log('delewala',deletedmedicine)
  dispatch(DeletePatientMedicine(deletedmedicine))
  };
  // ✅ Always fetch medicine

    const fetchMedicine = async () => {
      try {
        const data = await GetAllMedicine();
        if (data) {
          setMedicines(data);
          console.log('medicine list',data)
        }
      } catch (err) {
        console.error("Medicine fetch error:", err.message);
        // setError(err.message);
        // navigate("/404"); ❌ Don't navigate here
      }
    };

  

  // ✅ Fetch Patients - Only if UserId is present
  
    const fetchPatients = async () => {
      try {
        if (UserId) {
          const data = await GetSinglePatient(UserId);
          if (!data) {
            navigate("/404"); // ❗No data, redirect
          } else {
            setPatients(data);
          }
        }
      } catch (err) {
        setError(err.message);
        navigate("/404"); // ❗API failed, redirect
      }
    };


    // const dosage = [{

    // }]
  


useEffect(() => {
  fetchPatients();
}, [UserId]);

useEffect(() => {
  fetchMedicine();
}, []);

const frequencyOptions = [
  { label: "Naste Se Pahle", field: "morning", type: "beforeMeal" },
  { label: "Naste ke Baad", field: "morning", type: "afterMeal" },
  { label: "Dophar:Khane Se Pahle", field: "afternoon", type: "beforeMeal" },
  { label: "Dophar:Khane Ke Baad", field: "afternoon", type: "afterMeal" },
  { label: "Rat:Khane Se Pahle", field: "night", type: "beforeMeal" },
  { label: "Raat:Khane Ke Baad", field: "night", type: "afterMeal" }
];

const handleFreqChange = (field, type) => {
  setSelectedFreq((prev) => ({
    ...prev,
    [field]: {
      ...prev[field],
      [type]: !prev[field][type]
    }
  }));
};

const handleEdit = (medicine) => {
  setSelectedMedicine(medicine);
  setSelectedDose(medicine.dose || '');
  setSelectedFreq(medicine.frequency || {
    morning: { beforeMeal: false, afterMeal: false },
    afternoon: { beforeMeal: false, afterMeal: false },
    night: { beforeMeal: false, afterMeal: false }
  });
};

const formatFrequency = (freq) => {
  if (!freq) return '--';

  const parts = [];

  const mapTime = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    night: 'Night'
  };

  Object.keys(freq).forEach(time => {
    const before = freq[time]?.beforeMeal;
    const after = freq[time]?.afterMeal;

    let meals = [];
    if (before) meals.push('Before Meal');
    if (after) meals.push('After Meal');

    if (meals.length > 0) {
      parts.push(`${mapTime[time]}:  ${meals.join(', ')}`);
    }
  });

  return parts.length > 0 ? parts.join(' | ') : '--';
};


const handleDoneTreatment = async () => {
  if (!UserId) {
    toast.error("User is not valid");
    return;
  }

  const payload = {
    patientId: UserId,
    patientmedicine: patientmedicine,
  };

  try {
    const data = await createTreatment(payload);

    if (data) {
      toast.success("Treatment is successfully done!");

      dispatch(DeleteAllMedicinesForPatient(UserId));
      // Trigger print after success
      setTimeout(() => {
        window.print();
      }, 500); // Delay to ensure success message renders first
    }
  } catch (error) {
    console.error("Treatment error:", error.message);
    // Error messages already handled in createTreatment
  }
};


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!patient) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-6  mx-auto  from-green-50 to-white shadow-lg rounded-lg space-y-6 mt-6" style={{
      display:'flex',
      flexDirection:isTabletOrBelow ?'column' : '',
      width:'100%',
      // backgroundColor:'red',
      gap:'50px'
    }}>
      {/* Patient Info */}
  <div style={{
    width:'100%'
  }}>
        <div className="bg-green-100 p-2 rounded-lg">
        <h2 className="text- font-bold text-green-900 mb-3">🧑‍⚕️ Patient Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-medium text-gray-700">
          <div>Name: <span className="font-semibold text-black">{patient?.patientName}</span></div>
          <div>Age: <span className="font-semibold text-black">56</span></div>
          <div>Reason: <span className="font-semibold text-black">{patient?.reasonForVisit}</span></div>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block mb-1 mt-3 text-sm font-medium text-gray-700">📝 Kya hua hai?</label>
        <textarea
          placeholder="Symptoms..."
          className="w-full border-2 border-green-300 p-3 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </div>

      {/* Search Medicine */}
      <div>
        <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">🔍 Search Medicine</label>
        <input
          type="text"
          placeholder="Type medicine name..."
          className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="mt-2 border rounded p-2 bg-green-50 max-h-40 overflow-y-auto">
            {filteredMedicines.length ? (
              filteredMedicines.map((med, i) => (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-green-200 p-2 rounded text-sm transition"
                  onClick={() => setSelectedMedicine(med)}
                >
                  {med.name}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No medicine found</div>
            )}
          </div>
        )}
      </div>

      {/* Show Dosage & Frequency */}
      {selectedMedicine && (
        <div className="border p-4 rounded bg-orange-50 space-y-4 shadow-md">
          <h3 className="font-semibold text-lg text-orange-700">🧪 {selectedMedicine.name}</h3>

     {
      selectedMedicine?.type==='Syrup'  &&
      <>
            <p className="text-sm font-medium text-gray-700 mb-1">💧 Slect Dose:</p>
           <div className="flex gap-4 flex-wrap">
{doseOptions.map((dose, idx) => (
  <label key={idx} className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="dose"
      value={dose}
      checked={selectedDose === dose}
      onChange={() => {}}
      onClick={(e) => {
        const clickedValue = e.target.value;
        setSelectedDose((prev) => (prev === clickedValue ? '' : clickedValue));
      }}
    />
    <span className="text-gray-700">{dose}</span>
  </label>
))}


    </div>
          </>
             } 

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">⏱️ Frequency:</p>
            {/* <div className="" style={{
              display:'grid',
              gridTemplateColumns:"repeat(3,1fr)",
              gap:'20px'
            }}>
              {['Naste Se Pahle', 'Naste ke Baad', 'Dophar:Khane Se Pahle',"Dophar:Khane Ke Baad","Rat:Khane Se Pahle","Raat:Khane Ke Baad"].map((freq, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="freqD"
                    value={freq}
                    // checked={selectedFreq === freq}
                    onChange={(e) => setSelectedFreq(e.target.value)}
                  />
                  <span>{freq}</span>
                </label>
              ))}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {frequencyOptions.map(({ label, field, type }, idx) => (
    <label key={idx} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selectedFreq[field][type]}
        onChange={() => handleFreqChange(field, type)}
      />
      <span>{label}</span>
    </label>
  ))}
</div>

          </div>

          <button
            onClick={handleAddMedicine}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            ➕ Add to Prescription
          </button>
        </div>
      )}

   

      {/* Bottom Buttons */}
      
  </div>

 <div>
          {/* Selected Dawa List */}
      {patientmedicine?.length > 0 && (
        <div
           style={{
        width: isTabletOrBelow ? '100%' : '500px',
      }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">🧾 Selected Dawa List</h3>
          <div className="overflow-x-auto rounded shadow">
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-green-200 text-left text-sm text-gray-800">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Dose</th>
                  <th className="p-2">Times</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
            {patientmedicine.map((dawa, idx) => (
  <tr key={idx} className="border-b text-sm hover:bg-green-50">
    <td className="p-2">{idx + 1}</td>
    <td className="p-2 white-space-wrap">{dawa.name}</td>
    <td className="p-2">{dawa?.dose || '--'}</td>
 
    <td className="p-2">{formatFrequency(dawa.frequency)}</td>

    <td className="p-2 space-x-2 " style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      gap:'2px'
    }}>
      <button
        onClick={() => handleEdit(dawa)}
        className="px-3 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500 transition"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(dawa)}
        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
      >
        Delete
      </button>
    </td>
  </tr>
))}

              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t mt-4">
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" onClick={()=>setShowPriviewData(!showPriviewData)}>
          🔍 Preview
        </button>
        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition" onClick={handleDoneTreatment}>
          ✅ Submit
        </button>
      </div>
        </div>
      )}

      
 </div>
      
  {/* {showPriviewData && (
  <PriviewData
    userInformation={patient}
    addmedicines={patientmedicine}
    open={showPriviewData}
    close={() => setShowPriviewData(false)}
  />
)} */}
{showPriviewData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white max-h-[95vh] overflow-y-auto rounded-lg shadow-xl w-full max-w-4xl">
      <PriviewData
        userInformation={patient}
        addmedicines={patientmedicine}
        open={showPriviewData}
        close={() => setShowPriviewData(false)}
      />
    </div>
</div>
)}


    </div>
  );
};

export default User_Details;
