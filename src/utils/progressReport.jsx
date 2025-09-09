export const getProgressColor = (progress) => {
  if (progress <= 30) return "bg-red-500";
  if (progress <= 70) return "bg-yellow-500";
  return "bg-green-500";
};

export const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return {
        badge: "bg-green-100 text-green-700",
        progress: "bg-green-500",
        text: "text-green-700 font-semibold",
      };
        case "cancelled":
      return {
        badge: "bg-red-500 text-white",
        progress: "bg-green-500",
        text: "text-green-700 font-semibold",
      };
    case "in-progress":
      return {
        badge: "bg-yellow-100 text-yellow-700",
        progress: "bg-yellow-500",
        text: "text-yellow-700 font-semibold",
      };
    case "on hold":
    default:
      return {
        badge: "bg-gray-100 text-gray-700",
        progress: "bg-gray-400",
        text: "text-gray-500",
      };
  }
};


export const getStatusByColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 font-semibold";
    case "cancelled":
      return "bg-red-500 text-white font-semibold";
    case "in-progress":
      return "bg-yellow-100 text-yellow-700 font-semibold";
    case "on hold":
    default:
      return "bg-gray-100 text-gray-700 font-semibold";
  }
};
