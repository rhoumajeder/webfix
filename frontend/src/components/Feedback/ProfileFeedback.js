import React from 'react';
import {Box, Paper, Typography} from "@material-ui/core";
import {GiSevenPointedStar} from "react-icons/gi";
import { Avatar } from "@material-ui/core";

const starStatus = [{
    color: 'red',
    text: 'Very Disappointing'
}, {
    color: 'orange',
    text: 'Disappointing'
}, {
    color: '#ffeb3b',
    text: 'Correct'
}, {
    color: 'lightgreen',
    text: 'Good'
}, {
    color: 'green',
    text: 'Excellent'
}]


const Feedback = ({user, text, star}) => {
  return (
    <Paper style={{border: 'unset'}} variant="outlined" className="my2 p-2">
      <Box className="comment d-flex">
        <Box width="12%" component="div" className="flex-shrink-0">
          <Box className="avatar avatar-sm rounded-circle">
            <Avatar
              alt="Remy Sharp"
              src={
                require("../../assets/images/placeholder-avatar.png").default
              }
              className="mx-auto shadow"
            />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              gutterBottom
              className="fw-bold"
              align="center"
            >
              {user}
            </Typography>
          </Box>
        </Box>
        <Box className="flex-shrink-1 ms-2">
          <Box
            component="div"
            className="comment-meta d-flex align-items-center"
          >
            <GiSevenPointedStar style={{color: starStatus[star - 1].color}} className="small me-1" />
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              className="fw-bold m-0"
            >
              {starStatus[star - 1].text}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              color="textPrimary"
              className="fw-lighter m-0"
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};


export default Feedback
