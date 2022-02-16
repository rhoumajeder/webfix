import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { GoUnverified, GoVerified } from "react-icons/go";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { ScreenContext } from "../../helpers/context";
import PropTypes from "prop-types";

import "./Header.css";

export const HeaderDeliveryCode = ({ validateHandler }) => {
  const [code, setCode] = useState("");

  const inputChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={"my-3"}
    >
      <Grid item sm={"auto"} xs={12}>
        <Typography
          variant="subtitle1"
          component="h6"
          color="textSecondary"
          gutterBottom
          className="fw-bold m-0 my-1"
        >
          Code de livraison:
        </Typography>
      </Grid>
      <Grid item sm={"auto"} xs={12}>
        <Box component={"div"} className={"d-flex align-items-center my-1"}>
          <TextField
            size="small"
            variant="outlined"
            onChange={inputChange}
            InputLabelProps={{ shrink: false }}
            InputProps={{ classes: { input: "py-2 customize-inputField" } }}
            placeholder={"Delivery Code"}
          />

          <Button
            className="ms-1 px-3 customize-inputButton border-success text-success"
            variant="outlined"
            onClick={() => validateHandler(code)}
            size="small"
          >
            Validate
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export const HeaderWaitingForMeeting = ({ date, address, verified }) => {
  return (
    <Typography
      variant="subtitle1"
      component="h6"
      color="textSecondary"
      gutterBottom
      className="fw-bold m-0 my-3"
    >
      Date de rencontre: {date} <br />
      Address: {address} -{" "}
      <span className={`${verified ? "text-success" : "text-primary"}`}>
        {verified ? (
          <React.Fragment>
            Accepté
            <GoVerified className={"ms-1"} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            En d'attente d'acceptation
            <GoUnverified className={"ms-1"} />
          </React.Fragment>
        )}{" "}
      </span>
    </Typography>
  );
};

export const HeaderShipmentConfirmation = ({ shipmentCode, verified }) => {
  return (
    <Typography
      variant="subtitle1"
      component="h6"
      color="textSecondary"
      gutterBottom
      className="fw-bold m-0 my-3"
    >
      Code de livraison: {shipmentCode} -{" "}
      <span className={`${verified ? "text-success" : "text-primary"}`}>
        {verified ? (
          <React.Fragment>
            Confirmé
            <GoVerified className={"ms-1"} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            Confirmation En cours
            <GoUnverified className={"ms-1"} />
          </React.Fragment>
        )}{" "}
      </span>
    </Typography>
  );
};

export const HeaderSetupMeeting = ({
  date,
  handleDateChange,
  handleAddress,
  handleValidateMeeting,
}) => {
  const screen = React.useContext(ScreenContext);
  HeaderSetupMeeting.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    handleDateChange: PropTypes.func.isRequired,
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={"my-3"}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item sm={"auto"} xs={12}>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textSecondary"
              gutterBottom
              className="fw-bold m-0 my-1"
            >
              Date Of Meeting:
            </Typography>
          </Grid>
          <Grid item sm={"auto"} xs={12}>
            <KeyboardDateTimePicker
              disableToolbar
              autoOk
              variant={screen.width <= 480 ? "dialog" : "inline"}
              format="yyyy/MM/DD HH:mm"
              margin="normal"
              ampm={false}
              disablePast
              id="date-time-picker-inline"
              placeholder="Aujourd'hui"
              value={date}
              InputLabelProps={{ shrink: false }}
              className={"m-0 p-0"}
              color={"primary"}
              size="small"
              inputVariant="outlined"
              InputProps={{ classes: { input: "py-2 customize-inputField" } }}
              onChange={handleDateChange}
              onError={console.log}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item sm={"auto"} xs={12}>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textSecondary"
              gutterBottom
              className="fw-bold m-0 my-1"
            >
              Address:
            </Typography>
          </Grid>
          <Grid item sm={"auto"} xs={12}>
            <Box component={"div"} className={"d-flex align-items-center my-1"}>
              <TextField
                size="small"
                variant="outlined"
                onChange={handleAddress}
                InputLabelProps={{ shrink: false }}
                InputProps={{ classes: { input: "py-2 customize-inputField" } }}
                placeholder={"Addresse de rencontre"}
              />
              <Button
                className="ms-1 px-3 customize-inputButton"
                variant="outlined"
                color={"primary"}
                onClick={handleValidateMeeting}
                size="small"
              >
                Valider
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
