import React, { useState } from "react";

import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

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

const ReportModal = (props) => {
  const [report, setReport] = useState({ text: ""});
  const { addToast } = useToasts();

  const handleInputChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    props.setReportModalOpen(!props.reportModalOpen);
  };

  // Submit report
  const sendReport = () => {
    axiosInstance
      .post(`report-user/${props.receiver.id}/`, report) 
      .then((res) => {
         
        addToast("Report sent", { appearance: "success" });  
      })
      .catch((err) => {
         
        addToast(err.response.data, { appearance: "error" });
      });

    handleModal();
  };

  return (
    <Modal
      open={props.reportModalOpen}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={props.reportModalOpen}>
        <Box style={style}>
          <Typography variant="h6">Report</Typography>
          <div className="my-4 w-100">
            <TextField
              className="w-100 my-3"
              name="text"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Report"
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
            onClick={sendReport}
          >
            Send
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReportModal;
