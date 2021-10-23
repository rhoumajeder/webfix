import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {FaTimes, FaCheck} from "react-icons/fa";

const LuggageCheck = (props) => {
    return (
        <Box className="language-label">
            <Box className="d-flex align-items-center">
                <Typography variant={props.size || 'subtitle2'} component="span" color="textPrimary" gutterBottom className={`m-0 me-1 ${props.className}`}>
                    {props.text}
                </Typography>
                {props.check ? <FaCheck className="text-success"/> : <FaTimes className="text-danger" />}
            </Box>
        </Box>
    );
};

export default LuggageCheck;