import React, { useState } from "react";
import PropTypes from "prop-types";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemCount = data.length;

  const getCurrentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return data.slice(start, end);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(itemCount / itemsPerPage);

  return {
    currentPage,
    getCurrentData,
    changePage,
    pageCount,
  };
};

export default usePagination;
