import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../helpers/axios";

const usePaginationHomePage = (data, itemsPerPage,first_load,number_of_items) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemCount = first_load?data.length:number_of_items;

  const getCurrentData = () => {

     
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      console.log("from getcurrentdata");
      console.log(data); 
      console.log(data.slice(start, end));
      if(first_load) {
        return data.slice(start, end) 
      } else {
        return data;
      } 
     
      

    
  
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

export default usePaginationHomePage;
