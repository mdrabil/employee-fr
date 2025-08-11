import headerImg from '../assets/images/header.jpg';
import mainImg from '../assets/images/main.jpg';
import footerImg from '../assets/images/footer.jpg';
import { useEffect, useRef } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { DeleteAllMedicinesForPatient } from '../redux/Pmedicine';
import { useDispatch } from 'react-redux';
import { DeletePatient } from '../redux/InitialPatient';
const PrintLayoutFinal = ({ userInformation, addmedicines, open, close, printview,setprintview }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

//   useEffect(() => {
//     if (printview) {
//         console.log('trgger')
//       const timer = setTimeout(() => {
//         window.print()
//         setprintview(false)
//       }, 100)

   

//       return () => {
//         clearTimeout(timer)
//         window.onafterprint = null
//       }
//     }
//   }, [])

//   const printedRef = useRef(false);

  useEffect(() => {
    if (printview) {
      
      const timer = setTimeout(() => {
        window.print();
      }, 500);

      window.onafterprint = () => {
        dispatch(DeleteAllMedicinesForPatient(userInformation?._id));
        dispatch(DeletePatient());
        setprintview(false);
        navigate("/");
     
      };

      return () => {
        clearTimeout(timer);
        window.onafterprint = null;
      };
    }
  }, [printview, dispatch, navigate, userInformation]);

  const now = new Date()
  const formatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`



  return (
<div className="flex flex-col justify-between w-full bg-white print:bg-white" style={{ minHeight: "270mm" }}>
  
  {/* HEADER */}
  <div>
    <img src={headerImg} alt="Header" className="w-full object-cover" />
    {/* Patient Info */}
    <div className="px-8 pt-4">
      <div className="flex justify-end"><b>S.No:</b> {userInformation?.patientCode || '--'}</div>
      <div className="flex justify-between">
        <div className="capitalize"><b>Name:</b> {userInformation?.patientName || '--'}</div>
        <div><b>Date:</b> {formatted}</div>
      </div>
      <div className="flex justify-between">
        <div><b>Mobile:</b> {userInformation?.phone || '--'}</div>
        <div><b>Age:</b> {userInformation?.age}</div>
      </div>
    </div>

    {/* RX */}
    <div className="pl-40 text-4xl font-bold text-red-600 italic my-6">Rx</div>

    {/* Medicines */}
    <div 
      className="px-6 text-sm space-y-4 flex-1"
      style={{
        backgroundImage: `url(${mainImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {addmedicines.map((med, idx) => (
        <div key={idx} className="border-b border-dashed pb-2">
          <div className="font-semibold text-base">
            {idx + 1}. {med.name} {med?.dose ? ` --- ${med.dose}` : ''}
          </div>
          <div className="text-sm">
            {Object.entries(med.frequency || {})
              .map(([time, meals]) => {
                const timeLabels = { morning: "सुबह", afternoon: "दोपहर", night: "रात" };
                const parts = [];
                if (meals.beforeMeal) parts.push(`${timeLabels[time] || time}-खाने से पहले`);
                if (meals.afterMeal) parts.push(`${timeLabels[time] || time}-खाने के बाद`);
                return parts.join(', ');
              })
              .join(', ') || '--'}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* FOOTER */}
  <div>
    <img src={footerImg} alt="Footer" className="w-full object-contain h-28" />
  </div>
</div>

  );
};

export default PrintLayoutFinal;
