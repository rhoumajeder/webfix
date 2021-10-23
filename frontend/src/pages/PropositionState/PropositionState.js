import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Container } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Grid from "@material-ui/core/Grid";
import TravelCard from "../../components/TravelCard/TravelCard";
import StepperExtended from "../../components/StepperExtended/StepperExtended";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

import { AuthContext } from "../../context/auth";

import ItemCard from "../../components/ItemCard/ItemCard";

import axiosInstance from "../../helpers/axios";
import { useParams, useLocation } from "react-router";

import objectInArray from "../../helpers/objectInArray";

import Spinner from "../../components/Spinner/Spinner";

const PropositionState = (props) => {
  const location = useLocation();
  const { askRecord } = location.state;
  let { id } = useParams();
  const [user, setUser] = useContext(AuthContext);
  const [proposition, setProposition] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  // Get current proposition
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

  // Check in what step is the proposition
  const checkPropositionState = (proposition) => {
    if (!proposition.paid) {
      if (askRecord) {
        if (proposition.proposition_state === "Pending") {
          setActiveStep(0);
        } else if (proposition.proposition_state === "Accepted") {
          setActiveStep(1);
        } else {
          setActiveStep(0);
        }
      } else {
        if (
          objectInArray(proposition.proposition_items, "state", "Undefined")
        ) {
          setActiveStep(0);
        } else {
          setActiveStep(1);
        }
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
              <Card className={"shadow"}>
                <CardContent className={"px-0"}>
                  <Box component={"div"} className={"shadow mx-3 mb-3"}>
                    <StepperExtended activeStep={activeStep} />
                  </Box>
                  <TravelCard
                    recordInputInfo={askRecord ? false : true}
                    itemTable={askRecord ? true : false}
                    username={proposition.record.user.username}
                    user={proposition.record.user}
                    hasAvatar={true}
                    hasShadow={false}
                    record={proposition.record}
                  />
                  <Box component={"div"} className={"border-top pt-3"}>
                    <Grid container spacing={2}>
                      <Grid item xs={3} className="text-center">
                        <UserAvatar
                          hasRating={true}
                          name={proposition.user.username}
                          user={proposition.user}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Box component={"div"}>
                          <ItemCard
                            item={proposition}
                            askProposition={askRecord ? true : false}
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
                            itemType={props.itemType}
                            checkPropositionState={checkPropositionState}
                            stepBar={true}
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

export default PropositionState;
