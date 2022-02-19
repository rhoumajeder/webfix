import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Header from "../../components/Header/Header";
import NewFooter from "../../components/NewFooter/NewFooter";

const section = {
  width: "100%",
  borderBottom: "1px solid grey",
  marginTop: "30px",
  color: "#152f4d",
  fontWeight: "bold",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.2rem",
  marginBottom: "10px",
  display: "flex",
};
const text = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  fontSize: "2rem",
  color: "#FFFFFF",
  marginLeft: "20px",
};
const ShowStep = (Step) => {
  switch (Step) {
    case 0:
      return (
        <>
          <Page2 />
        </>
      );
    case 1:
      return (
        <>
          <Page2 />
        </>
      );
    case 2:
      return (
        <>
          <Page3 />
        </>
      );
    case 3:
      return (
        <>
          <Page4 />
        </>
      );
  }
};
function index() {
  const [showStep, setshowStep] = useState(0);

  return (
    <>
      <Header />
      <Container sx={{ my: 7 }}>
        <Grid container spacing={3}>
          <Grid item lg={4} xs={12} sm={6} sx={{ my: 7 }}>
            {" "}
            <Box>
              <List>
                <ListItem button key={text} onClick={() => setshowStep(0)}>
                  <ListItemText primary="Mode d'emploi" />
                </ListItem>
              </List>
              <Divider />
            </Box>
          </Grid>
          <Grid item lg={8} xs={12} sm={6} sx={{ marginTop: "50px" }}>
            {ShowStep(showStep)}
          </Grid>
        </Grid>
      </Container>
      <NewFooter />
    </>
  );
}

export default index;
