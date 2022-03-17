import React, { useContext, useState, useEffect, useRef } from "react";

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

import Messages from "./Messages/Messages";

import "./ChatBody.css"

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
      setLoading(true);
      axiosInstance.get(`chat/get-messages/${props.room}/`).then((res) => {
         
        setMessages(res.data);
        setLoading(false);
      })
        .catch(err => {
          if (err.response.status === 404) {
            localStorage.removeItem("currentRoom")
            setLoading(false);
            props.getRooms(null);
          }
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
             
            getMessages();
            setText("");
          })
          .catch((err) => {
            
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
          <Messages messages={messages} />
        ) : (
          <ListItem>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align={"right"}
                  primary={
                    "Vous n'avez pas des messages, Veuillez envoyer une proposition ou créer une annonce"
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
                <textarea
                  placeholder="Message"
                  value={text}
                  onChange={handleTextChange}
                  className="form-control rounded-0"
                  rows={1}
                  style={{ height: "auto" }}
                ></textarea>
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
