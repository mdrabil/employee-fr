import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CreatePatient, GetAllPatients } from "../api/PatientApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/LoadingSlice";

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

    store.dispatch(setLoading(true));
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
      navigate('/')
    } catch (err) {
      // Error already handled with toast inside CreatePatient
      console.log("Create failed:", err.message);
    } finally {
      store.dispatch(setLoading(false));
    }
  };

  const [allPatients, setAllPatients] = useState([]);
  const [patients, setPatients] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchPatientCode, setSearchPatientCode] = useState("");

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

    if (searchPatientCode) {
      filtered = filtered.filter((patient) =>
        patient.fixedPermanentId?.toLowerCase().includes(searchPatientCode.toLowerCase())
      );
    }
    setPatients(filtered);
  }, [searchName, searchPhone, searchPatientCode, allPatients]);

  // Fill form on suggestion click
  const fillForm = (matched) => {
    setForm({
      patientName: matched.patientName,
      dateOfBirth: matched.dateOfBirth,
      age: matched.age,
      address: matched.address,
      phone: matched.phone,
      gender: matched.gender,
      patientCode: matched.patientCode || "",
      fixedPermanentId: matched?.fixedPermanentId
    });
    setSearchPatientCode('')
    setSearchPhone('')
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex items-center justify-center p-2 md:p-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl">
        <div className="bg-[#004B29] flex items-center justify-between px-3 md:px-5 py-3 gap-2 rounded-t-lg">
          <h2 className="text-base md:text-lg lg:text-xl text-white">
            Make An Appointment
          </h2>
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <IoCloseOutline className="text-xl md:text-2xl" />
          </button>
        </div>
        
        <div className="py-3 md:py-4 px-3 md:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
            {/* Patient Info Title */}
            <h2 className="text-lg md:text-xl font-semibold border-b border-[#004B29] pb-2">
              Patient Information
            </h2>

            {/* Patient ID Input with Dropdown */}
            <div className="relative w-full lg:w-auto">
              <label className="text-sm md:text-base font-medium inline-block mr-2">
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
                className="border rounded px-2 py-1 focus:outline-none focus:ring-1 w-24 md:w-32 lg:w-36 text-sm md:text-base"
              />

              {/* Dropdown */}
              {searchPatientCode && patients.length > 0 && (
                <div className="absolute left-0 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded shadow-md z-20">
                  {patients.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => fillForm(p)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs md:text-sm"
                    >
                      {p.patientName} - {p.phone} - {p.address}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={form.patientName}
                  onChange={(e) => {
                    handleChange(e);
                    setSearchName(e.target.value);
                  }}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700">
                  Phone no. <span className="text-red-500">*</span>
                </label>
                <div className="relative">
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
                    className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
                    required
                  />
                  {searchPhone && patients.length > 0 && (
                    <div className="absolute bg-white border z-10 max-h-40 overflow-y-auto w-full rounded shadow-md">
                      {patients.map((p) => (
                        <div
                          key={p._id}
                          onClick={() => fillForm(p)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs md:text-sm"
                        >
                          {p.patientName} - {p.phone} - {p?.address}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={form?.age}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={form?.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm md:text-base font-medium text-gray-700">
                  Reason For Today Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reasonForVisit"
                  value={form?.reasonForVisit}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base md:text-lg font-medium text-center mb-3">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-center gap-4 md:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={form.gender === "Male"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm md:text-base">Male</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm md:text-base">Female</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={form.gender === "Other"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm md:text-base">Other</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 pt-4">
              <button
                type="button"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 md:px-6 rounded transition-colors text-sm md:text-base"
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

              <button
                type="submit"
                style={{
                  backgroundColor: "var(--main-color--)",
                  color: "white",
                }}
                className="w-full sm:w-auto hover:bg-opacity-80 transition-colors py-2 px-4 md:px-6 rounded text-sm md:text-base"
              >
                Add Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppoitment;