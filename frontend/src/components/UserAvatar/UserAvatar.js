import React from "react";
import { Avatar, Box, Typography, ButtonBase } from "@material-ui/core";
import {Link} from 'react-router-dom';
import Rating from "@material-ui/lab/Rating";
// import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./UserAvatar.css";

const UserAvatar = (props) => {
  const user = props.user
  const getAverageRating = () => {
    let totalRating = props.user.note_feedback;  

    // props.user.received_feedback.forEach((feedback) => {
    //   totalRating += feedback.note;
    // });
   if( totalRating != 0 && props.user.number_of_feedbacks != 0 ){
    const averageRating = (totalRating/props.user.number_of_feedbacks).toFixed(1);
    return averageRating;
   } else {
    return 3; 
   }
   
    //  totalRating / props.user.received_feedback.length  number_of_feedbacks
    // console.log("rje debug"); 
    //   console.log(totalRating);
    //   console.log(props.user.number_of_feedbacks);
    //   console.log("rje debug end"); 
    // return averageRating;  //here
  };

  return (
    <Box
      component={"div"}
      className={"my-2 text-center px-lg-4 px-md-4 px-sm-4"}
    >
      {/* <Avatar
        alt="Remy Sharp"
        src={
          props.profile
            ? props.profile
            : require("../../assets/images/placeholder-avatar.png").default
        }
        className="person-card-image mx-auto shadow"
      /> */}
        <Avatar
        alt="Remy Sharp"
        src={
          user.photo
            ?  user.photo
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
            //name="simple-controlled"
            value={
              props.user.number_of_feedbacks > 0
                ? Math.round(getAverageRating())
                : 3
            }
            

            readOnly
            size="medium"
            emptyIcon={<StarBorderIcon fontSize="inherit"  />} 
              icon={<StarRateIcon fontSize="inherit" style={{ color:"#FFD700"}} />}
            
            
            // className="m-0 me-1"
            // color="red"
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
