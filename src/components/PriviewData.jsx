import React, { useEffect } from "react";

const PriviewData = ({ data }) => {
  const { patientInfo, selectedMedicines } = data;

  useEffect(() => {
    // Trigger print when the page loads
    window.print();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg mt-4 print:shadow-none print:p-2 print:m-0">
      <h1 className="text-2xl font-bold text-center text-[#004B29] mb-4">Prescription Preview</h1>

      {/* Patient Info */}
      <div className="border p-4 mb-4 rounded">
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Age:</strong> {patientInfo.age}</p>
        <p><strong>Reason:</strong> {patientInfo.reason}</p>
        <p><strong>Symptoms:</strong> {patientInfo.symptoms}</p>
      </div>

      {/* Medicine List */}
      <div className="space-y-4">
        {selectedMedicines.map((item, index) => (
          <div key={index} className="p-4 border rounded bg-[#f5f5f5]">
            <p className="font-semibold text-[#004B29]">{item.name}</p>
            <p>Dosage: {item.dosage}</p>
            <p>Frequency: {item.frequency} time(s) a day</p>
          </div>
        ))}
      </div>

      {/* Print Button (Only shown when not in print mode) */}
      <div className="mt-6 flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-[#004B29] hover:bg-[#005d34] text-white py-2 px-4 rounded shadow"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PriviewData;
