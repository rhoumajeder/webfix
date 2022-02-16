import React from "react";
import { Box, Container, TextField } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TravelCardExtendedTables } from "../../components/TravelCard/TravelCard";
import { LuggageTableExtendedHeader } from "../../components/LuggageTable/LuggageTable";
import {
  HeaderDeliveryCode,
  HeaderSetupMeeting,
  HeaderShipmentConfirmation,
  HeaderWaitingForMeeting,
} from "../../components/Offers/Headers";

import "./index.css";

import ListItemCard from "../../components/ListItemCard/ListItemCard";
import NewFooter from "../../components/NewFooter/NewFooter";

const Index = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box component="div">
      <Header />
      <Container className="py-5">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className="my-2">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12} className="my-2 text-sm-start text-center">
                <Typography
                  variant="h6"
                  component="span"
                  color="textSecondary"
                  gutterBottom
                  className="fw-bold m-0"
                >
                  Mes Offres
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={8} md={10} xs={12} className="my-2">
            <ListItemCard itemType="offer" />
          </Grid>
        </Grid>
      </Container>
      <NewFooter />
    </Box>
  );
};

export default Index;
