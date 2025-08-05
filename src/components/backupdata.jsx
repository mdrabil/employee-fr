// import './App.css'
import headerImg from '../assets/images/header.jpg'
import mainImg from '../assets/images/main.jpg'
import footerImg from '../assets/images/footer.jpg'


const PriviewData = ({ userInformation, addmedicines, open, close }) => {

  const currentDate = new Date().toLocaleDateString()


  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    //   <div className="bg-white rounded shadow-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]">
    //     <div className="flex justify-between items-center mb-4">
    //       <h2 className="text-lg font-semibold">🧾 Patient Preview</h2>
    //       <button onClick={close} className="text-red-500 text-xl font-bold hover:text-red-700">
    //         &times;
    //       </button>
    //     </div>

    //     <div className="space-y-4">
    //       <div>
    //         <h3 className="font-semibold text-gray-700">👤 Patient Info</h3>
    //         <p><strong>Name:</strong> {userInformation?.patientName || '--'}</p>
    //         <p><strong>Age:</strong> {userInformation?.dateOfBirth || '--'}</p>
    //         <p><strong>Reason:</strong> {userInformation?.reasonForVisit || '--'}</p>
    //         {/* Add more info as needed */}
    //       </div>

    //       <div>
    //         <h3 className="font-semibold text-gray-700">💊 Medicines</h3>
    //         <table className="w-full text-left border border-gray-200">
    //           <thead className="bg-gray-100 text-sm">
    //             <tr>
    //               <th className="p-2 border">#</th>
    //               <th className="p-2 border">Name</th>
    //               <th className="p-2 border">Dose</th>
    //               <th className="p-2 border">Frequency</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {addmedicines.map((med, idx) => (
    //               <tr key={idx} className="text-sm">
    //                 <td className="p-2 border">{idx + 1}</td>
    //                 <td className="p-2 border">{med.name}</td>
    //                 <td className="p-2 border">{med.dose || '--'}</td>
    //                 <td className="p-2 border">
    //                   {Object.entries(med.frequency || {}).map(([time, meals]) => {
    //                     const labels = [];
    //                     if (meals.beforeMeal) labels.push(`${time} (Before)`);
    //                     if (meals.afterMeal) labels.push(`${time} (After)`);
    //                     return labels.join(', ');
    //                   }).join(', ') || '--'}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>

    //   </div>
    // </div>

    
    <div className="a4-container">
      {/* First Section - Header Image */}
      <div className="header-section">
        <img src={headerImg} alt="Header" className="header-image" />
      </div>

      {/* Second Section - Personal Information */}
      <div className="info-section">
        <div className="info-grid">
          <div className="info-item">
            <label>Name:</label>
            <input type="text" /> {userInformation?.patientName || '--'}
          </div>
          <div className="info-item">
            <label>S.No:</label>
            <input type="text" />
          </div>
          <div className="info-item">
            <label>Date of Birth:</label>
            <input type="text" />
          </div>
          <div className="info-item">
            <label>Date:</label>
            <input type="text" />
          </div>
        </div>
      </div>

      {/* Third Section - Main Image */}
      <div className="main-section">
        <img src={mainImg} alt="Main" className="main-image" />
      </div>

      {/* Fourth Section - Footer Image */}
      <div className="footer-section">
        <img src={footerImg} alt="Footer" className="footer-image" />
      </div>
    </div>

  );
};


export default PriviewData








