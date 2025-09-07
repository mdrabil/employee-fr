import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { SlCalender } from "react-icons/sl";
import { FiClock } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import {FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { getEmployeesDetails } from "../api/EmployeeApi";
import { useParams } from "react-router-dom";
import { formatDate } from "../api/CustomApi";
import  {punchInUser,endBreak, punchOut, startBreak, getTodayAttendance, getEmployeeOverallAttendance } from '../api/Attanance'
import LoadingOverlay from "../components/overlayloading/LoadingOverlay";
import { useSelector } from "react-redux";
const EmployeeDashboard = () => {

const  {employeeId} = useParams();
  // const user = useSelector((state) => state.auth.user);
  // const employeeId = user?.employeeId;
  // console.log('emplo')

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [statsall, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Employee Details
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const result = await getEmployeesDetails(employeeId);
      if (result.success) {
        const data = result?.user?.data ? result.user.data : [];
        setEmployees(data);
        // console.log('rabil',result?.user?.data)
      } else {
        setEmployees([]);
      }
    } catch (error) {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Today's Attendance
  const fetchTodayAttendance = async () => {
    if (!employeeId) return;
    try {
      setLoading(true);
      const { data: todayData } = await getTodayAttendance(employeeId);
      setAttendance(todayData?.attendance || null);

      const result = await getEmployeeOverallAttendance(employeeId);
      if (result?.success)
        console.log('over all attandance',result?.data)
       setStats(result?.data?.stats || {});
    } catch (error) {
      setAttendance(null);
      // setStats({});
    } finally {
      setLoading(false);
    }
  };

  // ✅ Actions
  const handlePunchIn = async () => {
    await punchInUser(employeeId);
    fetchTodayAttendance();
  };

  const handlePunchOut = async () => {
    await punchOut(employeeId);
    fetchTodayAttendance();
    fetchEmployees()
  };

  const handleStartBreak = async () => {
    await startBreak(employeeId);
    fetchTodayAttendance();
  };

  const handleEndBreak = async () => {
    await endBreak(employeeId);
    fetchTodayAttendance();
  };

  // ✅ Initial load
  useEffect(() => {
    fetchEmployees();
    fetchTodayAttendance();
  }, [employeeId]);

  const data = [
    { name: "On Time", value: 1254, color: "#16a34a" },
    { name: "Late Attendance", value: 32, color: "#22c55e" },
    { name: "Work From Home", value: 658, color: "#f97316" },
    { name: "Absent", value: 14, color: "#dc2626" },
    { name: "Sick Leave", value: 68, color: "#facc15" },
  ];

  const stats = [
    {
      value: "8.36 / 9",
      label: "Total Hours Today",
      change: (
        <span className="flex items-center gap-2">
          <span className="p-1 bg-green-500 rounded-full">
            <FaArrowUp className="text-white text-sm" />
          </span>
          <span className="text-[#6B7280]">5% This Week</span>
        </span>
      ),
      changeColor: "text-green-500",
      icon: (
        <div className="p-2 bg-[#F26522] rounded-sm">
          <FiClock className="text-white text-sm" />
        </div>
      ),
    },
    {
      value: "10 / 40",
      label: "Total Hours Week",
      // change: "7% Last Week",
      // changeColor: "text-green-500",
      // icon: <MdOutlineDateRange className="text-gray-700 text-lg" />,
      change: (
        <span className="flex items-center gap-2">
          <span className="p-1 bg-green-500 rounded-full">
            <FaArrowUp className="text-white text-sm" />
          </span>
          <span className="text-[#6B7280]">7% Last Week</span>
        </span>
      ),
      changeColor: "text-green-500",
      icon: (
        <div className="p-2 bg-[#212529] rounded-sm">
          <MdOutlineDateRange className="text-white text-sm" />
        </div>
      ),
    },
    {
      value: "75 / 98",
      label: "Total Hours Month",
      // change: "8% Last Month",
      // changeColor: "text-red-500",
      // icon: <FaRegCalendarAlt className="text-blue-500 text-lg" />,
      change: (
        <span className="flex items-center gap-2">
          <span className="p-1 bg-red-500 rounded-full">
            <FaArrowDown className="text-white text-sm" />
          </span>
          <span className="text-[#6B7280]">8% Last Month</span>
        </span>
      ),
      changeColor: "text-red-500",
      icon: (
        <div className="p-2 bg-blue-500 rounded-sm">
          <FaRegCalendarAlt className="text-white text-sm" />
        </div>
      ),
    },
    {
      value: "16 / 28",
      label: "Overtime this Month",
      // change: "6% Last Month",
      // changeColor: "text-red-500",
      // icon: <AiOutlineFieldTime className="text-pink-500 text-lg" />,.
      change: (
        <span className="flex items-center gap-2">
          <span className="p-1 bg-red-500 rounded-full">
            <FaArrowDown className="text-white text-sm" />
          </span>
          <span className="text-[#6B7280]">8% Last Month</span>
        </span>
      ),
      changeColor: "text-red-500",
      icon: (
        <div className="p-2 bg-[#FD3995] rounded-sm">
          <AiOutlineFieldTime className="text-white text-sm" />
        </div>
      ),
    },
  ];

  const projects = [
    {
      name: "Office Management",
      leader: "Karan",
      deadline: "14/01/24",
      tasks: "6/10",
      timeSpent: "65/20 Hrs",
    },
    {
      name: "HR System",
      leader: "Anita",
      deadline: "20/02/24",
      tasks: "8/12",
      timeSpent: "50/30 Hrs",
    },
  ];

  const [tasks] = useState([
    {
      name: "Patient Appointment Booking",
      status: "On Hold",
      members: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
    {
      name: "Private Chat Module",
      status: "Pending",
      members: [
        "https://randomuser.me/api/portraits/men/65.jpg",
        "https://randomuser.me/api/portraits/women/23.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
    {
      name: "Billing Dashboard",
      status: "Completed",
      members: [
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/34.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
    {
      name: "Patient Appointment Booking",
      status: "Inprogress",
      members: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
    {
      name: "Patient Appointment Booking",
      status: "On Hold",
      members: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
  ]);

const skills = [
  { name: "Figma", updated: "15 May 2025",percentage:"90%" },
  { name: "HTML", updated: "10 May 2025",percentage:"60%" },
  { name: "CSS", updated: "12 May 2025" ,percentage:"20%"},
  { name: "JavaScript", updated: "14 May 2025" ,percentage:"80%"},
  { name: "WordPress", updated: "13 May 2025" ,percentage:"90%"},
];


// last section
 const teamMembers = [
    { name: "Alexander Jermia", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Doglas Martini", role: "Product Designer", img: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Daniel Esbella", role: "Project Manager", img: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Daniel Esbella", role: "Team Lead", img: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Stephan Peralt", role: "Team Lead", img: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Andrew Jermia", role: "Project Lead", img: "https://randomuser.me/api/portraits/men/6.jpg" },
  ];

  const notifications = [
    { name: "Lex Murphy", action: "requested access to UNIX", time: "Today at 9:42 AM", file: "EY_review.pdf" },
    { name: "Lex Murphy", action: "requested access to UNIX", time: "Today at 10:00 AM" },
    { name: "Lex Murphy", action: "requested access to UNIX", time: "Today at 10:50 AM", approve: true },
    { name: "Lex Murphy", action: "requested access to UNIX", time: "Today at 12:00 PM" },
    { name: "Lex Murphy", action: "requested access to UNIX", time: "Today at 5:00 PM" },
  ];

  const meetings = [
    { time: "09:25 AM", title: "Marketing Strategy Presentation", type: "Marketing" },
    { time: "09:20 AM", title: "Design Review Hospital, doctors Management Project", type: "Review" },
    { time: "09:18 AM", title: "Birthday Celebration of Employee", type: "Celebration" },
    { time: "09:10 AM", title: "Update of Project Flow", type: "Development" },
  ];

  
  return (
    <div className="bg-[#F9FAFB] Employee">
      {loading && <LoadingOverlay />}
      
   <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
  <div className="w-full sm:w-auto">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">
      Employee Dashboard
    </h2>
    <span className="text-sm text-gray-500 sm:ps-5">
      / Dashboard / <span className="text-gray-800">Employee Dashboard</span>
    </span>
  </div>

  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
    <select className="px-3 py-1 border border-gray-300 rounded-md bg-white w-full sm:w-auto">
      <option>Export</option>
    </select>
    <button className="px-3 py-1 bg-white rounded-md w-full sm:w-auto">2024</button>
    <button className="px-3 py-1 border border-gray-300 bg-white rounded-md w-full sm:w-auto">x</button>
  </div>
</header>


      {/* Red Section */}
      <div className="mx-5 my-1 p-3 rounded-md border border-red-200 bg-[#FFEBEB] text-red-600 text-sm">
        Your Leave Request on 24th April 2024 has been Approved!!!
      </div>

      {/* User Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 px-5 bg-gray-50">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] w-full  lg:col-span-4 ">
          <div className="md:flex items-center gap-4 rounded-t-lg p-4 bg-[#212529]">
            <img
              src={`http://localhost:5000/api/${employees?.profileImage}`}
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-gray-200"
            />
            <div className="text-white">
              <h2 className="font-bold text-lg">{employees?.firstName}</h2>
              <p className="text-sm">
                {/* {employees?.role?.name}{" "} */}
                <span className="text-[#FFC107]">•</span>{" "}
                <span className="font-medium">  {employees?.role?.name}{" "}</span>
              </p>
            </div>
            {/* <img src="/Images/Icon.png" alt="img" className="ml-auto w-5 h-5" /> */}
          </div>

          <div className="space-y-4 text-gray-700 p-4 text-sm">
            <p>
              <span className="font-medium text-[#6B7280]">Phone Number:</span>
              <br /> {employees?.phone}
            </p>
            <p>
              <span className="font-medium text-[#6B7280]">Email Address:</span>
              <br /> {employees?.email}
            </p>
            <p>
              <span className="font-medium text-[#6B7280]">Report Office:</span>
              <br /> Douglas Martini
            </p>
            <p>
              <span className="font-medium text-[#6B7280]">Joined on:</span>
              <br /> {formatDate(employees?.joiningDate,'date')}
            </p>
          </div>
        </div>

        {/* Leave Details with Chart */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] lg:col-span-5">
          <div className="flex justify-between items-center border-b border-[#E5E7EB] p-4">
            <h3 className="font-bold text-xl text-[#202C4B]">Leave Details</h3>
            <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
              <SlCalender /> 2024
            </span>
          </div>

          <div className="md:flex items-center gap-4 p-4">
            {/* List */}
            <div className="md:w-1/2">
              <ul className="space-y-2 text-sm">
                {data.map((d, i) => (
                  <li key={i} className="flex text-base items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ background: d.color }}
                    ></span>
                    <span className="text-[#6B7280]">
                      <span className="text-[#111827] font-semibold">
                        {d.value}
                      </span>{" "}
                      {d.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chart */}
            <div className="h-56 md:w-1/2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-sm text-[#6B7280] font-medium px-4 pb-4">
            ✔ Better than 85% of Employees
          </p>
        </div>

        {/* Leave Summary */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg lg:col-span-3">
          <div className="flex justify-between border-b border-[#E5E7EB] p-4 items-center">
            <h2 className="font-bold  whitespace-nowrap text-lg text-[#202C4B]">Leave Summary</h2>
            <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
              <SlCalender /> 2024
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 p-4 text-sm text-[#202C4B]">
            <div>
              <span>Total Leaves:</span>
              <span className="font-semibold text-lg block">16</span>
            </div>
            <div>
              <span>Taken:</span>
              <span className="font-semibold text-lg block">10</span>
            </div>
            <div>
              <span>Absent:</span>
              <span className="font-semibold text-lg block">02</span>
            </div>
            <div>
              <span>Request:</span>
              <span className="font-semibold text-lg block">0</span>
            </div>
            <div>
              <span>Worked Days:</span>
              <span className="font-semibold text-lg block">240</span>
            </div>
            <div>
              <span>Loss of Pay:</span>
              <span className="font-semibold text-lg block">2</span>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full bg-[#111827] text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
              Apply New Leave
            </button>
          </div>
        </div>
      </div>

      {/* User Status */}
      <div className="py-0 px-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
          {/* Left: Attendance Card */}



<div className="border bg-white rounded-2xl p-6 shadow-lg text-center flex flex-col items-center">
  <h2 className="font-bold text-lg text-gray-700 mb-3">Attendance</h2>

  {/* Time Info */}
  <p className="text-md text-gray-600 font-medium">
    {attendance?.checkIn
      ? `Punched In: ${new Date(attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : "Not Punched In"}
  </p>

  {/* Circle Chart */}
  <div className="mt-4 w-24 h-24 border-[6px] border-green-400 rounded-full flex items-center justify-center text-gray-700 font-bold text-base">
    {attendance?.checkOut
      ? `${attendance.totalHours.toFixed(2)}h`
      : "⏳"}
  </div>

  {/* Production Hours */}
  {attendance?.checkIn && (
    <span className="mt-3 bg-black text-white text-xs px-4 py-1.5 rounded-md font-semibold">
      Production: {attendance?.totalHours || 0} hrs
    </span>
  )}

  {/* Warning / Info */}
  {!attendance?.checkIn && (
    <p className="text-red-500 text-sm font-semibold mt-3">
      ⚠ Please Punch In
    </p>
  )}

  {/* Buttons */}
  <div className="flex gap-2 mt-5 flex-wrap justify-center">
    {!attendance?.checkIn && (
      <button
        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-md shadow-sm"
        onClick={() => {
          handlePunchIn();
          toast.success("✅ Punched In successfully!");
        }}
      >
        Punch In
      </button>
    )}

    {attendance?.checkIn && !attendance?.checkOut && (
      <>
       <div className="flex items-center gap-4">
         <button
          className={`text-white text-sm px-3 py-1.5 rounded-md shadow-sm ${
            attendance.breaks?.slice(-1)[0]?.start && !attendance.breaks?.slice(-1)[0]?.end
              ? "bg-orange-300 cursor-not-allowed opacity-50"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={attendance.breaks?.slice(-1)[0]?.start && !attendance.breaks?.slice(-1)[0]?.end}
          onClick={() => {
            handleStartBreak();
            toast.info("☕ Break Started");
          }}
        >
          Break In
        </button>

        <button
          className={`text-white text-sm px-3 py-1.5 rounded-md shadow-sm ${
            !attendance.breaks?.slice(-1)[0]?.start || attendance.breaks?.slice(-1)[0]?.end
              ? "bg-yellow-300 cursor-not-allowed opacity-50"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          disabled={!attendance.breaks?.slice(-1)[0]?.start || attendance.breaks?.slice(-1)[0]?.end}
          onClick={() => {
            handleEndBreak();
            toast.info("✅ Break Ended");
          }}
        >
          Break Out
        </button>
       </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md shadow-sm"
          onClick={() => {
            handlePunchOut();
            toast.success("🛑 Punched Out successfully!");
          }}
        >
          Punch Out
        </button>
      </>
    )}

    {attendance?.checkOut && (
      <p className="text-green-600 font-semibold text-sm">✅ Work Finished</p>
    )}
  </div>
</div>





  

          {/* Right: Stats + Timeline */}
          <div className="flex flex-col gap-4 md:col-span-2">
            {/* Stats Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((item, idx) => (
    <div
      key={idx}
      className="bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-sm text-start"
    >
      <div className="flex justify-start mb-2">{item.icon}</div>
      <p className="font-bold text-2xl text-[#202C4B]">{item.value}</p>
      <p className="text-sm text-gray-600">{item.label}</p>
      <p className={`text-xs border-t border-[#E5E7EB] py-2 mt-3 ${item.changeColor}`}>
        {item.change}
      </p>
    </div>
  ))}
</div>


            {/* Timeline Summary */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 text-center mb-4">
                <div>
                  <p className="font-bold md:text-2xl text-xl text-yellow-400">{statsall?.totalHours}</p>
                  <p className="text-xs text-gray-500">Total Working Hours</p>
                </div>
              
                <div>
                  <p className="font-bold md:text-2xl text-xl text-green-500">{statsall?.totalBreak}</p>
                  <p className="text-xs text-gray-500">Break Hours</p>
                </div>
                <div>
                  <p className="font-bold md:text-2xl text-xl text-blue-500">{statsall?.overtime}</p>
                  <p className="text-xs text-gray-500">Overtime</p>
                </div>
              </div>

          <div className="overflow-x-auto">
  <div className="min-w-[300px] h-5 flex rounded-sm overflow-hidden">
    {(() => {
      // Safe converter "Xh Ymin" => decimal hours
      const toDecimal = (str) => {
        if (!str) return 0;
        const match = str.match(/(\d+)h\s*(\d+)min/);
        if (!match) return 0;
        const hours = parseInt(match[1], 10) || 0;
        const mins = parseInt(match[2], 10) || 0;
        return hours + mins / 60;
      };

      const working = toDecimal(statsall?.totalHours);   // "0h 7min" => 0.12
      const breaks = toDecimal(statsall?.totalBreak);    // e.g. "0h 0min"
      const overtime = toDecimal(statsall?.overtime);    // e.g. "0h 0min"

      const total = working + breaks + overtime;
      if (total === 0) {
        // agar sab 0 ho, ek dummy bar dikhado
        return <div className="bg-gray-300 flex-1"></div>;
      }

      return (
        <>
          {working > 0 && (
            <div
              className="bg-yellow-400"
              style={{ flex: working }}
              title={`Working Hours: ${stats?.totalHours}`}
            ></div>
          )}
          {breaks > 0 && (
            <div
              className="bg-green-500"
              style={{ flex: breaks }}
              title={`Break Hours: ${stats?.totalBreak}`}
            ></div>
          )}
          {overtime > 0 && (
            <div
              className="bg-blue-500"
              style={{ flex: overtime }}
              title={`Overtime: ${stats?.overtime}`}
            ></div>
          )}
        </>
      );
    })()}
  </div>

  {/* Time Labels */}
  <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-2">
    <span>0h</span>
    <span>4h</span>
    <span>8h</span>
    <span>12h</span>
    <span>16h</span>
    <span>20h</span>
    <span>24h</span>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* projects & tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4  px-5 bg-gray-50">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] w-full lg:col-span-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
            <h2 className="font-semibold text-2xl text-gray-700">Projects</h2>
            <select className=" rounded-md px-3 py-1 text-sm">
              <option>Ongoing Projects</option>
              <option>Completed Projects</option>
            </select>
          </div>

          {/* Projects Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-5 border-[#E5E7EB] border rounded-lg "
              >
                <h3 className="font-semibold text-xl text-[#202C4B] mb-4">
                  {project.name}
                </h3>

                {/* Leader */}
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.JAAd31mxF33HqZEgYq9zgAHaHv?pid=Api&P=0&h=180"
                    alt="profile"
                    className="w-12 h-12 rounded-full border border-gray-200"
                  />
                  <div>
                    <p className="font-medium whitespace-nowrap  text-gray-800">
                      {project.leader}
                    </p>
                    <p className="text-sm text-gray-500">Project Leader</p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
                    alt="deadline"
                    className="w-12 h-12 rounded-full border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {project.deadline}
                    </p>
                    <p className="text-sm text-gray-500">Deadline</p>
                  </div>
                </div>

                {/* Tasks */}
               <div className="flex items-center gap-3 mb-5 bg-gray-50 rounded-md py-3 px-1 border-dashed border-[#E5E7EB] border-2">
  <img
    src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
    alt="tasks"
    className="w-8 h-8 rounded-full border border-[#E5E7EB]"
  />
  <div className="flex items-center justify-between w-full">
    <p className="font-medium text-sm text-gray-800">
      Tasks: {project.tasks}
    </p>
    <div className="flex -space-x-3">
      <img
        src="https://randomuser.me/api/portraits/men/34.jpg"
        alt="img"
        className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]"
      />
      <img
        src="https://randomuser.me/api/portraits/men/35.jpg"
        alt="img"
        className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]"
      />
      <img
        src="https://randomuser.me/api/portraits/women/36.jpg"
        alt="img"
        className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]"
      />
      <div className="w-6 h-6 rounded-full border-2 border-[#E5E7EB] text-white text-xs font-bold flex items-center justify-center bg-[#F26522]">
        +2
      </div>
    </div>
  </div>
</div>


                {/* Time Spent */}
                <div className="flex items-center justify-between bg-gray-200 rounded-md px-4 py-4">
                  <span className="text-sm font-medium text-gray-600">
                    Time Spent
                  </span>
                  <span className="text-sm font-semibold text-[#202C4B]">
                    {project.timeSpent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] w-full lg:col-span-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
            <h2 className="font-semibold text-2xl text-gray-700">Task</h2>
            <select className=" rounded-md px-3 py-1 text-sm">
              <option>All Projects</option>
            </select>
          </div>

          {/* Task List */}
          <div className="divide-y p-6">
            {tasks.map((task, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 border-[#E5E7EB] my-4 mt-0 border rounded-md items-center px-3 py-3 hover:bg-gray-50 transition"
              >
                {/* Left side */}
                <div className="md:col-span-8 col-span-12 pb-2 md:pb-0 flex items-center gap-2 font-medium text-gray-700">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    📌
                  </span>
                  {task.name}
                </div>

                {/* Right side */}
                <div className="md:col-span-4 col-span-12 flex items-center justify-between">
                  <p
                    className={`text-sm px-2 rounded-md font-semibold ${
                      task.status === "On Hold"
                        ? "text-[#FD3995] bg-[#FFDBEC]"
                        : task.status === "Inprogress"
                        ? "text-[#AB47BC] bg-[#F7EEF9]"
                        : task.status === "Pending"
                        ? "text-[#3B7080] bg-[#EDF2F4]"
                        : "text-green-500 bg-[#03C95A1A]"
                    }`}
                  >
                    • {task.status}
                  </p>

                  {/* Multiple profiles */}
                  <div className="flex -space-x-3">
                    {task.members.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="profile"
                        className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    {/* Performance & Skills Section */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 py-0">

  {/* Performance Card */}
  <div className="bg-white rounded-lg border border-gray-200 lg:col-span-5 shadow-sm">
    <div className="flex justify-between items-center border-b border-gray-200 p-4">
      <h3 className="font-bold text-xl text-gray-900">Performance</h3>
     <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
              <SlCalender /> 2024
            </span>
    </div>
    <div className="p-4 space-y-4">
      <h2 className="p-2 bg-gray-100 rounded-md text-gray-800 font-semibold">
        98% <span className=" p-1 px-2 bg-green-200 text-green-500 text-xs rounded-lg">12%</span> vs last year
      </h2>
      <div className="flex gap-4">
        {/* Y-axis Labels */}
        <div className="flex flex-col justify-between text-sm text-gray-500">
          <p>60K</p>
          <p>50K</p>
          <p>40K</p>
          <p>30K</p>
          <p>20K</p>
          <p>10K</p>
        </div>
        {/* Chart Image */}
        <div className="flex-1">
          <img src="public/Images/Group (1).png" alt="Performance Chart" className="w-full h-auto"/>
        </div>
      </div>
    </div>
  </div>

  {/* Skills Card */}
  <div className="bg-white rounded-lg border border-gray-200 lg:col-span-4 shadow-sm">
    <div className="flex justify-between items-center border-b border-gray-200 p-4">
      <h3 className="font-bold text-xl text-gray-900">My Skills</h3>
      <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
              <SlCalender /> 2024
            </span>
    </div>

    <div className="p-4 space-y-3">
   {skills.map((skill, idx) => (
        <div
          key={idx}
          className="grid grid-cols-12 items-center border-dashed border-[#E5E7EB] border-2 rounded-md px-3 py-2 hover:bg-gray-50 transition"
        >
          {/* Left */}
          <div className="col-span-8  flex items-center gap-2 font-medium text-gray-700">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">📌</span>
            <div>
              <span>{skill.name}</span>
              <p className="text-xs text-gray-500">{skill.updated}</p>
            </div>
          </div>
          {/* Right (circle/percentage placeholder) */}
          <div className="col-span-4 flex justify-end items-center">
            <div className="w-10 h-10  rounded-full border-2 border-blue-500 flex items-center justify-center text-sm font-semibold text-blue-500">
              {skill.percentage}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Small Widgets */}
  <div className="lg:col-span-3 flex flex-col gap-4">
    {/* Team Birthday */}
    <div className="bg-gray-800 text-white rounded-lg p-4 text-center">
      <h3 className="font-bold mb-2 text-2xl ">Team Birthday</h3>
 <div className="align-center flex justify-center">
       <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="img" className="size-25 rounded-full" />
 </div>
      <p className="font-semibold text-xl">Andrew Jermia</p>
      <p className="text-lg text-[#6B7280] ">IOS Developer</p>
      <button className="mt-3 px-4 py-2 bg-orange-500 rounded-md text-white text-md font-bold">Send Wishes</button>
    </div>

    {/* Leave Policy */}
    <div className="bg-gray-600 text-white rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-xl font-semibold">Leave Policy</p>
        <p className="text-md">Last Updated: Today</p>
      </div>
      <button className="px-3 py-1 bg-white text-gray-700 rounded-md text-md">View All</button>
    </div>

    {/* Next Holiday */}
    <div className="bg-yellow-400 text-[#202C4B] rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-xl font-semibold">Next Holiday</p>
        <p className="text-md">Diwali, 15 Sep 2025</p>
      </div>
      <button className="px-3 py-1 bg-white text-gray-900 rounded-md text-md">View All</button>
    </div>
  </div>

</div>


{/* last taem section */}
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 py-4">
      {/* Team Members */}
      <div className="lg:col-span-4 bg-white rounded-lg shadow">
        {/* <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Team Members</h3>
          <button className="text-sm text-blue-500">View All</button>
        </div> */}
          <div className="flex justify-between border-b border-[#E5E7EB] p-4 items-center">
            <h2 className="font-bold text-xl text-[#202C4B]">Team Members</h2>
            <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
           View All
            </span>
          </div>
        <ul className="space-y-5 p-3 py-5">
          {teamMembers.map((member, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={member.img} alt={member.name} className="w-13 h-13 rounded-full" />
                <div>
                  <p className="text-gray-900 text-md font-medium">{member.name}</p>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
              <div className="flex gap-4 mr-3">
                <FaUser className="text-gray-400" />
              <FaPhone className="text-gray-400" />
              <FaEnvelope className="text-gray-400" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications */}
      <div className="lg:col-span-4 bg-white rounded-lg shadow">
        {/* <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
          <button className="text-sm text-blue-500">View All</button>
        </div> */}
        <div className="flex justify-between border-b border-[#E5E7EB] p-4 items-center">
            <h2 className="font-bold text-xl text-[#202C4B]">Notifications</h2>
            <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
           View All
            </span>
          </div>
        <ul className="space-y-5 p-3 py-5">
          {notifications.map((notif, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/7.jpg"
                alt={notif.name}
                className="w-13 h-13 rounded-full mt-1"
              />
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-md">
                  <span className="">{notif.name}</span> {notif.action}
                </p>
                {notif.file && (
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FaFilePdf /> {notif.file}
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-1">{notif.time}</p>
                {notif.approve && (
                  <div className="mt-1 flex gap-2">
                    <button className="px-2 py-1 text-white font-semibold bg-green-500 rounded text-sm">Approve</button>
                    <button className="px-2 py-1 text-white font-semibold bg-red-500 rounded text-sm">Decline</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Meetings Schedule */}
      <div className="lg:col-span-4 bg-white  rounded-lg shadow">
        {/* <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Meetings Schedule</h3>
          <button className="text-sm text-blue-500">Today</button>
        </div> */}
         <div className="flex justify-between border-b border-[#E5E7EB] p-4 items-center">
            <h2 className="font-bold text-xl text-[#202C4B]">Meetings Schedule</h2>
            <span className="text-xs flex items-center gap-2 border border-[#E5E7EB] px-2 py-1 rounded-md text-gray-500">
           Today
            </span>
          </div>
        <ul className="space-y-4 p-3 py-5">
          {meetings.map((meeting, idx) => (
            <li key={idx} className="flex justify-between items-start p-2 rounded ">
              <span className="text-gray-500 text-md  py-3 ps-2 ">{meeting.time}</span>
              <div className="flex-1 ml-3  p-3 bg-gray-100 rounded-md">
                <p className="text-gray-900 text-md font-semibold">{meeting.title}</p>
                <p className="text-gray-400 text-sm">{meeting.type}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </div>
  );
};

export default EmployeeDashboard;