import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Container } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import TravelCard from "../../components/TravelCard/TravelCard";
import StepperExtended, {
  StepperButtons,
} from "../../components/StepperExtended/StepperExtended";
import { LuggageTableExtendedHeader } from "../../components/LuggageTable/LuggageTable";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import "./index.css";
import {
  HeaderSetupMeeting,
  HeaderShipmentConfirmation,
  HeaderWaitingForMeeting,
} from "../../components/Offers/Headers";

import { AuthContext } from "../../context/auth";

import ItemCard from "../../components/ItemCard/ItemCard";

import axiosInstance from "../../helpers/axios";
import { useParams } from "react-router";

import objectInArray from "../../helpers/objectInArray";

import Spinner from "../../components/Spinner/Spinner";

const Index = (props) => {
  let { id } = useParams();
  const [user, setUser] = useContext(AuthContext);
  const [proposition, setProposition] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  const getProposition = () => {
    axiosInstance
      .get(`get-proposition/${id}/`)
      .then((res) => {
        setProposition(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getProposition();

    if (proposition) {
      checkPropositionState(proposition);
    }
  }, [proposition, activeStep]);

  const checkPropositionState = (proposition) => {
    if (!proposition.paid) {
      if (objectInArray(proposition.proposition_items, "state", "Undefined")) {
        setActiveStep(0);
      } else {
        setActiveStep(1);
      }
    } else {
      if (
        proposition.address_state === "Undefined" ||
        proposition.address_state === "Pending"
      ) {
        setActiveStep(2);
      } else if (
        proposition.address_state === "Accepted" &&
        !proposition.meeting_confirmed
      ) {
        setActiveStep(3);
      } else if (
        proposition.meeting_confirmed &&
        !proposition.delivery_confirmed
      ) {
        setActiveStep(4);
      } else if (proposition.delivery_confirmed) {
        setActiveStep(5);
      }
    }
  };

  if (proposition) {
    return (
      <Box component={"div"}>
        <Header />
        <Container className="py-5">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item lg={8} md={10} xs={12} className="my-2">
              {/* luggageTables must be an array of offers! */}
              <Card className={"shadow"}>
                <CardContent className={"px-0"}>
                  <Box component={"div"} className={"shadow mx-3 mb-3"}>
                    <StepperExtended activeStep={activeStep} />
                  </Box>
                  <TravelCard
                    recordInputInfo={true}
                    username={user.username}
                    user={user}
                    hasAvatar={true}
                    hasShadow={false}
                  />
                  <Box component={"div"} className={"border-top pt-3"}>
                    <Grid container direction="row" spacing={2}>
                      <Grid
                        item
                        sm={"auto"}
                        xs={12}
                        className="mb-2 text-center ps-lg-4 ps-md-4 ps-sm-4"
                      >
                        <UserAvatar
                          hasRating={true}
                          name={proposition.user.username}
                          user={proposition.user}
                        />
                      </Grid>
                      <Grid
                        item
                        sm
                        xs={12}
                        className={`mb-2 ms-lg-2 ms-md-2 ms-sm-2 ${
                          screen.width <= 480 ? "mt-5" : ""
                        }`}
                      >
                        <Box component={"div"}>
                          <ItemCard
                            item={proposition}
                            showTotal={
                              objectInArray(
                                proposition.proposition_items,
                                "state",
                                "Undefined"
                              )
                                ? false
                                : true
                            }
                            fetchItems={getProposition}
                            itemType={"offer"}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  } else {
    return <Spinner />;
  }
};

const OfferAcceptReject = ({ item }) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid
        item
        sm={"auto"}
        xs={12}
        className="mb-2 text-center ps-lg-4 ps-md-4 ps-sm-4"
      >
        <UserAvatar hasRating={true} />
      </Grid>
      <Grid
        item
        sm
        xs={12}
        className={`mb-2 ms-lg-2 ms-md-2 ms-sm-2 ${
          screen.width <= 480 ? "mt-5" : ""
        }`}
      >
        <Box component={"div"}></Box>
      </Grid>
    </Grid>
  );
};

const WaitingForPayment = ({ proposition }) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid
        item
        sm={"auto"}
        xs={12}
        className="mb-2 text-center ps-lg-4 ps-md-4 ps-sm-4"
      >
        <UserAvatar hasRating={true} />
      </Grid>
      <Grid
        item
        sm
        xs={12}
        className={`my-2 ms-lg-2 ms-md-2 ms-sm-2 ${
          screen.width <= 480 ? "mt-5" : ""
        }`}
      >
        <Box component={"div"}>
          <LuggageTableExtendedHeader
            TableRows={proposition.proposition_items}
            UniqueName={"My Offers 02"}
            Payment={"23"}
            CurrentPaymentStatus={"pending"}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const SetupMeetingDateTime = ({
  proposition,
  handleMeetingInformation,
  showMeetingInfo,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      <Grid container direction="row" className={"mb-5"}>
        <Grid
          item
          sm={"auto"}
          xs={12}
          className="mb-2 text-center ps-lg-4 ps-md-4 ps-sm-4"
        >
          <UserAvatar hasRating={true} />
        </Grid>
        <Grid
          item
          sm
          xs={12}
          className={`${screen.width <= 480 ? "mt-5" : ""}`}
        >
          <Box component={"div"}>
            <LuggageTableExtendedHeader
              UniqueName={"My Offer 03"}
              TableRows={proposition.proposition_items}
              Payment={"23"}
              CurrentPaymentStatus={"paid"}
            />
          </Box>
        </Grid>
      </Grid>
      {showMeetingInfo.Address && (
        <HeaderWaitingForMeeting
          address={"Rdv à 23 Rue Jean-Christophe, Paris, 75300 à 12:30"}
          date={"03/23/2020, 12:30"}
          verified={showMeetingInfo.AddressVerified}
        />
      )}
      {showMeetingInfo.Shipment && (
        <HeaderShipmentConfirmation
          shipmentCode={"2345"}
          verified={showMeetingInfo.ShipmentVerified}
        />
      )}
      {!showMeetingInfo.Shipment && !showMeetingInfo.Address && (
        <HeaderSetupMeeting
          handleDateChange={handleDateChange}
          date={selectedDate}
          handleValidateMeeting={handleMeetingInformation}
        />
      )}
      <iframe
        className={"w-100"}
        height="350"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?&amp;q=Paris&amp;output=embed"
      />
    </React.Fragment>
  );
};

export default Index;
