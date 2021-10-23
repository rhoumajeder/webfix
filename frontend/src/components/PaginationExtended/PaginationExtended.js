import React from 'react';
import {Box} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

const PaginationExtended = ({ recordsPerPage, totalRecords, paginate, currentPage, shape, className }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecords/recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box component={'div'} className={`d-flex ${className}`}>
            <Pagination count={pageNumbers.length}
                        page={currentPage} onChange={paginate}
                        variant="outlined" color={"primary"} shape={shape} />
        </Box>
    );
};

export default PaginationExtended;