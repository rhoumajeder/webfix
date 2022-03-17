import React, { useState, useEffect, useContext } from "react";

import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Button,
  Paper,
  IconButton,
  Typography,
  Collapse,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { GoVerified, GoUnverified } from "react-icons/go";
import { MdCancel } from "react-icons/md";

import { SRLWrapper } from "simple-react-lightbox";

import { makeStyles } from "@material-ui/core/styles";

import axiosInstance from "../../helpers/axios";

import objectSum from "../../helpers/objectSum";

import formatDate from "../../helpers/formatDate";

import moment from "moment";

import FeedbackModal from "../FeedbackModal/FeedbackModal";

import { CgShapeCircle } from "react-icons/cg";

import {
  HeaderDeliveryCode,
  HeaderSetupMeeting,
  HeaderShipmentConfirmation,
  HeaderWaitingForMeeting,
} from "../../components/Offers/Headers";

import {
  HeaderAcceptReject,
  HeaderMeetingConfirmation,
  HeaderWaitingForMeetingRequest,
  HeaderWithText,
} from "../../components/Requests/Headers";

import { useToasts } from "react-toast-notifications";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { AuthContext } from "../../context/auth";
import { PortraitSharp } from "@material-ui/icons";

import {
  Box as MuiBox,
  Button as MuiButton,
  Typography as MuiTypography,
  Modal as MuiModal,
  Checkbox as MuiCheckbox,
  FormControlLabel as MuiFormControlLabel
} from '@mui/material';

import PaymentModal from "../PaymentModal/PaymentModal";



import {
  ModeOfTransportationContext,
  ScreenContext,
} from "../../helpers/context";

export const TravelInformation = (props) => {
  return (
    <Box className="mt-1">
      <Box className="d-flex align-items-center">
        {props.departure && <CgShapeCircle className="text-success" />}
        {props.destination && <CgShapeCircle className="text-danger" />}
        <Typography
          variant="subtitle2"
          component="span"
          color="textSecondary"
          gutterBottom
          className="fw-bold m-0 ms-2"
        >
          {props.location}
        </Typography>
      </Box>
    </Box>
  );
};

