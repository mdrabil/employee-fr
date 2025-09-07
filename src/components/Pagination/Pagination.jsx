// import React from "react";

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   itemsPerPage,
//   setItemsPerPage,
// }) => {
//   return (
//     <div className="flex justify-between items-center mt-4">
//       {/* Left: Items per page */}
//       <div>
//         <select
//           value={itemsPerPage}
//           onChange={(e) => setItemsPerPage(Number(e.target.value))}
//           className="px-2 py-1 border rounded border-[var(--border-main)]"
//         >
//           <option value={5}>5 per page</option>
//           <option value={10}>10 per page</option>
//           <option value={20}>20 per page</option>
//         </select>
//       </div>

//       {/* Right: Page buttons */}
//       <div className="flex gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//           className="px-3 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
//         >
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => onPageChange(idx + 1)}
//             className={`px-3 py-1 rounded border border-[var(--border-main)] ${
//               currentPage === idx + 1
//                 ? "bg-[var(--main-color)] text-white"
//                 : "bg-white text-[var(--text-color)]"
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//           className="px-3 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;



// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) => {
//   return (
//     <div className="flex justify-between items-center mt-4">
//       {/* Left: Items per page */}
//       <div>
//         <select
//           value={itemsPerPage}
//           onChange={(e) => setItemsPerPage(Number(e.target.value))}
//           className="px-2 py-1 border rounded border-[var(--border-main)]"
//         >
//           <option value={5}>5 per page</option>
//           <option value={10}>10 per page</option>
//           <option value={20}>20 per page</option>
//         </select>
//       </div>

//       {/* Right: Page buttons */}
//       <div className="flex gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => onPageChange(currentPage - 1)}
//           className="px-3 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
//         >
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => onPageChange(idx + 1)}
//             className={`px-3 py-1 rounded border border-[var(--border-main)] ${
//               currentPage === idx + 1
//                 ? "bg-[var(--main-color)] text-white"
//                 : "bg-white text-[var(--text-color)]"
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => onPageChange(currentPage + 1)}
//           className="px-3 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";
import { FiChevronDown } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex  sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-0">
      {/* Left: Items per page */}
      <div className="flex items-center  gap-2 text-[10px] sm:text-sm">
        <span className="text-gray-700">Showing per page -</span>
        <div className="relative inline-block border border-[var(--border-main)] rounded-md">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="text-gray-700 text-xs sm:text-sx px-1 py-1 pr- w-full sm:w-auto focus:outline-none cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Right: Page buttons */}
      <div className="flex  gap-2 text-xs sm:text-xs justify-center sm:justify-end">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
        >
          Prev
        </button>

        {pageNumbers.map((num, idx) =>
          num === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(num)}
              className={`px-3 py-1 rounded border border-[var(--border-main)] ${
                currentPage === num
                  ? "bg-[var(--main-color)] text-white"
                  : "bg-white text-[var(--text-color)]"
              }`}
            >
              {num}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-1 rounded border border-[var(--border-main)] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
