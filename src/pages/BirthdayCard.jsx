import React from "react";

const BirthdayCard = ({ employees }) => {
  if (!employees || employees.length === 0) return null;

const today = new Date();

const nearestEmployee = employees.reduce((nearest, emp) => {
  const empDob = new Date(emp.dob); // employee ka dob including year, month, day
  const diff = empDob - today; // difference in milliseconds

  // agar nearest undefined hai ya diff chhota hai (positive ya negative dono)
  if (!nearest || Math.abs(diff) < Math.abs(nearest.diff)) {
    return { ...emp, diff };
  }
  return nearest;
}, null);

console.log(nearestEmployee);


// console.log(nearestEmployee);



  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 text-center w-64">
      <h3 className="font-bold mb-2 text-2xl">Team Birthday</h3>
      <div className="flex justify-center mb-2">
        <img
          src={`http://localhost:5000/api/${nearestEmployee?.profileImage}` || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt={nearestEmployee?.firstName}
          className="w-24 h-24 rounded-full"
        />
      </div>
      <p className="font-semibold text-xl">{nearestEmployee.firstName}</p>
      <p className="text-lg text-[#6B7280]">{nearestEmployee.role?.name}</p>
      <p className="text-sm text-gray-300">
        Birthday:{" "}
        {new Date(nearestEmployee.dob).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}
      </p>
      <button className="mt-3 px-4 py-2 bg-orange-500 rounded-md text-white text-md font-bold">
        Send Wishes
      </button>
    </div>
  );
};

export default BirthdayCard;
