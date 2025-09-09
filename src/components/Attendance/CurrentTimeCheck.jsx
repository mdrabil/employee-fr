import React, { useEffect, useState } from "react";

const LiveTimer = ({ startTime, stopTime, status }) => {
  const [duration, setDuration] = useState("00:00:00");

  useEffect(() => {
    if (!startTime) return;

    const calculateDuration = (endTime = new Date()) => {
      const start = new Date(startTime);
      const diff = Math.floor((endTime - start) / 1000); // difference in seconds

      const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const seconds = String(diff % 60).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    };

    // 🔹 Agar task completed hai ya punch-out ho gaya hai → fixed value dikhao
    if (status === "completed" || stopTime) {
      setDuration(calculateDuration(stopTime ? new Date(stopTime) : new Date()));
      return; // interval chalane ki zarurat nahi
    }

    // 🔹 Live timer
    const interval = setInterval(() => {
      setDuration(calculateDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, stopTime, status]);

  return (
    <div className="w-28 h-28 border-[6px] border-green-500 rounded-full flex items-center justify-center text-gray-800 font-extrabold text-lg shadow-inner">
      {startTime ? duration : "⏳"}
    </div>
  );
};

export default LiveTimer;
