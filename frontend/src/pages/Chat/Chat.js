import React, { useEffect, useState } from "react";

import { Paper, Grid, Typography, List } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import usePaginationHomePage from "../../hooks/usePaginationHomePage";

import CustomPagination from "../../components/Pagination/Pagination";

import Header from "../../components/Header/Header";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import Spinner from "../../components/Spinner/Spinner";

import "./Chat.css";

import axiosInstance from "../../helpers/axios";

import ChatBody from "../../components/ChatBody/ChatBody";

import { useLocation } from "react-router";
import NewFooter from "../../components/NewFooter/NewFooter";


const PAGE_SIZE = 5;
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
  const [number_of_items, set_number_of_items] = useState(1);

  // const [currentRoom, setCurrentRoom] = useState(actualRoom ? parseInt(actualRoom) : null);
  const [currentRoom, setCurrentRoom] = useState(null);

  // Get rooms for current user
  const getRooms = (currentRoom) => {
    axiosInstance
      .get("chat/get-rooms/?page=" + 1)
      .then((res) => {


        set_number_of_items(res.data.count);
        setOwnedRooms(res.data.results["owner_rooms"]);
        setUserRooms(res.data.results["user_rooms"]);

        if (!currentRoom) {
          if (res.data.results["owner_rooms"].length > 0) {
            setCurrentRoom(res.data.results["owner_rooms"][0].id);
            localStorage.setItem("currentRoom", res.data.results["owner_rooms"][0].id);
          } else if (res.data.results["user_rooms"].length > 0) {
            setCurrentRoom(res.data.results["user_rooms"][0].id);
            localStorage.setItem("currentRoom", res.data.results["user_rooms"][0].id);
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

  const get_page = (currentPage) => {  //it was only fetchRecords

    setLoading(true);
    axiosInstance
      .get("chat/get-rooms/?page=" + currentPage)
      .then((res) => {
        
        setOwnedRooms(res.data.results["owner_rooms"]);
        setUserRooms(res.data.results["user_rooms"]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);

      });



  };

  const { currentPage, getCurrentData, changePage, pageCount } = usePaginationHomePage(
    userRooms,
    PAGE_SIZE,
    false,
    number_of_items
  );

  const onPageChange = (event, value) => {
    get_page(value);
    changePage(value);

  };



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
              Mes Messages
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
                    username={room.user.id == userid ? room.owner.username : room.user.username}
                    id={room.user.id == userid ? room.owner.id : room.user.id}
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
                    username={room.user.id == userid ? room.owner.username : room.user.username}
                    id={room.user.id == userid ? room.owner.id : room.user.id}
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
            // itemCount={userRooms.length} number_of_items
            itemCount={number_of_items}
            itemsPerPage={PAGE_SIZE}
            onPageChange={onPageChange}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </Grid>
      </div>
      <NewFooter />
    </div>
  );
};

export default Chat;