const ItemCard = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const { addToast } = useToasts();
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const modes = React.useContext(ModeOfTransportationContext);

  const openFeedbackModal = () => {
    setFeedbackModalOpen(true);
  };

  // Check if component should have a stepbar at the top
  if (props.stepBar) {
    props.checkPropositionState(props.item);
  }

  // Submit user payment
  const handlePayment = (item) => {
    axiosInstance
      .post(`update-proposition/${item.id}/`, { paid: true })
      .then((res) => {
        props.fetchItems();
      });
  };

  const [openPayModal, setOpenPayModal] = React.useState(false);
  const handleOpenModal = () => setOpenPayModal(true);
  const handleCloseModal = () => setOpenPayModal(false);

  // Display the state of the payment process
  const displayPaymentState = (item) => {
    if (item.paid) {
      return (
        <React.Fragment>
          Payé
          <GoVerified className={"ms-1 text-success fs-6"} />
        </React.Fragment>
      );
    } else {
      if (props.itemType === "offer") {
        return (
          <Typography
            variant="subtitle1"
            component="h6"
            color="primary"
            gutterBottom
            className="fw-bold m-0"
          >
            Paiment en attente ..
            <GoUnverified className={"ms-1 fs-6"} />
          </Typography>
        );
      } else {
        return (
          <React.Fragment>
            <MuiModal
              open={openPayModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <PaymentModal paymentOption={() => handlePayment(props.item)} />
            </MuiModal>

            <Button
              // onClick={() => handlePayment(props.item)}
              onClick={handleOpenModal}
              className="mx-auto text-danger border-danger"
              variant="outlined"
              size="small"
            >
              Payer
            </Button>
          </React.Fragment>
          // <Button
          //   onClick={() => handlePayment(props.item)}
          //   className="mx-auto text-danger border-danger"
          //   variant="outlined"
          //   size="small"
          // >
          //   Payer
          // </Button>
        );
      }
    }
  };

  const handleDateChange = (date, value) => {
    const newDate = new Date(value);
    setDate(newDate);
  };

  const handleAdressChange = (e) => {
    setAddress(e.target.value);
  };

  // Submit adress and date
  const handleValidateMeeting = () => {
    axiosInstance
      .post(`update-proposition/${props.item.id}/`, {
        date_of_meeting: date,
        address: address,
        address_state: "Pending",
      })
      .then((res) => {
        props.fetchItems();
      })
      .catch((err) => console.log(err.response));
  };

  const acceptDate = () => {
    axiosInstance
      .post(`update-proposition/${props.item.id}/`, {
        address_state: "Accepted",
      })
      .then((res) => {
        props.fetchItems();
      });
  };

  const rejectDate = () => {
    axiosInstance
      .post(`update-proposition/${props.item.id}/`, {
        address_state: "Rejected",
      })
      .then((res) => {
        props.fetchItems();
      });
  };

  // Submit shipment code
  const meetingConfirmationHandler = (code) => {
    if (code === props.item.meeting_code) {
      axiosInstance
        .post(`update-proposition/${props.item.id}/`, {
          meeting_confirmed: true,
        })
        .then((res) => {
          props.fetchItems();
        });
    } else {
      addToast("Code de rencontre est incorrect", { appearance: "error" });
    }
  };

  // Submit delivery code
  const deliverCodeHandler = (code) => {
    if (code === props.item.delivery_code) {
      axiosInstance
        .post(`update-proposition/${props.item.id}/`, {
          delivery_confirmed: true,
        })
        .then((res) => {
          props.fetchItems();

          axiosInstance
            .post(`update-record/${props.item.record.id}/`, {
              disabled: true,
            })
            .then((res) => {
               
            })
            .catch((err) => {
               
              addToast(err.message, { appearance: "error" });
            });
        });
    } else {
      addToast("Code de livraison est incorrect", { appearance: "error" });
    }
  };

  // Display the state the table header should be in
  const displayDateState = (item) => {
    if (props.disabled) {
      if (!item.delivery_confirmed) {
        return (
          <div>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textSecondary"
              gutterBottom
              className="fw-bold m-0 my-3"
            >
              __ {/* This offer process has ended */}
            </Typography>
          </div>
        );
      }
    }

    if (item.paid) {
      if (props.itemType === "offer") {
        if (item.address_state === "Undefined") {
          return (
            <HeaderSetupMeeting
              handleDateChange={handleDateChange}
              handleAddress={handleAdressChange}
              handleValidateMeeting={handleValidateMeeting}
              date={date}
            />
          );
        } else if (item.address_state === "Pending") {
          const date = formatDate(item.date_of_meeting);
          return <HeaderWaitingForMeeting date={date} address={item.address} />;
        } else if (
          item.address_state === "Accepted" &&
          item.meeting_confirmed === false
        ) {
           
          const date = formatDate(item.date_of_meeting);
          return (
            <div>
              <HeaderWaitingForMeeting
                date={date}
                address={item.address}
                verified={true}
              />
              <HeaderShipmentConfirmation shipmentCode={item.meeting_code} />
            </div>
          );
        } else if (
          item.meeting_confirmed &&
          item.delivery_confirmed === false
        ) {
          const date = formatDate(item.date_of_meeting);
          return (
            <div>
              <HeaderWaitingForMeeting
                date={date}
                address={item.address}
                verified={true}
              />
              <HeaderDeliveryCode validateHandler={deliverCodeHandler} />
            </div>
          );
        }
      } else {
        if (item.address_state === "Undefined") {
          return <HeaderWaitingForMeetingRequest />;
        } else if (item.address_state === "Pending") {
          const date = formatDate(item.date_of_meeting);
          return (
            <HeaderAcceptReject
              address={`Address: ${item.address}, Date: ${date}`}
              rejectHandler={rejectDate}
              acceptHandler={acceptDate}
            />
          );
        } else if (
          item.address_state === "Accepted" &&
          item.meeting_confirmed === false
        ) {
          const date = formatDate(item.date_of_meeting);

          return (
            <div>
              <HeaderWaitingForMeeting
                date={date}
                address={item.address}
                verified={true}
              />
              <HeaderMeetingConfirmation
                confirmationHandler={meetingConfirmationHandler}
              />
            </div>
          );
        } else if (
          item.meeting_confirmed &&
          item.delivery_confirmed === false
        ) {
          const date = formatDate(item.date_of_meeting);
          return (
            <div>
              <HeaderWaitingForMeeting
                date={date}
                address={item.address}
                verified={true}
              />
              <HeaderWithText text={`Code de livraison: ${item.delivery_code}`} />
            </div>
          );
        }
      }

      if (item.delivery_confirmed) {
        const date = formatDate(item.date_of_meeting);
        return (
          <div>
            <HeaderWaitingForMeeting
              date={date}
              address={item.address}
              verified={true}
            />
            <HeaderWithText
              text={
                <div>
                  Rencontre confirmé
                  <GoVerified className={"ms-1 text-success fs-6"} />
                </div>
              }
            />
            <Button
              onClick={openFeedbackModal}
              color="primary"
              variant="contained"
              className="mb-4"
            >
              Ajouter un avis
            </Button>
          </div>
        );
      }
    }
  };

  // Change the state of a proposition
  const changePropositionState = (state) => {
    const data = { proposition_state: state };

    axiosInstance
      .post(`update-proposition/${props.item.id}/`, data)
      .then((res) => {
         
        props.fetchItems();
      });
  };

  // Check if an ask proposition is accepted, rejected or in progress
  const displayAskPropositionState = (proposition) => {
    if (props.itemType === "offer") {
      if (proposition.proposition_state === "Pending") {
        return (
          <Box
            component={"div"}
            className={"d-flex align-items-center justify-content-end"}
          >
            <Button
              onClick={() => changePropositionState("Accepted")}
              className="me-1 text-success border-success customize-inputButton"
              variant="outlined"
              size="small"
              disabled={props.disabled}
            >
              Accept
            </Button>
            <Button
              onClick={() => changePropositionState("Rejected")}
              className="ms-1 text-danger border-danger customize-inputButton"
              variant="outlined"
              size="small"
              disabled={props.disabled}
            >
              Refuser
            </Button>
          </Box>
        );
      } else if (proposition.proposition_state === "Accepted") {
        return (
          <div>
            <div>
              Accepté <GoVerified className={"ms-1 text-success fs-6"} /> 
            </div>
            <div className="my-2">
              Waiting for paiment{" "}
              <GoUnverified className={"ms-1 text-primary"} />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            Rejected
            <MdCancel className={"text-danger fs-6"} />
          </div>
        );
      }
    } else if (props.itemType === "request") {
      if (proposition.proposition_state === "Pending") {
        return (
          <div className="my-2">
            Waiting for acceptance {" "}
            <GoUnverified className={"ms-1 text-primary"} />
          </div>
        );
      }
    }
  };

  return (
    <Box
      component={"div"}
      key={props.item.id}
      className={"px-1 my-2"}
      style={{ width: "100%" }}
    >
      {displayDateState(props.item)}
      {props.askProposition && props.item.proposition_state === "Pending" ? (
        <div>
          <div className="my-2">{displayAskPropositionState(props.item)}</div>
          <Card className={"shadow py-2 my-3"} style={{ padding: "10px", margin: "10px" }}>

            <Grid item sm={"auto"} xs={12}>
              <Box component="div">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  gutterBottom
                  className="fw-bold m-0 pb-1 border-bottom border-2 text-dark"
                >
                  {props &&
                    moment(props.item.date).format("dddd DD MMMM YYYY")}
                  {props &&
                    modes &&
                    props.item.Proposed_moyen_de_transport &&
                    modes[props.item.Proposed_moyen_de_transport]}
                </Typography>
              </Box>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={2}
              item
              sm={"auto"}
              xs={12}
            >
              <Grid item sm={"auto"} xs={12}>
                <Box
                  component="div"
                  className={"border-bottom border-2 pb-2"}
                >
                  <TravelInformation
                    location={props && props.item.Proposed_city_arrival}
                    departure={true}
                  />
                  <TravelInformation
                    location={props && props.item.Proposed_city_destination}
                    destination={true}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid>
              <label>
                <input type="checkbox" name={"Proposed_home_delivery"} checked={props.item.Proposed_home_delivery} />
                | Home Delivery
              </label>
            </Grid>



            <CardContent>
              <Typography
                variant="h6"
                component="h6"
                color="textPrimary"
                gutterBottom
                className={`m-0 me-1 fw-medium`}
              >
                Message
              </Typography>
              <Typography
                variant="subtitle2"
                component="h6"
                color="textPrimary"
                gutterBottom
                className={`m-0 me-1 fw-normal`}
              >
                {props.item.message}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <TableContainer
          component={props.noShadow ? "div" : Paper}

        >
          <Table>
            <TableHead>
              <TableRow>
                {showImage && <TableCell />}

                <TableCell align="left">Objet</TableCell>
                <TableCell align="left">Quantité</TableCell>
                <TableCell align="left">Poids</TableCell>
                <TableCell align="left">Prix €</TableCell>
                {!props.onlyDisplay && (
                  <TableCell align="left">État</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.onlyDisplay ? (
                props.item.ask_items.map((item) => {
                  return (
                    <Row
                      disabled={props.disabled}
                      row={item}
                      key={item.id}
                      onlyDisplay={true}
                      setShowImage={setShowImage}
                      showImage={showImage}
                    />
                  );
                })
              ) : (
                <React.Fragment>
                  {!props.askProposition
                    ? props.item.proposition_items.map((item) => {
                      return (
                        <Row
                          disabled={props.disabled}
                          key={item.id}
                          itemType={props.itemType}
                          fetchItems={props.fetchItems}
                          row={item}
                          onlyDisplay={false}
                          setShowImage={setShowImage}
                          showImage={showImage}
                        />
                      );
                    })
                    : props.item.record.ask_items.map((item) => {
                      return (
                        <Row
                          disabled={props.disabled}
                          key={item.id}
                          itemType={props.itemType}
                          fetchItems={props.fetchItems}
                          row={item}
                          onlyDisplay={false}
                          askProposition={true}
                          setShowImage={setShowImage}
                          showImage={showImage}
                        />
                      );
                    })}
                </React.Fragment>
              )}
              {props.showTotal && (
                <TableRow>
                  {showImage && <TableCell />}
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell className={`text-nowrap`} align={"left"}>
                    Total:{" "}
                    {objectSum(
                      props.askProposition
                        ? props.item.record.ask_items
                        : props.item.proposition_items,
                      "price"
                    )}
                    €
                  </TableCell>
                  <TableCell align="left" className={`text-nowrap`}>
                    {displayPaymentState(props.item)}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {props.item.delivery_confirmed && (
        <FeedbackModal
          writer={user}
          receiver={
            user.id === props.item.user.id
              // user.email === props.item.user.email
              ? props.item.record.user
              : props.item.user
          }
          feedbackModalOpen={feedbackModalOpen}
          setFeedbackModalOpen={setFeedbackModalOpen}
        />
      )}
    </Box>
  );
};

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { addToast } = useToasts();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [price, setPrice] = useState(row.price);

  // Change the price of an item
  const changePriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const classes = useRowStyles();

  // Change the current state of the item
  const changeItemState = (state) => {
    if (price !== "" && price !== null) {
      const data = { state: state };

      if (row.price !== price && state === "Accepted") {
        data.price = price;
      }

      axiosInstance
        .post(`update-proposition-item/${row.id}/`, data)
        .then((res) => {
          props.fetchItems();
        });
    } else {
      addToast("The price for the item can not be empty", {
        appearance: "error",
      });
    }
  };

  // Display if item is accepted, rejected or in progress
  const displayItemState = (row) => {
    if (row.state === "Undefined") {
      if (props.itemType === "offer") {
        return (
          <Box
            component={"div"}
            className={"d-flex align-items-center justify-content-end"}
          >
            <Button
              onClick={() => changeItemState("Accepted")}
              className="me-1 text-success border-success customize-inputButton"
              variant="outlined"
              size="small"
              disabled={props.disabled}
            >
              Accept
            </Button>
            <Button
              onClick={() => changeItemState("Rejected")}
              className="ms-1 text-danger border-danger customize-inputButton"
              variant="outlined"
              size="small"
              disabled={props.disabled}
            >
              Refuser
            </Button>
          </Box>
        );
      } else {
        return (
          <React.Fragment>
            En Cours ...
            <GoUnverified className={"text-primary ms-1 fs-6"} />
          </React.Fragment>
        );
      }
    } else if (row.state === "Accepted") {
      return (
        <React.Fragment>
          Accepté
          <GoVerified className={"ms-1 text-success fs-6"} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          Rejected
          <MdCancel className={"text-danger fs-6"} />
        </React.Fragment>
      );
    }
  };

  // Function for getting item images
  const getItemImages = () => {
    const getImageURL =
      props.onlyDisplay || props.askProposition
        ? `get-ask-record-item-images/${row.id}/`
        : `get-item-images/${row.id}/`;

    axiosInstance
      .get(getImageURL)
      .then((res) => {
         
        setImages(res.data);

        if (res.data.length > 0) {
          props.setShowImage(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Display item price
  const displayPrice = () => {
    if (row.price) {
      return `$${row.price}`;
    } else {
      if (props.itemType === "offer") {
        return (
          <TextField
            disabled={props.disabled}
            id={`price-${row.id}`}
            size={"small"}
            variant="outlined"
            type={"number"}
            inputProps={{ min: 0 }}
            InputLabelProps={{ shrink: false }}
            name={"price"}
            placeholder={"Price"}
            defaultValue={row.price}
            onChange={changePriceHandler}
            style={{ width: "100px" }}
          />
        );
      } else {
        return (
          <React.Fragment>
            <GoUnverified className={"text-primary ms-1 fs-6"} />
          </React.Fragment>
        );
      }
    }
  };

  // Fetch item images
  React.useEffect(() => {
    getItemImages();
  }, []);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {images.length > 0 && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              <React.Fragment>
                <PhotoCamera />
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </React.Fragment>
            </IconButton>
          </TableCell>
        )}
        {images.length === 0 && props.showImage && <TableCell />}
        <TableCell component="th" scope="row" align="left">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.quantity}</TableCell>
        <TableCell align="left">{row.weight}</TableCell>
        <TableCell align="left">{displayPrice()}</TableCell>
        {props.onlyDisplay === false && (
          <TableCell align="left">{displayItemState(row)}</TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <SRLWrapper>
                <Grid container spacing={3}>
                  {images.map((image, index) => {
                    return (
                      <Grid item xs={6} sm={3} key={index}>
                        <Paper variant="outlined">
                          <a href={image.image}>
                            <img
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                              src={image.image}
                            />
                          </a>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </SRLWrapper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default ItemCard;
