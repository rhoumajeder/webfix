import React, { useEffect, useState } from "react";

import { Paper, Grid, Typography, List } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import usePagination from "../../hooks/usePagination";

import CustomPagination from "../../components/Pagination/Pagination";

import Header from "../../components/Header/Header";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import Spinner from "../../components/Spinner/Spinner";

import "./Chat.css";

import axiosInstance from "../../helpers/axios";

import ChatBody from "../../components/ChatBody/ChatBody";

import { useLocation } from "react-router";


const PAGE_SIZE = 3;
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
  previewArea: {
    height: "70vh",
    overflowY: "auto",

  },
});

const Chat = (props) => {
  const location = useLocation();
  let currentPropRoom = "";
  let userid = "";

  if (location.state) {
    currentPropRoom = location.state.currentPropRoom
    userid = location.state.userid
  }

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
  // const [currentRoom, setCurrentRoom] = useState(actualRoom ? parseInt(actualRoom) : null);
  const [currentRoom, setCurrentRoom] = useState(null);
 
  // Get rooms for current user
  const getRooms = (currentRoom) => {
    axiosInstance
      .get("chat/get-rooms/")
      .then((res) => {
        console.log(res.data);
        console.log("start rje in chat  ");
        console.log(userid);  
        
        console.log("end rje in chat  ");

        setOwnedRooms(res.data["owner_rooms"]);
        setUserRooms(res.data["user_rooms"]);

        if (!currentRoom) {
          if (res.data["owner_rooms"].length > 0) {
            setCurrentRoom(res.data["owner_rooms"][0].id);
            localStorage.setItem("currentRoom", res.data["owner_rooms"][0].id);
          } else if (res.data["user_rooms"].length > 0) {
            setCurrentRoom(res.data["user_rooms"][0].id);
            localStorage.setItem("currentRoom", res.data["user_rooms"][0].id);
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

  const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
    userRooms,
    PAGE_SIZE
 );
 const onPageChange = (event, value) => changePage(value);
 const userRoomsdata = getCurrentData();

  useEffect(() => {
    getRooms(currentRoom);
  }, []);

  // Change the current room user is in
  const changeCurrentRoom = (room) => {
    setCurrentRoom(room);
    getRooms(currentRoom);
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
            <List className={classes.previewArea} >
              {ownedRooms.map((room) => {
                return (
                  <ChatPreview
                    selected={room.id === currentRoom}
                    // username={room.user.username}
                    username={room.user.id == userid ? room.owner.username : room.user.username }
                    room={room}
                    handleClick={changeCurrentRoom}
                  />
                );
              })}
              {userRoomsdata.map((room) => {
                return (
                  <ChatPreview
                    selected={room.id === currentRoom}
                    // username={room.owner.username}
                    username={room.user.id == userid ? room.owner.username : room.user.username }
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
        <Grid item lg={12} md={12} xs={12} className="my-2 text-center">
              <CustomPagination
                itemCount={userRooms.length}
                itemsPerPage={PAGE_SIZE}
                onPageChange={onPageChange}
                currentPage={currentPage}
                pageCount={pageCount}
              />
            </Grid>
      </div>
    </div>
  );
};

export default Chat;
