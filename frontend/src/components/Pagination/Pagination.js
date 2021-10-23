import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const CustomPagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={pageCount}
        onChange={onPageChange}
        page={currentPage}
        color="primary"
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default CustomPagination;
