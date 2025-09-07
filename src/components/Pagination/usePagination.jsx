import { useState, useEffect } from "react";

export const usePaginate = (data, initialItemsPerPage = 1) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [paginatedData, setPaginatedData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    // Reset current page if currentPage > totalPages
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    setPaginatedData(data.slice(start, end));
  }, [data, currentPage, itemsPerPage, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    totalPages,
  };
};
