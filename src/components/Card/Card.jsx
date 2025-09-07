import React from "react";
import './card.css';
import { MdOutlineArrowOutward, MdOutlineErrorOutline } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { TbProgressAlert } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline, IoMdTime } from "react-icons/io";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const Card = ({allProjects}) => {

// 🔹 Example: Assuming har project me ek "status" field hai (like: "in-progress", "completed", "overdue")
const totalProjects = allProjects?.length || 0;

// 🔹 Filter counts by status
const inProgressProjects = allProjects?.filter(p => p.status === "in-progress")?.length || 0;
const completedProjects = allProjects?.filter(p => p.status === "completed")?.length || 0;
const overdueProjects = allProjects?.filter(p => p.status === "overdue")?.length || 0;

const statisticsData = [
  {
    id: "total-projects",
    label: "Total Projects",
    number: totalProjects,
    subtitle: "from last month",
    icon: <FaRegFileAlt />,
    trend: "+2",
  },
  {
    id: "in-progress",
    label: "In Progress",
    number: inProgressProjects,
    subtitle: "from last month",
    icon: <IoMdTime />,
    trend: "+3",
  },
  {
    id: "completed",
    label: "Completed",
    number: completedProjects,
    subtitle: "from last month",
    icon: <IoMdCheckmarkCircleOutline />,
    trend: "+1",
  },
  {
    id: "overdue",
    label: "Overdue",
    number: overdueProjects,
    subtitle: "from last month",
    icon: <MdOutlineErrorOutline />,
    trend: "-2",
  },
];

  const renderTrend = (trend) => {
    const isPositive = trend.startsWith("+");
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-(--arrow-icons-color)" : "text-red-500"}`}>
        {isPositive ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
        <span>{trend}</span>
      </div>
    );
  };

  const renderStatCard = (stat) => (
    <div
      key={stat.id}
      className="stat-card  p-4 rounded-lg shadow-md flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="bg-(--sc-bg-color) w-14 h-14 flex items-center justify-center rounded-full text-main text-2xl">
          <span  className='text-(--main-color) text-3xl'>{stat.icon}</span>
        </div>
        {renderTrend(stat.trend)}
      </div>

      <div className="">
        <div className="text-sm text-(--text-color) pt-1">{stat.label}</div>
        <div className="text-3xl font-bold pt-1">{stat.number}</div>
        <div className="text-xs text-(--text-color)">{stat.subtitle}</div>
      </div>
    </div>
  );

  return <div className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">{statisticsData.map(renderStatCard)}</div>;
};

export default Card;
