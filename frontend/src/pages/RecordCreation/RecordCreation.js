import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Container,
  Grid,
  Button,
} from "@material-ui/core";
import "./RecordCreation.css";
import Header from "../../components/Header/Header";
import Index from "../CreateRecord";
import CreateAskRecord from "../../components/CreateAskRecord/CreateAskRecord";
import ReCAPTCHA from "react-google-recaptcha";


const RecordCreation = () => {
  // Current record state
  const [recordToShow, setRecordToShow] = useState("");
  const [showRecords, setShowRecords] = useState(false);
  var recaptchaRef = React.useRef();



  // Hanlders for showing and hiding records
  const hideAskRecord = () => {
    setRecordToShow("propose");
    setShowRecords(true);
  };

  const revealAskRecord = () => {
    setRecordToShow("ask");
    setShowRecords(true);
  };

  const goBack = () => {
    setRecordToShow("");
    setShowRecords(false);
  };

  return (
    <div>
      <Header />
      <ReCAPTCHA
        sitekey="6LdF_5IdAAAAALzAguYkwNu1qdj_CnQoUh0wQD9y"
        ref={recaptchaRef}
        size="invisible"
      />
      {recordToShow === "" && (
        <Container>
          <Grid container spacing={2} style={{ marginTop: "50px" }}>
            <Grid item xs={6}>
              <Paper onClick={hideAskRecord} className='paperBtn'>
                <p style={{ textAlign: "center", marginTop: "25px" }} className="paper demandBtn">
                  Announce
                  <div className="text-center mb-3">
                    <p className='fun-text'>Are going To have fun</p>
                  </div>
                </p>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper onClick={revealAskRecord} className='paperBtn'>
                <p style={{ textAlign: "center", marginTop: "25px" }} className="paper demandBtn">
                  Demande
                  <div className="text-center mb-3">
                    <p className='fun-text'>Are going To have fun</p>
                  </div>
                </p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}

      {showRecords && (
        <React.Fragment>
          {recordToShow === "ask" ? (
            <CreateAskRecord goBack={goBack} recaptchaRef={recaptchaRef} />
          ) : (
            <Index goBack={goBack} recaptchaRef={recaptchaRef} />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default RecordCreation;
