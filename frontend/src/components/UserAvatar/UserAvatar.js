import React from "react";
import { Avatar, Box, Typography, ButtonBase } from "@material-ui/core";
import {Link} from 'react-router-dom';
import Rating from "@material-ui/lab/Rating";

import "./UserAvatar.css";

const UserAvatar = (props) => {
  const user = props.user
  const getAverageRating = () => {
    let totalRating = props.user.note_feedback;  

    // props.user.received_feedback.forEach((feedback) => {
    //   totalRating += feedback.note;
    // });
 
    const averageRating = (
    //  totalRating / props.user.received_feedback.length  number_of_feedbacks
    totalRating /  props.user.number_of_feedbacks
    ).toFixed(1);

    return averageRating;
  };

  return (
    <Box
      component={"div"}
      className={"my-2 text-center px-lg-4 px-md-4 px-sm-4"}
    >
      <Avatar
        alt="Remy Sharp"
        src={
          props.profile
            ? props.profile
            : require("../../assets/images/placeholder-avatar.png").default
        }
        className="person-card-image mx-auto shadow"
      />
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        className="fw-bold m-0"
      >
        {" "}
        {user && user.id && (
          <Link to={`/user-profile/${user.id}`}>
            <ButtonBase>
              {props.name ? props.name : "Unknown"}
            </ButtonBase>
          </Link>
        ) || (
          props.name ? props.name : "Unknown"
        )}
        {" "}
      </Typography>
      {props.hasRating && (
        <Box
          component={"div"}
          className={`${
            props.inlineRating
              ? "d-flex align-items-center justify-content-center"
              : ""
          } mt-2`}
        >
          <Rating
            name="read-only"
            value={
              props.user.number_of_feedbacks > 0
                ? Math.round(getAverageRating())
                : 0
            }
            readOnly
            size="medium"
            className="m-0 me-1"
          />
          <Typography
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
            className="fw-bold m-0 ms-1"
          >
            {" "}
            {getAverageRating()}/5-{props.user.number_of_feedbacks} avis {" "}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
