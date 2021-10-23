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

const RecordCreation = () => {
  // Current record state
  const [recordToShow, setRecordToShow] = useState("");
  const [showRecords, setShowRecords] = useState(false);

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
      {recordToShow === "" && (
        <Container>
          <Grid container spacing={2} style={{ marginTop: "50px" }}>
            <Grid item xs={6}>
              <Paper onClick={hideAskRecord} className="paper">
                <p style={{ textAlign: "center" }}>Annonce</p>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper onClick={revealAskRecord} className="paper">
                <p style={{ textAlign: "center" }}>Demande</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}

      {showRecords && (
        <React.Fragment>
          {recordToShow === "ask" ? (
            <CreateAskRecord goBack={goBack} />
          ) : (
            <Index goBack={goBack} />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default RecordCreation;
