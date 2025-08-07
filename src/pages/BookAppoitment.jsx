import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CreatePatient, GetAllPatients, GetAllPatientsBySearch } from "../api/PatientApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BookAppoitment = () => {
const [form, setForm] = useState({
  patientName: "",
  dateOfBirth: "",
  age: "",
  reasonForVisit: "",
  address: "",
  phone: "",
  gender: "",
  patientCode: "", // You can auto-generate or input manually
  // fixedPermanentId:''
});


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
  
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form?.reasonForVisit || form.reasonForVisit.trim().length < 3) {
    toast.error('Reason for visit must be at least 3 characters');
    return;
  }
  try {
    await CreatePatient(form); // form = patient form data
    toast.success("Patient appointment booked!");
    setForm({
      patientName: "",
      dateOfBirth: "",
      age: "",
      reasonForVisit: "",
      address: "",
      phone: "",
      gender: "",
      patientCode: "",
    });
  } catch (err) {
    // Error already handled with toast inside CreatePatient
    console.log("Create failed:", err.message);
  }
};

const [allPatients, setAllPatients] = useState([]);
const [patients, setPatients] = useState([]);

const [searchName, setSearchName] = useState("");
const [searchPhone, setSearchPhone] = useState("");
const [searchPatientCode, setSearchPatientCode] = useState("");
const navigate =useNavigate()
// Fetch all patients once
const fetchPatients = async () => {
  const data = await GetAllPatients();
  if (data.length > 0) {
    setAllPatients(data);
    setPatients(data); // show all initially
  }
};

useEffect(() => {
  fetchPatients();
}, []);

// Filter logic
useEffect(() => {
  let filtered = allPatients;
  if (searchPhone) {
    filtered = filtered.filter((patient) =>
      patient.phone.includes(searchPhone)
    );
  }

  // if (searchName) {
  //   filtered = filtered.filter((patient) =>
  //     patient.patientName.toLowerCase().includes(searchName.toLowerCase())
  //   );
  // }


  if (searchPatientCode) {
    filtered = filtered.filter((patient) =>
      patient.fixedPermanentId?.toLowerCase().includes(searchPatientCode.toLowerCase())
    );
  }
// alert(filtered?.length)
  setPatients(filtered);
}, [searchName, searchPhone, searchPatientCode, allPatients]);

// Fill form on suggestion click
const fillForm = (matched) => {
  setForm({
    patientName: matched.patientName,
    dateOfBirth: matched.dateOfBirth,
    age: matched.age,
    // reasonForVisit: matched.reasonForVisit || "",
    address: matched.address,
    phone: matched.phone,
    gender: matched.gender,
    // patientCode:matched?.patientCode,
    patientCode: matched.patientCode || "",
    fixedPermanentId:matched?.fixedPermanentId
  });
  setSearchPatientCode('')
  setSearchPhone('')
};





  return <>
 <div className="mt-5 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg  w-full max-w-4xl">
