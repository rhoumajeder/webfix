import React from "react";
import { Avatar, Box, Typography } from "@material-ui/core";
import { GoVerified } from "react-icons/go";

const Feedback = (props) => {
  return (
    <Box component={"div"} className={"my-2"}>
      <Box component="div" className="comment d-flex">
        <Box component="div" className="flex-shrink-0">
          <Box component="div" className="avatar avatar-sm rounded-circle">
            <Avatar
              alt="Remy Sharp"
              src={
                require("../../assets/images/placeholder-avatar.png").default
              }
              className="mx-auto shadow"
            />
          </Box>
        </Box>
        <Box component="div" className="flex-shrink-1 ms-2">
          <Box
            component="div"
            className="comment-meta d-flex align-items-center"
          >
            <GoVerified className={"text-success small me-1"} />
            <Typography
              variant="subtitle2"
              color="textPrimary"
              gutterBottom
              className="fw-bold m-0 me-2"
            >
              {" "}
              {props.user}{" "}
            </Typography>
          </Box>
          <Box component="div" className="comment-body">
            <Typography
              variant="caption"
              color="textPrimary"
              gutterBottom
              className="fw-normal m-0"
            >
              {props.text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Feedback;
