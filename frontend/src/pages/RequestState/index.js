import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Container } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import TravelCard from "../../components/TravelCard/TravelCard";
import { LuggageTableExtendedHeader } from "../../components/LuggageTable/LuggageTable";
import {
  HeaderAcceptReject,
  HeaderMeetingConfirmation,
  HeaderWaitingForMeeting,
  HeaderWithText,
} from "../../components/Requests/Headers";

import { GoVerified } from "react-icons/go";
import StepperExtended, {
  StepperButtons,
} from "../../components/StepperExtended/StepperExtended";
import "./index.css";

import UserAvatar from "../../components/UserAvatar/UserAvatar";

import { AuthContext } from "../../context/auth";

import ItemCard from "../../components/ItemCard/ItemCard";

import axiosInstance from "../../helpers/axios";
import { useParams } from "react-router";

import objectInArray from "../../helpers/objectInArray";

import Spinner from "../../components/Spinner/Spinner";

const Index = () => {
  let { id } = useParams();
  const [user, setUser] = useContext(AuthContext);
  const [proposition, setProposition] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

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
  }, []);

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
                  <Box component={"div"} className={"shadow mx-3"}>
                    <StepperExtended activeStep={activeStep} />
                  </Box>
                  <Box
                    component={"div"}
                    className={`mx-3 border-bottom mt-3 pb-3 ${
                      activeStep > 1 && "border-top pt-3"
                    }`}
                  >
                    {activeStep === 2 && (
                      <HeaderWithText
                        text={`Transporter: ${proposition.record.created_by.username}`}
                      />
                    )}
                    {activeStep >= 3 && (
                      <HeaderWithText
                        text={`Transporter: ${proposition.record.created_by.username}`}
                        link={true}
                        subtitle={"Phone Number:"}
                        linkText={"01 23 43 56 77"}
                      />
                    )}
                  </Box>
                  <TravelCard
                    recordInputInfo={true}
                    hasAvatar={true}
                    hasShadow={false}
                    username={user.username}
                    user={user}
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
                            itemType={"request"}
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

const OfferAccepted = ({ record }) => {
  return (
    <React.Fragment>
      <HeaderWithText text={"Offer"} />
      <LuggageTableExtendedHeader
        UniqueName={"My Requests 01"}
        TableRows={record}
        LuggageConfirmationInProgress={true}
      />
    </React.Fragment>
  );
};

const Payment = ({ record }) => {
  return (
    <React.Fragment>
      <HeaderWithText text={"Offer"} />
      <LuggageTableExtendedHeader
        UniqueName={"My Requests 02"}
        TableRows={record}
        Payment={"23"}
        CurrentPaymentStatus={"payable"}
      />
    </React.Fragment>
  );
};

const FetchMeetingDetails = ({
  record,
  handleMeetingConfirmed,
  showMeetingConfirmedState,
}) => {
  const [showMeetingInfo, setMeetingInfo] = React.useState(true);
  const [showConfirmation, setConfirmation] = React.useState(false);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMeetingInfo(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  React.useEffect(() => {
    if (showMeetingConfirmedState) {
      setConfirmation(false);
    }
  }, [showMeetingConfirmedState]);
  return (
    <React.Fragment>
      <HeaderWithText text={"Offer"} />
      <LuggageTableExtendedHeader
        UniqueName={"My Requests 03"}
        TableRows={record}
        Payment={"23"}
        CurrentPaymentStatus={"paid"}
      />
      {showMeetingInfo ? (
        <HeaderWaitingForMeeting />
      ) : (
        <React.Fragment>
          {!showConfirmation && !showMeetingConfirmedState && (
            <HeaderAcceptReject
              address={"Rdv à 23 Rue Jean-Christophe, Paris, 75300 à 12:30"}
              acceptHandler={() => setConfirmation(true)}
            />
          )}

          {showConfirmation && !showMeetingConfirmedState && (
            <React.Fragment>
              <HeaderWithText
                text={"Rdv à 23 Rue Jean-Christophe, Paris, 75300 à 12:30"}
                titleIcon={<GoVerified className={"text-success fs-6"} />}
                subtitle={
                  <HeaderMeetingConfirmation
                    confirmationHandler={handleMeetingConfirmed}
                  />
                }
              />
            </React.Fragment>
          )}

          {!showConfirmation && showMeetingConfirmedState && (
            <React.Fragment>
              <HeaderWithText
                text={"Rdv à 23 Rue Jean-Christophe, Paris, 75300 à 12:30"}
                titleIcon={<GoVerified className={"text-success fs-6"} />}
                subtitle={"Meeting Confirmed"}
                subtitleIcon={<GoVerified className={"text-success fs-6"} />}
              />
            </React.Fragment>
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
      )}
    </React.Fragment>
  );
};
export default Index;