<div className="bg-[#004B29] flex items-center justify-between px-5 py-3 gap-2 rounded-t-lg flex-wrap-wrap">

        <h2 className="text-xl md:text-sm sm:text-sm  text-white  ">
          Make An Appointment
        </h2>
        <div>
            <IoCloseOutline className="text-white" onClick={()=>navigate('/')}/>
        </div>
      </div>
   <div className="py-4 px-3 flex flex-wrap justify-between items-start">
  {/* Patient Info Title */}
  <h2 className="text-xl md:text-lg font-semibold border-b border-[#004B29] mb-2 md:mb-0">
    Patient Information
  </h2>

  {/* Patient ID Input with Dropdown */}
  <div className="relative w-full md:w-auto mt-2 md:mt-0">
    <label className="text-md md:text-sm font-medium inline-block mr-2">
      Patient ID:
    </label>

    <input
      type="text"
      name="fixedPermanentId"
      style={{ textAlign: 'right' }}
      value={form?.fixedPermanentId}
      onChange={(e) => {
        handleChange(e);
        setSearchPatientCode(e.target.value);
      }}
      maxLength={4}
      className="border rounded px-2 py-1 focus:outline-none focus:ring-1 w-32 md:w-36"
    />

    {/* Dropdown */}
    {searchPatientCode && patients.length > 0 && (
      <div className="absolute left-0 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded shadow-md z-20">
        {patients.map((p) => (
          <div
            key={p._id}
            onClick={() => fillForm(p)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {p.patientName} - {p.phone} - {p.address}
          </div>
        ))}
      </div>
    )}
  </div>
</div>


        <div className="py-3 px-6">
  <form onSubmit={handleSubmit} className="space-y-4 ">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-6"
         >
             <div>
            <label className="block font-small">Patient Name <span className="text-red-500">*</span> </label>
          {/* <input
  type="text"
  name="patientName"
  value={form?.patientName}
  onChange={handleChange}
  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
  required
/> */}
<input
  type="text"
  name="patientName"
  value={form.patientName}
  onChange={(e) => {
    handleChange(e);
    setSearchName(e.target.value);
  }}
  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
  required
/>

{/* {searchName && patients.length > 0 && (
  <div className="absolute bg-white border  z-10 max-h-40 overflow-y-auto">
    {patients.map((p) => (
      <div
        key={p._id}
        onClick={() => fillForm(p)}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        {p.patientName} - {p.phone}
      </div>
    ))}
  </div>
)} */}

          </div>


          <div>
            <label className="block font-small">Phone no. <span className="text-red-500">*</span></label>
            <div className="relative">
           {/* <input
  type="text"
  name="phone"
  value={form?.phone}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleChange(e); // allow only up to 10 digits
    }
  }}
  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
  required
  inputMode="numeric"
  pattern="\d*"
/> */}

<input
  type="text"
  name="phone"
  value={form.phone}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleChange(e);
      setSearchPhone(value);
    }
  }}
  maxLength={10}
  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
  required
/>
{searchPhone && patients.length > 0 && (
  <div className="absolute bg-white border  z-10 max-h-40 overflow-y-auto">
    {patients.map((p) => (
      <div
        key={p._id}
        onClick={() => fillForm(p)}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        {p.patientName} - {p.phone} -{p?.address}
      </div>
    ))}
  </div>
)}

        
            </div>
          </div>
            <div>
            <label className="block font-small">Date Of Birth /Age <span className="text-red-500">*</span></label>
            <input
              type="age"
              name="age"
              value={form?.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              required
            />
          </div>
        

          <div>
            <label className="block font-small">Address <span className="text-red-500">*</span></label>
            <input
              type="address"
              name="address"
              value={form?.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              required
            />
          </div>

    <div> 
            <label className="block font-small">Reason For Today Visit <span className="text-red-500">*</span></label>
            <textarea
              type="text"
              name="reasonForVisit"
              value={form?.reasonForVisit}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              // required
            />
          </div>
           <div style={{
            textAlign:'center',
            width:'100%',
            // backgroundColor:'red'
           }}>
            <label className="block text-xl pt-4">Gender <span className="text-red-500">*</span></label>

          <div className="flex  justify-around w-full gap-3">
            <div className="flex items-center  gap-2 py-1">
          <label>
    <input
      type="radio"
      name="gender"
      value="Male"
      checked={form.gender === "Male"}
      onChange={handleChange}
    />
   <span className="pl-2 text-xl"> Male</span>
  </label>
          </div>

            <div className="flex items-center gap-2 py-3">
            <label>
    <input
      type="radio"
      name="gender"
      value="Female"
      checked={form.gender === "Female"}
      onChange={handleChange}
    />
    
   <span className="pl-2 text-xl"> Female</span>

  </label>
          </div>
              <div className="flex items-center gap-2 py-3">
            <label>
    <input
      type="radio"
      name="gender"
      value="Other"
      checked={form.gender === "Other"}
      onChange={handleChange}
    />
    
   <span className="pl-2 text-xl"> Other</span>

  </label>
          </div>
          </div>
          </div>
         </div>

        <div className="flex items-center gap-5 p-5">
     <div className="flex items-center gap-5 p-5">
  <button
    type="button"
    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded transition"
    onClick={() => {
      setForm({
        patientName: "",
        dateOfBirth: "",
        age: "",
        reasonForVisit: "",
        address: "",
        phone: "",
        gender: "",
        patientCode: "",
      });
      setSearchPatientCode("");
      setSearchPhone("");
    }}
  >
    Reset
  </button>
</div>

     <button
  type="submit"
  style={{
    backgroundColor: "var(--main-color--)",
    color: "white",
    
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
  }}
  className="hover:bg-opacity-80 transition"
>
  Add Appointment
</button>

        </div>
        </form>
        </div>
      
      </div>
    </div>
  </>
  
};

export default BookAppoitment