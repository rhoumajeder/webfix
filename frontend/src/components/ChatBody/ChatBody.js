import React, { useContext, useState, useEffect } from "react";

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Fab,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";

import axiosInstance from "../../helpers/axios";

import { AuthContext } from "../../context/auth";

import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";

import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "100vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
    padding: "2rem",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "55vh",
    overflowY: "auto",
    padding: "1rem",
  },
  headTitle: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  message: {
    width: "70%",
    borderRadius: "4px",
    padding: "1rem",
  },
});

const ChatBody = (props) => {
  const classes = useStyles();

  const [user, setUser] = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  // Get all messages for user
  const getMessages = () => {
    if (props.room) {
      axiosInstance.get(`chat/get-messages/${props.room}/`).then((res) => {
        console.log(res.data);
        setMessages(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (text !== "") {
      if (props.room) {
        axiosInstance
          .post(`chat/create-message/${props.room}/`, { content: text })
          .then((res) => {
            console.log(res.data);
            getMessages();
            setText("");
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getMessages();
  }, [props.room]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <List className={classes.messageArea}>
        {props.room ? (
          messages.map((message, index) => {
            const userIsOwner = user.email === message.user.email;

            return (
              <ListItem key={index}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={userIsOwner ? "right" : "left"}
                      style={{
                        marginLeft: userIsOwner ? "auto" : "0px",
                        backgroundColor: userIsOwner ? "#d9e6f7" : "#F4F6F7",
                        color: userIsOwner ? "#537EAB" : "black",
                        wordWrap: "break-word",
                      }}
                      primary={message.content}
                      className={classes.message}
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align={
                        user.email === message.user.email ? "right" : "left"
                      }
                      secondary={moment(message.timestamp).format("hh:mm")}
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align={"right"}
                  primary={
                    "You have no messages yet. Send a proposition or create a record in order to contact other users!"
                  }
                ></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        )}
      </List>

      {props.room && (
        <React.Fragment>
          <Divider />
          <form onSubmit={submitMessage}>
            <Grid spacing={2} container style={{ padding: "20px" }}>
              <Grid item xs={10}>
                <TextField
                  id="outlined-basic-email"
                  placeholder="Message"
                  fullWidth
                  value={text}
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid xs={2} align="right">
                <Fab
                  type="submit"
                  color="primary"
                  aria-label="add"
                  onClick={submitMessage}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChatBody;
