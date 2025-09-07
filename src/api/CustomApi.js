// utils/formatDateTime.js
// export const formatDate = (inputDate, format = "DD-MM-YYYY HH:mm:ss") => {
//   const date = new Date(inputDate);

//   if (isNaN(date.getTime())) {
//     return "Invalid Date";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
// //   const seconds = String(date.getSeconds()).padStart(2, "0");

// //   switch (format) {
// //     case "DD-MM-YYYY HH:mm:ss":
// //       return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
// //     case "YYYY-MM-DD HH:mm:ss":
// //       return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// //     case "MM/DD/YYYY HH:mm:ss":
// //       return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
// //     case "DD/MM/YYYY HH:mm:ss":
// //       return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// //     default:
//       return `${hours}:${minutes}`;
// //   }
// };


// export const formatDateTime = (inputDate, format = "DD-MM-YYYY HH:mm:ss") => {
//   const date = new Date(inputDate);

//   if (isNaN(date.getTime())) {
//     return "Invalid Date";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
// //   const seconds = String(date.getSeconds()).padStart(2, "0");

// //   switch (format) {
// //     case "DD-MM-YYYY HH:mm:ss":
// //       return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
// //     case "YYYY-MM-DD HH:mm:ss":
// //       return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// //     case "MM/DD/YYYY HH:mm:ss":
// //       return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
// //     case "DD/MM/YYYY HH:mm:ss":
// //       return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// //     default:
//       return `${day}:${month}:${year}`;
// //   }
// };




export function formatDate(inputDate, type = "full", locale = "en-GB") {
  if (!inputDate) return "";

  const date = new Date(inputDate);

  const options = {
    full: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    },
    date: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    //   second: "2-digit",
      hour12: false,
    },
  };

  return new Intl.DateTimeFormat(locale, options[type] || options.full).format(date);
}


