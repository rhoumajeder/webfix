import React from "react";
import { Box, Container, TextField } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TravelCard from "../../components/TravelCard/TravelCard";
import { LuggageTableExtendedHeader } from "../../components/LuggageTable/LuggageTable";
import PaginationExtended from "../../components/PaginationExtended/PaginationExtended";
import {
  HeaderAcceptReject,
  HeaderMeetingConfirmation,
  HeaderWaitingForMeetingRequest,
  HeaderWithText,
} from "../../components/Requests/Headers";

import "./index.css";

import ListItemCard from "../../components/ListItemCard/ListItemCard";
import HelpButton from "../../components/HelpButton/HelpButton";

const Index = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage] = React.useState(6);
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const indexOfLastPage = currentPage * cardsPerPage;
  const indexOfFirstPage = indexOfLastPage - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <Box component="div">
        <Header />
        <Container className="py-5">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item lg={8} md={10} xs={12} className="my-2">
              <ListItemCard itemType="request" />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <HelpButton />
    </React.Fragment>
  );
};

export default Index;
