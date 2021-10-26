import React, { useContext } from "react";

import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import LuggageCheck from "../LuggageCheck/LuggageCheck";
import { ScreenContext } from "../../helpers/context";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Feedback from "../../components/Feedback/Feedback";

import { AuthContext } from "../../context/auth";

import axiosInstance from "../../helpers/axios";

import { useHistory } from "react-router";

import moment from "moment";

const RecordDetailsSideBar = (props) => {
  let history = useHistory();
  const [user, setUser] = useContext(AuthContext);
  console.log(props);

  // Open a new chat room when user messages new user
  const openChatRoom = () => {
    axiosInstance
      .post(
        `chat/chat-room/${props.record.user.email}/${user.email}/${props.record.id}/`
      )
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: "/chat",
          state: {
            currentPropRoom: null,
          },
        });
        history.go();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Grid
      item
      md={4}
      xs={12}
      className={`my-2 ${screen.width <= 768 ? "order-first" : "order-last"}`}
    >
      <Card className={"shadow"}>
        <CardContent>
          {props.record.user ? (
            <React.Fragment>
              <UserAvatar
                hasRating={true}
                inlineRating={true}
                name={props.record.user.username}
                user={props.record.user}
              />
              <div style={{ textAlign: "center" }} className="mb-2">
                <Button
                  onClick={openChatRoom}
                  color="primary"
                  className="text-center me-auto ms-auto"
                  variant="contained"
                  disabled={props.disabled}
                >
                  Message
                </Button>
              </div>
            </React.Fragment>
          ) : null}
          <Box component={"div"} className={"border-top border-2 py-3"}>
            <LuggageCheck
              check={props.record.user.checked_billet}
              size={"h6"}
              text="Billet de Voyage"
              className={"fw-medium"}
            />
            <LuggageCheck
              check={props.record.user.checked_phone}
              size={"h6"}
              text="Téléphone vérifié"
              className={"fw-medium"}
            />
            <LuggageCheck
              check={props.record.user.checked_email}
              size={"h6"}
              text="E-mail vérifié"
              className={"fw-medium"}
            />
          </Box>

          <Box component={"div"} className={"border-top border-2 py-3"}>
            <Typography
              variant="h6"
              component="h6"
              color="textPrimary"
              gutterBottom
              className={`m-0 me-1 fw-medium`}
            >
              Activités
            </Typography>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textPrimary"
              gutterBottom
              className={`m-0 me-1 fw-medium`}
            >
              Annonces Publiés: {props.record.user.records.length}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textPrimary"
              gutterBottom
              className={`m-0 me-1 fw-medium`}
            >
              Membre Depuis:{" "}
              {moment(props.record.user.start_date).format("MMM YYYY")}
            </Typography>
          </Box>

          <Box component={"div"} className={"border-top border-2 py-3"}>
            <Typography
              variant="h6"
              component="h6"
              color="textPrimary"
              gutterBottom
              className={`m-0 me-1 fw-medium`}
            >
              Avis:
            </Typography>
            {props.record.user.received_feedback.length > 0 ? (
              props.record.user.received_feedback.map((feedback) => {
                return (
                  <Feedback
                    text={feedback.text}
                    user={feedback.writer.username}
                  />
                );
              })
            ) : (
              <Typography
                variant="caption"
                color="textPrimary"
                gutterBottom
                className="fw-normal m-0"
              >
                This user has no ratings yet
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RecordDetailsSideBar;
