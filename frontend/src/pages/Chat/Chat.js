import React, { useEffect, useState } from "react";

import { Paper, Grid, Typography, List } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header/Header";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import Spinner from "../../components/Spinner/Spinner";

import "./Chat.css";

import axiosInstance from "../../helpers/axios";

import ChatBody from "../../components/ChatBody/ChatBody";

import { useLocation } from "react-router";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "70vh",
  },
  headBG: {
    padding: "2rem",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  headTitle: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
});

const Chat = (props) => {
  const location = useLocation();
  const { currentPropRoom } = location.state;

  const storageRoom = localStorage.getItem("currentRoom");

  let actualRoom = null;
  console.log(storageRoom);

  if (currentPropRoom) {
    localStorage.setItem("currentRoom", currentPropRoom.id);
    actualRoom = currentPropRoom.id;
  } else if (!currentPropRoom && storageRoom) {
    actualRoom = storageRoom;
  }

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [ownedRooms, setOwnedRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(parseInt(actualRoom));

  // Get rooms for current user
  const getRooms = () => {
    axiosInstance
      .get("chat/get-rooms/")
      .then((res) => {
        console.log(res.data);

        setOwnedRooms(res.data["owner_rooms"]);
        setUserRooms(res.data["user_rooms"]);

        if (!currentRoom) {
          if (res.data["owner_rooms"].length > 0) {
            setCurrentRoom(res.data["owner_rooms"][0].id);
          } else if (res.data["user_rooms"].length > 0) {
            setCurrentRoom(res.data["user_rooms"][0].id);
          } else {
            setCurrentRoom(null);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  // Change the current room user is in
  const changeCurrentRoom = (room) => {
    setCurrentRoom(room);
    getRooms();
    localStorage.setItem("currentRoom", room);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      <div className={classes.headBG}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.headTitle}>
              Chat
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          component={Paper}
          className="shadow"
          style={{
            width: "100%",
            height: "70vh",
          }}
        >
          <Grid item xs={5} className={classes.borderRight500}>
            <List>
              {ownedRooms.map((room) => {
                return (
                  <ChatPreview
                    selected={room.id === currentRoom}
                    username={room.user.username}
                    room={room}
                    handleClick={changeCurrentRoom}
                  />
                );
              })}
              {userRooms.map((room) => {
                return (
                  <ChatPreview
                    selected={room.id === currentRoom}
                    username={room.owner.username}
                    handleClick={changeCurrentRoom}
                    room={room}
                  />
                );
              })}
            </List>
          </Grid>
          <Grid item xs={7}>
            <ChatBody room={currentRoom} getRooms={getRooms} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chat;
