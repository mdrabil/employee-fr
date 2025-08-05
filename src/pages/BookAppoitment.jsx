import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CreatePatient } from "../api/PatientApi";
import { toast } from "react-toastify";
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
});


  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
  
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

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




  return <>
 <div className="mt-5 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg  w-full max-w-4xl">
<div className="bg-[#004B29] flex items-center justify-between px-5 py-3 rounded-t-lg">

        <h2 className="text-xl  text-white  ">
          Make An Appointment
        </h2>
        <div>
            <IoCloseOutline className="text-white" />
        </div>
      </div>
      <div className="py-4 px-3">
        <h2 className="text-xl py-0.3  inline-block border-b-1 border-[#004B29]">
  Patient Information
</h2>

      </div>

        <div className="py-3 px-6">
  <form onSubmit={handleSubmit} className="space-y-4 ">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6" 
        //  style={{
        //     display:'grid',
        //     gridTemplateColumns:'repeat(3,1fr)',
        //     gap:'30px'
        //  }}
         >
             <div>
            <label className="block font-small">Patient Name</label>
          <input
  type="text"
  name="patientName"
  value={form?.patientName}
  onChange={handleChange}
  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
  required
/>

          </div>
            <div>
            <label className="block font-small">Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form?.dateOfBirth}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              required
            />
          </div>
            <div>
            <label className="block font-small">Reason For Today Visit</label>
            <input
              type="text"
              name="reasonForVisit"
              value={form?.reasonForVisit}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              required
            />
          </div>

          <div>
            <label className="block font-small">Address</label>
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
            <label className="block font-small">Phone no.</label>
            <div className="relative">
           <input
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
/>

              {/* <button
                type="button"
                className="absolute right-3 top-3 text-sm text-orange-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button> */}
            </div>
          </div>

          {/* <div>
            <label className="block font-small">Previous Medical Record</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="customer">Customer</option>
            </select>
          </div> */}
<div></div>
           <div>
            <label className="block font-small">Gender</label>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 py-3">
          <label>
    <input
      type="radio"
      name="gender"
      value="Male"
      checked={form.gender === "Male"}
      onChange={handleChange}
    />
    Male
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
    Female
  </label>
          </div>
          </div>
          </div>
         </div>

        <div className="flex items-center gap-5 p-5">
              <button
            type="submit"
            className=" bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded transition"
        onClick={()=> setForm({
      patientName: "",
      dateOfBirth: "",
      age: "",
      reasonForVisit: "",
      address: "",
      phone: "",
      gender: "",
      patientCode: "",
    })}  >
            Reset
          </button>
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