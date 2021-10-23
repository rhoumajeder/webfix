import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { GoUnverified } from "react-icons/go";
import Grid from "@material-ui/core/Grid";
import { Box, Link, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import "./Header.css";
export const HeaderWithText = ({
  text,
  subtitle,
  link,
  linkText,
  titleIcon,
  subtitleIcon,
}) => {
  return (
    <Typography
      variant="subtitle1"
      component="h6"
      color="textSecondary"
      gutterBottom
      className={`fw-bold m-0 ${subtitle ? "mt-3 mb-0" : "my-3"}`}
    >
      {text}{" "}
      {titleIcon && (
        <Box component={"span"} className={"ms-1"}>
          {titleIcon}
        </Box>
      )}
      {subtitle && (
        <HeaderSubtitle
          text={subtitle}
          isLink={link}
          linkText={linkText}
          icon={subtitleIcon}
        />
      )}
    </Typography>
  );
};

export const HeaderSubtitle = ({ text, isLink, linkText, icon }) => {
  return (
    <Typography
      variant="subtitle2"
      component="h6"
      color="textSecondary"
      gutterBottom
      className="fw-bold m-0 mb-3"
    >
      {text}
      {isLink && (
        <Link href={`tel:${linkText}`} color={"inherit"} className={"ms-1"}>
          {linkText}
        </Link>
      )}
      {icon && (
        <Box component={"span"} className={"ms-1"}>
          {icon}
        </Box>
      )}
    </Typography>
  );
};

export const HeaderWaitingForMeetingRequest = () => {
  return (
    <Typography
      variant="subtitle1"
      component="h6"
      color="textSecondary"
      gutterBottom
      className="fw-bold m-0 my-3"
    >
      Waiting For Address Meeting -{" "}
      <span className={"text-primary"}>
        In Progress
        <GoUnverified className={"ms-1"} />{" "}
      </span>
    </Typography>
  );
};

export const HeaderAcceptReject = ({
  address,
  acceptHandler,
  rejectHandler,
}) => {
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
          {address}
        </Typography>
      </Grid>
      <Grid item sm={"auto"} xs={12}>
        <Box component={"div"} className={"d-flex align-items-center my-1"}>
          <Button
            className="me-1 text-success border-success"
            variant="outlined"
            onClick={acceptHandler}
            size="small"
          >
            Accept
          </Button>
          <Button
            className="ms-1 text-danger border-danger"
            variant="outlined"
            onClick={rejectHandler}
            size="small"
          >
            Reject
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export const HeaderMeetingConfirmation = ({ confirmationHandler }) => {
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
          Meeting Confirmation
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
            placeholder={"Confirmation Code"}
          />
          <Button
            className="ms-1 px-3 customize-inputButton"
            color={"primary"}
            variant="outlined"
            onClick={() => confirmationHandler(code)}
            size="small"
          >
            Confirm
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
