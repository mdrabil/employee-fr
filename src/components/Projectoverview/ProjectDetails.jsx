import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa"; // clock/watch icon
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { SiSimpleanalytics } from "react-icons/si";
import { FaUser, FaPaperclip } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlineFilePdf } from "react-icons/ai";
import { BsFileEarmarkText, BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { getSingleProjects } from '../../api/ProjectsApi';
import { formatDateFrontend } from "../../api/CustomApi";
import { getProgressColor } from '../../utils/progressReport';
const ProjectDetails = () => {

   const [loading, setLoading] = useState(false);
    
  
     const [openDropdown, setOpenDropdown] = useState(null);
      const [allProjects, setGetProjects] = useState({});

const {id}= useParams()


    const fetchallProjects = async () => {
        try {
          setLoading(true);
          const result = await getSingleProjects(id);
          if (result.success) {
            const deptArray = result?.projectdata ? result?.projectdata : [];
            setGetProjects(deptArray);
          
          } else {
            setGetProjects([]);
           
          }
        } catch (error) {
          setGetProjects([]);
       
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchallProjects();
      }, [id]);


    const Timeline=    [
                {
                  title: "Project Kickoff",
                  date: "Oct 1, 2023",
                  desc: "Initial project setup, team assignment, and requirements gathering.",
                  color: "bg-green-500",
                },
                {
                  title: "Design Phase Completed",
                  date: "Oct 15, 2023",
                  desc: "Finalized wireframes, mockups, and design specifications.",
                  color: "bg-green-400",
                },
                {
                  title: "Development Milestone",
                  date: "Nov 5, 2023",
                  desc: "Core functionality implementation and initial testing.",
                  color: "bg-yellow-500",
                },
                {
                  title: "Project Completion",
                  date: "Nov 15, 2023",
                  desc: "Final testing, documentation, and client handover.",
                  color: "bg-gray-400",
                },
            ]

              
  return (
     <div className=" text-[#737373] bg-[#F9FAFB]">
      {/* Header */}
      <header className="flex flex-col sm:flex-row px-5 py-3 justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div className="w-full sm:w-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 m-0">
            Project Details
          </h2>
          <span className="text-sm text-gray-500 block sm:inline sm:ps-5">
            / Employee / <span className="text-gray-800">Project Detail</span>
          </span>
        </div>
      </header>

      {/* Project Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 px-5 py-5 bg-white font-medium">
        {/* Left: Title + Description + Tags */}
    
          <div className="">
            {/* Left border with star title */}
            <div className="relative pl-3">
              <div className="absolute top-0 left-0 h-full w-[4px] rounded-full bg-yellow-500"></div>
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-1">
              {allProjects?.name || 'Figma Design System'}  {" "}
                <FaStar className="text-yellow-500 ms-1" size={16} />
              </h3>
              <p className="text-sm text-gray-500">
                {/* UI component library for design system */}
                {allProjects?.description?.slice(0,10)}
              </p>
            </div>

            {/* Status tags */}
        <div className='gap-3 pl-3 flex mt-3'>
                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-yellow-100 text-yellow-700">
              In Progress
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-lg bg-red-100 text-red-700">
              High Priority
            </span>
        </div>
          </div>
    

        {/* Right: Deadline & Start Date */}
        <div className="flex flex-col gap-2 items-start lg:items-end text-sm">
          {/* Deadline */}
          <div className="flex items-center gap-2 text-gray-600">
            <AiTwotoneCalendar /> Deadline: { formatDateFrontend(allProjects?.deadline)}
          </div>
          {/* Start Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <FaRegClock /> Started: { formatDateFrontend(allProjects?.startDate)}
          </div>
        </div>
      </div>
  {/* progress info cards */}
        <div className='border-b border-[#F3F4F6]'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5 pt-1 pb-5 w-full bg-white">
    {/* Progress */}
    <div className=" rounded-lg bg-[#F9FAFB] p-4">
      <p className="text-sm text-gray-600 font-medium mb-2">Progress</p>
      <div className="flex items-center justify-between mb-1">
        <span className="text-lg font-bold text-gray-800">{allProjects?.progress}%</span>
        <span className="text-xs text-gray-500">24 tasks (16 completed)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        {/* <div className="bg-gray-800 h-2 rounded-full w-[65%]"></div> */}


  <div className="w-full bg-gray-200 h-2 rounded">
   <div
      className={`${getProgressColor(allProjects?.progress)} h-2 rounded`}
      style={{ width: `${allProjects?.progress}%` }}
    >
  </div>
</div>
        
        
      </div>
    </div>

    {/* Budget */}
    <div className=" rounded-lg bg-[#F9FAFB] p-4">
      <p className="text-sm text-gray-600 font-medium mb-2">Budget</p>
      <p className="text-lg font-bold text-gray-800">$12,500</p>
      <span className="text-xs text-gray-500">Client: Acme Inc.</span>
    </div>

    {/* Team */}
    <div className=" rounded-lg bg-[#F9FAFB] p-4">
      <p className="text-sm text-gray-600 font-medium mb-2">Team</p>
      <div className="flex items-center -space-x-2 mb-1">


  {allProjects?.employees?.map((emp, i) => (
    <div key={i} className="relative group">
      {/* Profile Image */}
      <img
        src={`http://localhost:5000/api/${emp?.profileImage}`}
        alt={emp?.firstName}
        className="w-10 h-10 rounded-full border-2 border-white object-cover"
      />

      {/* Tooltip on hover */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max px-3 py-1 
                      bg-gray-800 text-white text-xs rounded-md opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        <p className="font-semibold">{emp?.firstName}</p>
        <p className="text-gray-300">{emp?.role?.name}</p>
      </div>
    </div>
  ))}
      </div>
      <span className="text-xs text-gray-500">{allProjects?.employees?.length} team members</span>
    </div>

    {/* Activity */}
    <div className=" rounded-lg bg-[#F9FAFB] p-4">
      <p className="text-sm text-gray-600 font-medium mb-2">Activity</p>
      <p className="text-lg font-bold text-gray-800">128</p>
      <span className="text-xs text-gray-500">Last updated: Today</span>
    </div>
  </div>
  </div>

<div className="flex flex-col lg:flex-row justify-between gap-4 px-5 py-3  font-medium">

  <div className="flex flex-wrap items-center gap-2 bg-[#F5F5F5] p-1.5 rounded w-fit self-start lg:self-auto">
    <button className="flex text-[#0A0A0A] items-center gap-2  bg-white px-3 py-1 rounded-md">
     <FaRegFileAlt /> Overview
    </button>
    <button className="flex items-center gap-2 px-3 py-1 rounded-md">
    <IoMdCheckboxOutline /> Tasks
    </button>
      <button className="flex items-center gap-2 px-3 py-1 rounded-md">
    <AiOutlineTeam /> Team
    </button>
     <button className="flex items-center gap-2 px-3 py-1 rounded-md">
    <BiCommentDetail /> Commants
    </button>
     <button className="flex items-center gap-2 px-3 py-1 rounded-md">
   <SiSimpleanalytics /> Analytics
    </button>
  </div>
</div>

   <div className="px-5 py-3 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Description */}
          <div  className="bg-white rounded-lg shadow-xs border border-[#E5E5E5] p-6 pt-4">
            <h2 className="text-2xl pb-1  text-[#0A0A0A] font-semibold ">
              Project Description
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Detailed information about the project
            </p>
            <p className="text-md text-gray-600 mb-4">
              This is a comprehensive project aimed at UI component library for
              design system. The project involves multiple phases including
              research, design, development, testing, and deployment.
            </p>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6" >
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Project Goals</h4>
                <ul className="list-disc list-inside text-md text-gray-600 space-y-1.5">
                  <li>Create a comprehensive design system</li>
                  <li>Implement responsive components</li>
                  <li>Ensure accessibility compliance</li>
                  <li>Develop documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Key Deliverables
                </h4>
                <ul className="list-disc list-inside text-md fw-medium text-gray-600 space-y-1.5">
                  <li>Component library</li>
                  <li>Style guide</li>
                  <li>Implementation examples</li>
                  <li>Technical documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="bg-white rounded-lg shadow-xs border border-[#E5E5E5] py-7 pt-4 p-6">
           <div>
             <h2  className="text-2xl pb-1  text-[#0A0A0A] font-semibold ">
              Project Timeline
            </h2>
            <p className="text-sm text-gray-500 mb-11">
              Key milestones and deadlines
            </p>
           </div>

            <div className="space-y-4">
{Timeline.map((item, idx) => (
  <div key={idx} className="flex items-start gap-3 relative">
    {/* Circle + Line */}
    <div className="relative flex flex-col  pb-6 items-center">
      {/* Circle */}
      <div className={`w-4 h-4 rounded-full mt-1.5 ${item.color}`}></div>

      {/* Vertical Line */}
      {idx !== Timeline.length - 1 && (
        <div className="absolute top-5.5 left-1/2 -translate-x-1/2 w-[1px]  bg-[#E5E5E5] h-full"></div>
      )}
    </div>

    {/* Text section */}
    <div className="space-y-1.5 pb-6"> {/* pb so line shows till bottom */}
      <h4 className="text-sm font-semibold text-[#0A0A0A]">
        {item.title}{" "}
        <span className="font-normal px-1 text-gray-500">
          {item.date}
        </span>
      </h4>
      <p className="text-sm text-gray-600">{item.desc}</p>
    </div>
  </div>
))}

            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-xs border pt-4  border-[#E5E5E5] p-6">
            <h2 className="text-2xl mb-8 font-semibold text-[#0A0A0A]">
              Project Details
            </h2>
            <ul className="text-sm text-gray-600 mt-3 space-y-3">
              <li className='flex gap-1.5 flex-col' >
                <span className='text-[#6B7280] font-medium'>Client:</span> <span className='text-[#0A0A0A]'>{allProjects?.client?.name}</span>
              </li>
              <li className='flex gap-1.5 flex-col' >
                <span className='text-[#6B7280] font-medium'>Budget:</span><span className='text-[#0A0A0A]'> $12,500 </span>
              </li>
              <li className="flex gap-1.5 flex-col">
               <span className='text-[#6B7280] font-medium'>Start Date:</span><span className='text-[#0A0A0A]'>{allProjects?.startDate}</span>
              </li>
              <li className="flex gap-1.5 flex-col">
                <span className='text-[#6B7280] font-medium'>Deadline:</span> <span className='text-[#0A0A0A]'> {allProjects?.deadline} </span>
              </li>
              <li className="flex gap-1.5  flex-col">
               <span className='text-[#6B7280] font-medium'>Project Manager:</span> 
              <div className='flex flex-wrap gap-2 items-center'>
                 <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="img" className='size-[35px] rounded-full' /> 
                <span className='text-[#0A0A0A]'>Alex Morgan</span>
              </div>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg  shadow-xs border border-[#E5E5E5] pt-4 p-6">
            <h2 className="text-2xl mb-8 font-semibold text-[#0A0A0A]">
              Recent Activity
            </h2>
            <div className="mt-3 space-y-4 text-sm text-gray-600">
              <div className='flex flex-wrap gap-2' >
                <div>
                    <img className=' size-[32px] rounded-full' src="https://randomuser.me/api/portraits/men/45.jpg" alt="img" />
                </div>
                <div className='flex flex-col'>
                    <span className='text-[#0A0A0A] font-medium '>Jessica Chen  updated the design files</span>
                <span >Today at 10:30 AM</span>
                </div>
              </div>
                  <div  className='flex flex-wrap gap-2' >
                <div>
                    <img className=' size-[32px] rounded-full' src="https://randomuser.me/api/portraits/men/45.jpg" alt="img" />
                </div>
                <div className='flex flex-col'>
                <span className='text-[#0A0A0A] font-medium' >Alex Morgan completed 3 tasks</span> 
                <span >Yesterday at 4:15 PM</span>
                </div>
              </div>
                 <div className='flex flex-wrap gap-2' >
                <div>
                    <img className=' size-[32px] rounded-full' src="https://randomuser.me/api/portraits/men/45.jpg" alt="img" />
                </div>
                <div className='flex flex-col'>
                 <span  className='text-[#0A0A0A] font-medium'>Ryan Park  added new comments</span>
                <span >Yesterday at 2:30 PM</span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full text-sm text-[#0A0A0A] font-medium hover:underline">
              View All Activity
            </button>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-lg shadow-xs border text-[#0A0A0A] border-[#E5E5E5] pt-4 p-6 mb-14">
            <h2 className="text-2xl font-semibold text-[#0A0A0A]">Attachments</h2>
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between p-2 py-4  bg-[#F9FAFB] rounded">
                <div className="flex items-center gap-2 text-[#0A0A0A]">
                  <BsFileEarmarkText className="text-[#2563EB]" />{" "}
                  project-requirements.pdf
                </div>
                <FiDownload  className='text-[#0A0A0A]'/>
              </div>
              <div className="flex items-center justify-between p-2 py-4  bg-[#F9FAFB] rounded">
                <div className="flex items-center text-[#0A0A0A] gap-2">
                  <BsFileEarmarkText className="text-[#2563EB]" />{" "}
                  design-mockups.fig
                </div>
                <FiDownload  className='text-[#0A0A0A]' />
              </div>
              <div className="flex items-center justify-between p-2 py-4 bg-[#F9FAFB] rounded">
                <div className="flex items-center gap-2 text-[#0A0A0A]">
                  <BsFileEarmarkText className="text-blue-500" />{" "}
                  project-timeline.xlsx
                </div>
                <FiDownload  className='text-[#0A0A0A]'/>
              </div>
            </div>
            <button className="mt-3 w-full text-sm text-[#0A0A0A] border border-[#E5E5E5] rounded-lg py-2.5 hover:bg-gray-50 flex items-center justify-center gap-2">
              <FaPaperclip /> Add Attachment
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProjectDetails