import React, { useState } from "react";

import {
  Modal,
  Fade,
  Box,
  Typography,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import LoadingOverlay from 'react-loading-overlay';

import Rating from "@material-ui/lab/Rating";

import axiosInstance from "../../helpers/axios";

import { useToasts } from "react-toast-notifications";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "white",
  padding: "40px",
};

const FeedbackModal = (props) => {
  const [feedback, setFeedback] = useState({ text: "he is a good user", note: 2 });
  const { addToast } = useToasts();

  const changeRating = (event, newValue) => {
    setFeedback({ ...feedback, note: newValue });
  };

  const handleInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    props.setFeedbackModalOpen(!props.feedbackModalOpen);
  };

  // Submit feedback
  const sendFeedback = () => {
    if (feedback.text.length === 0 || feedback.note === 0) {
      addToast("Fields can not be empty", { appearance: "error" });



    } else {
      axiosInstance
        .post(`create-feedback/${props.receiver.id}/`, feedback)
        // .post(`create-feedback/${props.receiver.email}/`, feedback)
        .then((res) => {
          console.log(res.data);
          addToast("Feedback sent", { appearance: "success" });
        })
        .catch((err) => {
          console.log(err.response);
          addToast(err.response.data, { appearance: "error" });
        });

      handleModal();


    }


  };

  return (


    <Modal
      open={props.feedbackModalOpen}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >


      <Fade in={props.feedbackModalOpen}>
        <Box style={style}>
          <Typography variant="h6">Leave feedback</Typography>
          <div className="my-4 w-100">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={feedback.note}
              onChange={changeRating}
              className="mb-3"
            />
            <InputLabel htmlFor={"message"}>Message</InputLabel>
            <TextField
              className="w-100 my-3"
              name="text"
              onChange={handleInputChange}
              variant="outlined"
              defaultValue={"This is a good user"}
              placeholder="Message"
              multiline
              rows={3}
              helperText={"Write what you thought of the service"}
            />
          </div>
          <Button
            className="ms-auto my-2"
            variant="contained"
            color={"primary"}
            size="large"
            onClick={sendFeedback}
          >
            Send
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FeedbackModal;
