
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
import { DeletePatient } from '../redux/InitialPatient';
import { setLoading } from '../redux/LoadingSlice';
import { store } from '../redux/store';
import PrintLayoutFinal from '../components/PrintLayoutFinal';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const User_Details = () => {
  const { UserId } = useParams();
  const isTabletOrBelow = useMediaQuery('(max-width: 768px)');

  const patientmedicine = useSelector(
    (state) => state?.patientmedicine?.patientmedicine?.[UserId] || []
  );
  const navigate = useNavigate();

  const [patient, setPatients] = useState(null);
  const [patientPrint, setPatientsPrint] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState('');
  const [selectedDawaList, setSelectedDawaList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const [selectedDose, setSelectedDose] = useState(null);
  const [selectedFreq, setSelectedFreq] = useState({
  सुबह: { beforeMeal: false, afterMeal: false },
  दोपहर: { beforeMeal: false, afterMeal: false },
  रात: { beforeMeal: false, afterMeal: false }
});

  const [symptoms, setSymptoms] = useState('');
  const [medicines, setMedicines] = useState([]);
const [showPriviewData,setShowPriviewData]= useState(false)
 

const dispatch = useDispatch()

// const { patientmedicine } = useSelector(state => state.patientmedicine);

// const handleAddMedicine = () => {
//   if (!selectedMedicine) return toast.error("Please select a medicine");

//   const allFalse = Object.values(selectedFreq).every(
//     (time) => !time.beforeMeal && !time.afterMeal
//   );

//   if (allFalse) {
//     toast.error("Please select at least one frequency (before/after meal)");
//     return;
//   }
// // alert(selectedMedicine?.type)
//   const newEntry = {
//     name: selectedMedicine.name,
//     type:selectedMedicine?.type,
//     patientId:UserId,
//     dose: selectedDose,
//     frequency: selectedFreq,
//   };

//   dispatch(AddPatientMedicine(newEntry));

//   // Reset state
//   setSelectedMedicine(null);
//   setSelectedDose('');
// setSelectedFreq({
//   सुबह: { beforeMeal: false, afterMeal: false },
//   दोपहर: { beforeMeal: false, afterMeal: false },
//   रात: { beforeMeal: false, afterMeal: false }
// });

//   setSearch('');
// };

const handleAddMedicine = () => {
  if (!selectedMedicine || typeof selectedMedicine !== 'object') {
    return toast.error("कृपया एक दवा चुनें");
  }

  if (!selectedMedicine.name || typeof selectedMedicine.name !== 'string') {
    return toast.error("दवा का नाम मान्य नहीं है");
  }

  if (selectedMedicine?.type === 'Syrup' && !selectedDose) {
    return toast.error("Syrup के लिए dose चुनना जरूरी है");
  }

  const isFreqValid = Object.values(selectedFreq).some(
    (time) => time.beforeMeal || time.afterMeal
  );

  if (!isFreqValid) {
    return toast.error("कृपया कम से कम एक बार खाने से पहले/बाद का समय चुनें");
  }

  const newEntry = {
    name: selectedMedicine.name,
    type: selectedMedicine?.type || '',
    patientId: UserId,
    dose: selectedDose || '',
    frequency: selectedFreq,
  };

  dispatch(AddPatientMedicine(newEntry));

  // Reset state
  setSelectedMedicine(null);
  setSelectedDose('');
  setSelectedFreq({
    सुबह: { beforeMeal: false, afterMeal: false },
    दोपहर: { beforeMeal: false, afterMeal: false },
    रात: { beforeMeal: false, afterMeal: false }
  });

  setSearch('');
};


    const doseOptions = ['2ml', '5ml', '7.5ml', '10ml', '15ml', '20ml'];


  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );


//   const filteredMedicines = medicines.filter((med) =>
//   med.name.toLowerCase().includes(search.toLowerCase())
// );

useEffect(() => {
  if (search?.length > 0) {
    setSelectedMedicine(null);
  }
}, [search]);

 

  // const handleDelete = (index) => {
  //   const deletedmedicine = {
  //     patientId:UserId,
  //      nameToDelete :index?.name

  //   }
  //   console.log('delewala',deletedmedicine)
  // dispatch(DeletePatientMedicine(deletedmedicine))
  // };
  // ✅ Always fetch medicine


  const handleDelete = (medicine) => {
  if (!medicine || !medicine.name) {
    return toast.error("Medicine delete करने में समस्या आई");
  }

  const deletedmedicine = {
    patientId: UserId,
    nameToDelete: medicine.name
  };

  dispatch(DeletePatientMedicine(deletedmedicine));
};



    const fetchMedicine = async () => {
          store.dispatch(setLoading(true));
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
      } finally {
            store.dispatch(setLoading(false));
      }
    };

  

  // ✅ Fetch Patients - Only if UserId is present
  
    // const fetchPatients = async () => {
    //   try {
    //     if (UserId) {
    //       const data = await GetSinglePatient(UserId);
    //       if (!data) {
    //         navigate("/404"); // ❗No data, redirect
    //       } else {
    //         setPatients(data);
    //       }
    //     }
    //   } catch (err) {
    //     setError(err.message);
    //     navigate("/404"); // ❗API failed, redirect
    //   }
    // };

    const fetchPatients = async () => {
          store.dispatch(setLoading(true));
  try {
    if (!UserId) {
      setError("Invalid User ID");
      return;
    }

    const data = await GetSinglePatient(UserId);
    if (!data || typeof data !== 'object') {
      navigate("/404");
    } else {
      setPatients(data);
    }
  } catch (err) {
    console.error("Fetch patient failed:", err);
    setError("Patient fetch failed");
    navigate("/404");
  } finally {
        store.dispatch(setLoading(false));
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

// const frequencyOptions = [
//   { label: "Naste Se Pahle", field: "morning", type: "beforeMeal" },
//   { label: "Naste ke Baad", field: "morning", type: "afterMeal" },
//   { label: "Dophar:Khane Se Pahle", field: "afternoon", type: "beforeMeal" },
//   { label: "Dophar:Khane Ke Baad", field: "afternoon", type: "afterMeal" },
//   { label: "Rat:Khane Se Pahle", field: "night", type: "beforeMeal" },
//   { label: "Raat:Khane Ke Baad", field: "night", type: "afterMeal" }
// ];

const frequencyOptions = [
  // सुबह (Morning)
  { label: "सुबह: खाने से पहले", field: "सुबह", type: "beforeMeal" },
  
  // दोपहर (Afternoon)
  { label: "दोपहर: खाने से पहले", field: "दोपहर", type: "beforeMeal" },
  
  // रात (Night)
  { label: "रात: खाने से पहले", field: "रात", type: "beforeMeal" },
  { label: "सुबह: खाने के बाद", field: "सुबह", type: "afterMeal" },
  { label: "दोपहर: खाने के बाद", field: "दोपहर", type: "afterMeal" },
  { label: "रात: खाने के बाद", field: "रात", type: "afterMeal" },
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

// const handleEdit = (medicine) => {
//   setSelectedMedicine(medicine);
//   setSelectedDose(medicine.dose || '');
//   setSelectedFreq(medicine.frequency || {
//     सुबह: { beforeMeal: false, afterMeal: false },
//     दोपहर: { beforeMeal: false, afterMeal: false },
//     रात: { beforeMeal: false, afterMeal: false }
//   });
// };

// const formatFrequency = (freq) => {
//   if (!freq) return '--';

//   const parts = [];

//   const mapTime = {
//     morning: 'Morning',
//     afternoon: 'Afternoon',
//     night: 'Night'
//   };

//   Object.keys(freq).forEach(time => {
//     const before = freq[time]?.beforeMeal;
//     const after = freq[time]?.afterMeal;

//     let meals = [];
//     if (before) meals.push('Before Meal');
//     if (after) meals.push('After Meal');

//     if (meals.length > 0) {
//       parts.push(`${mapTime[time]}:  ${meals.join(', ')}`);
//     }
//   });

//   return parts.length > 0 ? parts.join(' | ') : '--';
// };

const handleEdit = (medicine) => {
  if (!medicine || typeof medicine !== 'object') {
    return toast.error("दवा edit नहीं हो सकी");
  }

  setSelectedMedicine(medicine);
  setSelectedDose(medicine.dose || '');
  setSelectedFreq(medicine.frequency || {
    सुबह: { beforeMeal: false, afterMeal: false },
    दोपहर: { beforeMeal: false, afterMeal: false },
    रात: { beforeMeal: false, afterMeal: false }
  });
};


// const formatFrequency = (freq) => {
//   if (!freq) return '--';

//   const parts = [];

//   const mapTime = {
//     सुबह: 'सुबह',
//     दोपहर: 'दोपहर',
//     रात: 'रात'
//   };

//   Object.keys(freq).forEach(time => {
//     const before = freq[time]?.beforeMeal;
//     const after = freq[time]?.afterMeal;

//     let meals = [];
//     if (before) meals.push('खाने से पहले');
//     if (after) meals.push('खाने के बाद');

//     if (meals.length > 0) {
//       parts.push(`${mapTime[time]}: ${meals.join(', ')}`);
//     }
//   });

//   return parts.length > 0 ? parts.join(' | ') : '--';
// };

// const formatFrequency = (freq) => {
//   if (!freq || typeof freq !== 'object') return '--';

//   const parts = [];
//   const mapTime = { सुबह: 'सुबह', दोपहर: 'दोपहर', रात: 'रात' };

//   Object.keys(mapTime).forEach((time) => {
//     const before = freq[time]?.beforeMeal;
//     const after = freq[time]?.afterMeal;

//     let meals = [];
//     if (before) meals.push('खाने से पहले');
//     if (after) meals.push('खाने के बाद');

//     if (meals.length > 0) {
//       parts.push(`${mapTime[time]}: ${meals.join(', ')}`);
//     }
//   });

//   return parts.length > 0 ? parts.join(' | ') : '--';
// };


const formatFrequency = (freq) => {
  if (!freq || typeof freq !== 'object') return '--';

  const mapTime = {
    सुबह: { label: 'सुबह', color: 'text-green-600' },
    दोपहर: { label: 'दोपहर', color: 'text-orange-500' },
    रात: { label: 'रात', color: 'text-blue-600' },
  };

  return Object.keys(mapTime).map((time, idx) => {
    const before = freq[time]?.beforeMeal;
    const after = freq[time]?.afterMeal;

    let meals = [];
    if (before) meals.push('खाने से पहले');
    if (after) meals.push('खाने के बाद');

    if (meals.length > 0) {
      return (
        <div key={idx}>
          <span className={mapTime[time].color}>{mapTime[time].label}:</span>{" "}
          {meals.join(', ')}
        </div>
      );
    }

    return null;
  });
};




// const handleDoneTreatment = async () => {
//   if (!UserId) {
//     toast.error("User is not valid");
//     return;
//   }

//   const payload = {
//     patientId:patient._id || UserId,
//     patinentProblem:patient?.reasonForVisit,
//     symptoms:symptoms,
//     patientmedicine: patientmedicine,
//   };

//   try {
//     const data = await createTreatment(payload);
// // const data = true
//     if (data) {
//       toast.success("Treatment is successfully done!");

//       dispatch(DeleteAllMedicinesForPatient(UserId));
//       // Trigger print after success
//       setTimeout(() => {
//         // window.print();
//         setShowPriviewData(true)
//       }, 500); // Delay to ensure success message renders first
//     }
//   } catch (error) {
//     console.error("Treatment error:", error.message);
//     // Error messages already handled in createTreatment
//   }
// };


const handleDoneTreatment = async () => {
  if (!UserId || !patient) {
    toast.error("Patient की जानकारी नहीं मिल सकी");
    return;
  }

  // if (!symptoms || symptoms.trim().length < 3) {
  //   toast.error("लक्षण सही से भरें");
  //   return;
  // }

  if (!Array.isArray(patientmedicine) || patientmedicine.length === 0) {
    toast.error("कृपया कम से कम एक दवा जोड़ें");
    return;
  }

  const payload = {
    patientId: patient._id || UserId,
    patinentProblem: patient?.reasonForVisit || '',
    symptoms: symptoms,
    patientmedicine: patientmedicine,
  };

  console.log('data final jo backend me jayga',payload)

        store.dispatch(setLoading(true));

  try {
    const data = await createTreatment(payload);
// const data= true
    if (data) {
      // toast.success("इलाज सफलतापूर्वक दर्ज हो गया!");

      // dispatch(DeleteAllMedicinesForPatient(UserId));
      dispatch(DeletePatient())
      
        // setShowPriviewData(true);
        // navigate('/')
        setPatientsPrint(true)
    

    }
  } catch (error) {
    console.error("Treatment error:", error.message);
    toast.error("ट्रीटमेंट सेव नहीं हो सका");
  }
  finally{
          store.dispatch(setLoading(false));
  }
};


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


  return (
<div
  className="p-1 mx-auto  mt-2 flex gap-6"
  style={{
    flexDirection: isTabletOrBelow ? "column" : "row",
    // backgroundColor:'red',
    width: "98%",
  }}
>
  {/* Left Section */}
  <div className="flex-1 min-h-[400px] bg-white rounded-lg  overflow-y-auto">
    <div className="bg-green-100 p-2 rounded-lg border border-gray-200 rounded-lg">
      <h2 className="font-bold text-green-900 mb-3">🧑‍⚕️ Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-medium text-gray-700">
        <div>
          Name: <span className="font-semibold text-black">{patient?.patientName}</span>
        </div>
        <div className="text-right pr-6">
          Age: <span className="font-semibold text-black">{patient?.age}</span>
        </div>
        <div>
          Reason:{" "}
          <span className="font-semibold text-black">{patient?.reasonForVisit}</span>
        </div>
      </div>
    </div>

    {/* Symptoms */}
    <div>
      <label className="block mb-1 mt-3 text-sm font-medium text-gray-700">📝 Kya hua hai?</label>
      <textarea
        placeholder="Symptoms..."
        className="w-full border-2 border-green-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        value={symptoms}
        rows={2}
        onChange={(e) => setSymptoms(e.target.value)}
      />
    </div>

    {/* Search Medicine */}
   {/* Search Medicine */}
<div>
  <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
    🔍 Search Medicine
  </label>
  <input
    type="text"
    placeholder="Type medicine name..."
    className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* Medicines Dropdown */}
  <div
    className={`transition-all duration-300 ease-in-out overflow-hidden ${
      search ? "max-h-48 mt-2" : "max-h-0"
    }`}
  >
    <div className="border rounded p-2 bg-green-50 overflow-y-auto max-h-40">
      {filteredMedicines.length ? (
        filteredMedicines.slice(0, 20).map((med, i) => (
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
  </div>
</div>


    {/* Selected Medicine */}
    {selectedMedicine   && (
      <div className="border p-4 rounded bg-orange-50 space-y-4 shadow-md mt-3">
        <h3 className="font-semibold text-lg text-orange-700">🧪 {selectedMedicine.name}</h3>

        {/* Dose Options */}
        {selectedMedicine?.type === "Syrup" && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-1">💧 Select Dose:</p>
            <div className="flex gap-4 flex-wrap">
              {doseOptions.map((dose, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dose"
                    value={dose}
                    checked={selectedDose === dose}
                    onClick={(e) => {
                      const clickedValue = e.target.value;
                      setSelectedDose((prev) =>
                        prev === clickedValue ? "" : clickedValue
                      );
                    }}
                  />
                  <span className="text-gray-700">{dose}</span>
                </label>
              ))}
            </div>
          </>
        )}

        {/* Frequency */}
      {/* Frequency */}
<div className="mt-3">
  <p className="text-sm font-medium text-gray-700 mb-1">⏱️ Frequency:</p>
  <div
    className={`transition-all duration-300 ease-in-out overflow-hidden ${
      selectedMedicine ? "max-h-60" : "max-h-0"
    }`}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
      {frequencyOptions.map(({ label, field, type }, idx) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedFreq[field][type]}
            onChange={() => handleFreqChange(field, type)}
          />
          <span className="text-sm">{label}</span>
        </label>
      ))}
    </div>
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
  </div>

  {/* Right Section */}
{/* <div
  className="flex-1 bg-white shadow-xl rounded-xl border border-gray-200 p-4"
  style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}
>
  {patientmedicine?.length > 0 ? (
    <>
  
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        🧾 <span>Selected Dawa List</span>
      </h3>

   
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-left text-sm text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Dose</th>
              <th className="p-3">Times</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientmedicine.map((dawa, idx) => (
              <tr
                key={idx}
                className={`text-sm transition ${
                  idx % 2 === 0 ? "bg-green-50" : "bg-white"
                } hover:bg-green-100`}
              >
                <td className="p-3 font-medium text-gray-700">{idx + 1}</td>
                <td className="p-3 font-medium text-gray-800 break-words">
                  {dawa.name}
                </td>
                <td className="p-3">{dawa?.dose || "--"}</td>
                <td className="p-3">{formatFrequency(dawa.frequency)}</td>
                <td className="p-3 flex flex-col md:flex-row items-center gap-2">
                  <button
                    onClick={() => handleEdit(dawa)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition"
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(dawa)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
                  >
                    <MdDeleteOutline /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
          onClick={() => setShowPriviewData(!showPriviewData)}
        >
          🔍 Preview
        </button>
        <button
          className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition text-sm"
          onClick={handleDoneTreatment}
        >
          ✅ Submit
        </button>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400 italic">
      No medicines added yet.
    </div>
  )}
</div> */}

<div
  className="flex-1 bg-white shadow-xl rounded-xl border border-gray-200 p-4"
  style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}
>
  {patientmedicine?.length > 0 ? (
    <>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        🧾 Selected Dawa List
      </h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-left text-sm text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Dose</th>
              <th className="p-3">Times</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientmedicine.map((dawa, idx) => (
              <tr
                key={idx}
                className={`text-sm transition ${
                  idx % 2 === 0 ? "bg-green-50" : "bg-white"
                } hover:bg-green-100`}
              >
                <td className="p-3 font-medium text-gray-700">{idx + 1}</td>
                <td className="p-3 font-medium text-gray-800 break-words">
                  {dawa.name}
                </td>
                <td className="p-3">{dawa?.dose || "--"}</td>
                <td className="p-3">{formatFrequency(dawa.frequency)}</td>
                <td className="p-3 flex flex-col  items-center justify-center md:flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(dawa)}
                    className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-white rounded-md text-xl hover:bg-yellow-500 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(dawa)}
                    className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-md text-xl hover:bg-red-600 transition"
                  >
                    <MdDeleteOutline /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-3">
        {patientmedicine.map((dawa, idx) => (
          <div
            key={idx}
            className="bg-green-50 rounded-lg p-3 shadow-md flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{dawa.name}</span>
              <span className="text-gray-600 text-sm">#{idx + 1}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Dose: {dawa?.dose || "--"}</span>
              <span>Times: {formatFrequency(dawa.frequency)}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(dawa)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition"
              >
                <FaEdit /> <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(dawa)}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
              >
                <MdDeleteOutline /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
          onClick={() => setShowPriviewData(!showPriviewData)}
        >
          🔍 Preview
        </button>
        <button
          className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition text-sm"
          onClick={handleDoneTreatment}
        >
          ✅ Submit
        </button>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400 italic">
      No medicines added yet.
    </div>
  )}
</div>

  {showPriviewData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white max-h-[95vh] overflow-y-auto rounded-lg shadow-xl w-full max-w-4xl">
      <PriviewData
        userInformation={patient}
      
        // setprintview={setPatientsPrint}
        addmedicines={patientmedicine}
        open={showPriviewData}
        close={() => setShowPriviewData(false)}
      />
    </div>
</div>

)}

  {/* {showPriviewData && (
  <PriviewData
    userInformation={patient}
    addmedicines={patientmedicine}
    open={showPriviewData}
    close={() => setShowPriviewData(false)}
  />
)} */}

{patientPrint  && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white max-h-[95vh] overflow-y-auto rounded-lg shadow-xl w-full max-w-4xl">
      <PrintLayoutFinal
        userInformation={patient}
        printview={patientPrint}
        setprintview={setPatientsPrint}
        addmedicines={patientmedicine}
        open={showPriviewData}
        close={() => setPatientsPrint(false)}
      />
    </div>
</div>
)}
</div>

  );
};

export default User_Details;

      




