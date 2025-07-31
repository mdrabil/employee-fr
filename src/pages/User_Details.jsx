import React, { useState } from 'react';

const User_Details = () => {
  const [search, setSearch] = useState('');
  const [selectedDawaList, setSelectedDawaList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedDose, setSelectedDose] = useState('');
  const [selectedFreq, setSelectedFreq] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const medicines = [
    { name: 'Paracetamol', doses: ['2.3ml', '4.5ml', '6ml'] },
    { name: 'Ibuprofen', doses: ['2ml', '5ml'] },
    { name: 'Cough Syrup', doses: ['3ml', '5ml'] },
    { name: 'Amoxicillin', doses: ['125mg', '250mg'] },
    { name: 'Azithromycin', doses: ['200mg', '500mg'] },
  ];

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMedicine = () => {
    if (!selectedMedicine || !selectedDose || !selectedFreq) return;

    const newEntry = {
      name: selectedMedicine.name,
      dose: selectedDose,
      frequency: selectedFreq,
    };

    setSelectedDawaList([...selectedDawaList, newEntry]);
    setSelectedMedicine(null);
    setSelectedDose('');
    setSelectedFreq('');
    setSearch('');
  };

  const handleDelete = (index) => {
    const newList = selectedDawaList.filter((_, idx) => idx !== index);
    setSelectedDawaList(newList);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-white shadow-lg rounded-lg space-y-6 mt-6">
      {/* Patient Info */}
      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-900 mb-3">🧑‍⚕️ Patient Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg font-medium text-gray-700">
          <div>Name: <span className="font-semibold text-black">Md Rabil</span></div>
          <div>Age: <span className="font-semibold text-black">56</span></div>
          <div>Reason: <span className="font-semibold text-black">Fever</span></div>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">📝 Kya hua hai?</label>
        <textarea
          placeholder="Symptoms..."
          className="w-full border-2 border-green-300 p-3 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </div>

      {/* Search Medicine */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">🔍 Search Medicine</label>
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

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">💧 Select Dose:</p>
            <div className="flex gap-4 flex-wrap">
              {selectedMedicine.doses.map((dose, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dose"
                    value={dose}
                    checked={selectedDose === dose}
                    onChange={(e) => setSelectedDose(e.target.value)}
                  />
                  <span>{dose}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">⏱️ Frequency:</p>
            <div className="" style={{
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

      {/* Selected Dawa List */}
      {selectedDawaList.length > 0 && (
        <div>
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
                {selectedDawaList.map((dawa, idx) => (
                  <tr key={idx} className="border-b text-sm hover:bg-green-50">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">{dawa.name}</td>
                    <td className="p-2">{dawa.dose}</td>
                    <td className="p-2">{dawa.frequency}</td>
                    <td className="p-2 space-x-2">
                      <button className="px-3 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500 transition">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
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
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t mt-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          🔍 Preview
        </button>
        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
          ✅ Submit
        </button>
      </div>
    </div>
  );
};

export default User_Details;
