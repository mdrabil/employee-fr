import headerImg from '../assets/images/header.jpg';
import mainImg from '../assets/images/main.jpg';
import footerImg from '../assets/images/footer.jpg';
import { useEffect } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const PriviewData = ({ userInformation, addmedicines, open, close }) => {
  const navigate = useNavigate()
  const now = new Date();
  const formatted = `${now.getDate().toString().padStart(2, '0')}/${
    (now.getMonth() + 1).toString().padStart(2, '0')
  }/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  // const formattedDate = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = date.toLocaleString('default', { month: 'short' });
  //   const year = date.getFullYear();
  //   return `${day} ${month} ${year}`;
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.print();
  //   }, 500);
  // }, []);

    useEffect(() => {
    // Wait 500ms for rendering to complete
    const timer = setTimeout(() => {
      window.print();
    }, 500);

    // Navigate after print
    window.onafterprint = () => {
      navigate('/');
    };

    return () => {
      clearTimeout(timer);
      window.onafterprint = null; // cleanup
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-white print:bg-white">
      <div className="w-full min-h-[297mm] relative shadow-lg bg-white p-2 print:p-0 relative">
        {/* Header Image */}
        <div className="w-full top-0 right-0 print:w-full">
          <img src={headerImg} alt="Header" className="print:w-full object-cover" />
        </div>
        <div style={{
          position:'absolute',
          top:'2%',
          right:'5%',
          cursor:'pointer'
        }} onClick={()=>close()}><IoIosCloseCircle /></div>

        {/* Patient Info */}
        <div className=" w-full pt-3">
          <div className='' style={{
            display:'flex',
            alignItems:'center',
          justifyContent:'flex-end',
            // backgroundColor:'red',
          padding:'10px 30px'
            
          }}>
          

          <div><span className="font-bold">S.No:</span> {userInformation?.patientCode || '--'}</div>
          </div>

  <div className='' style={{
            display:'flex',
            alignItems:'center',
          justifyContent:'space-between',
            // backgroundColor:'red',
          padding:'10px 30px'
            
          }}>

          <div className='capitalize'><span className="font-bold ">Name:</span> {userInformation?.patientName || '--'}</div>
          <div><span className="font-bold">Date:</span> {formatted}</div>

          </div>
            <div className='' style={{
            display:'flex',
            alignItems:'center',
          justifyContent:'space-between',
          padding:'10px 30px'
            // backgroundColor:'red',
            
          }}>

          <div><span className="font-bold">Mobile:</span> {userInformation?.phone || '--'}</div>
          <div><span className="font-bold">Age:</span> {userInformation?.age}</div>
          </div>
        </div>

        {/* Rx */}
        <div className="pl-40 text-4xl font-bold text-red-600 my-6" style={{
          fontStyle:'italic'
        }}>
          Rx
        </div>

        {/* Medicines List */}
        <div className="px-6 text-sm space-y-4"  style={{
    backgroundImage: `url(${mainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height:'100%'
  }}
>

          {addmedicines.map((med, idx) => (
            <div key={idx} className="border-b border-dashed pb-2">
              {/* <div className="font-semibold text-base">{idx + 1}. {med.name}  {med?.dose ?  ---med?.dose:''} </div> */}
              <div className="font-semibold text-base">
  {idx + 1}. {med.name} {med?.dose ? ` --- ${med.dose}` : ''}
</div>

              {/* <div><span className="font-medium">Dose:</span> {med.dose || '--'}</div> */}
          <div className="text-sm">
  {
    Object.entries(med.frequency || {})
      .map(([time, meals]) => {
        const timeLabels = {
          morning: "सुबह",
          afternoon: "दोपहर",
          night: "रात",
        };

        const parts = [];
        if (meals.beforeMeal) parts.push(`${timeLabels[time] || time}-खाने से पहले`);
        if (meals.afterMeal) parts.push(`${timeLabels[time] || time}-खाने के बाद`);
        return parts.join(', ');
      })
      .join(', ') || '--'
  }
</div>

            </div>
          ))}
        </div>

        {/* Footer Image */}
        <div className="absolute bottom-0 left-0 w-full">
          <img src={footerImg} alt="Footer" className="w-full object-contain h-28" />
        </div>
      </div>
    </div>
  );
};

export default PriviewData;
