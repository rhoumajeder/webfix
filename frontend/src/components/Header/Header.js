import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Badge,
} from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { RiAdvertisementFill, RiShoppingCartFill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { MdMail, MdLocalOffer } from "react-icons/md";
import { FaListAlt, FaPowerOff, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BiInfinite, BiShuffle } from "react-icons/bi";
import { Notifications, Close, FiberManualRecord } from "@material-ui/icons";

import objectInArray from "../../helpers/objectInArray";

import { Link } from "react-router-dom";

import "./Header.css";

import { AuthContext } from "../../context/auth";

import axiosInstance from "../../helpers/axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  animatedBadge: {
    "& span": {
      animation: "$pulse 0.60s alternate infinite"

    }

  },
  redBadge: {
    backgroundColor: "red",
    color: "white"
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(0.5)"
    },
    "100%": {
      transform: "scale(1.5)"
    }
  }
}))


const markAsSeen = (notifications) => {
  localStorage.setItem('seenNotifications', JSON.stringify(notifications))
}

const hasNewNotification = (notifications) => {
  const oldNotifications = JSON.parse(
    localStorage.getItem('seenNotifications')
  ) || []

  return (notifications.findIndex(notification => !(
    oldNotifications.includes(notification)
  ))) !== -1
}

const Header = () => {
  let history = useHistory();
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(anchorElNotification);

  const [user, setUser] = useContext(AuthContext);

  const [isSeen, setSeenStatus] = React.useState(false);

  const getAttention = objectInArray(notifications, "is_read", false) && hasNewNotification(
    notifications.map(notification => notification.id)
  ) && !isSeen


  // Get notifications for current user
  const getNotifications = () => {
    axiosInstance
      .get("notifications/get-notifications/")
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // Send call to update notification
  const updateNotification = (data, id) => {
    axiosInstance
      .post(`notifications/update-notification/${id}/`, data)
      .then((res) => {
        console.log(data);
        getNotifications();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // Mark a notification as read
  const markAsRead = (id) => {
    updateNotification({ is_read: true }, id);
  };

  // Send request to delete notification
  const deleteNotification = (id) => {
    axiosInstance
      .delete(`notifications/delete-notification/${id}/`)
      .then((res) => {
        console.log(res.data);
        getNotifications();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const redirectWithNotification = (link, id) => {
    deleteNotification(id);
    history.push(link);
    history.go();
  };

  useEffect(() => {
    if (user.username) {
      getNotifications();
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (e) => {
    setAnchorElNotification(e.currentTarget);
    setSeenStatus(true)
    markAsSeen(notifications.map(notification => notification.id))
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = (e) => {
    setAnchorElNotification(null);
  };
  console.log("start rje ");
  console.log(user.id);
  console.log(user.username);
  console.log("end rje ");

  return (
    <AppBar position="sticky" className={"bg-white text-dark py-2"}>
      <Toolbar variant="dense">
        <Button
          edge="start"
          color="inherit"
          aria-label="home"
          className="mx-2"
          size={"small"}
          onClick={() => history.push("/home")}
        >
          <img
            // src={require("../../assets/images/placeholder-logo.svg").default}
            src={require("../../assets/images/logo-lelbled.svg").default} 
            alt="Header Logo"
            className={"w-100"}
          />
        </Button>
        <Box component="div" display={{ xs: "none", sm: "block" }}>
          <Link to="/record-creation" className="text-link">
            <Button
              className="mx-2"
              variant="contained"
              color="secondary"
              aria-label="menu"
              startIcon={<RiAdvertisementFill />}
            >
              Déposer une annonce
            </Button>
          </Link>
        </Box>
        {/* <Box component="div" display={{ xs: "none", md: "block" }}>
          <Link to="/shop" className="text-link">
            <Button
              className="mx-2"
              color="primary"
              aria-label="menu"
              startIcon={<RiShoppingCartFill />}
            >
               Shop
            </Button>
          </Link>
        </Box> */}

        <Box component="div" className={"ms-auto"}>
          {user.username ? (
            <React.Fragment>
              <Button
                onClick={handleMenu}
                color="inherit"
                className={"text-capitalize"}
              >
                <Typography
                  variant={"h6"}
                  color={"textSecondary"}
                  className={"fw-medium me-2"}
                >
                  {user.username}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user.photo ? user.photo : require(
                      "../../assets/images/placeholder-avatar.png"
                    ).default
                  }
                />
                {open ? (
                  <FaAngleUp className={"text-dark fs-6 ms-1"} />
                ) : (
                  <FaAngleDown className={"text-dark fs-6 ms-1"} />
                )}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                className="user-options"
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link to={`/user-profile/${user.id}`} className="text-link">
                    <Box
                    
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <BsPersonFill className="me-2 fs-5" /> Profile 
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={{
                      pathname: "/chat",
                      state: {
                        currentPropRoom: null,
                        userid: user.id
                      },
                    }}
                    className="text-link"
                  >
                    <Box
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <MdMail className="me-2 fs-5" /> Boite de réception
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/list-offers" className="text-link">
                    <Box
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <MdLocalOffer className="me-2 fs-5" /> Mes offres
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/list-requests" className="text-link">
                    <Box
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <BiShuffle className="me-2 fs-5" /> Mes Demandes
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem className={"d-sm-none d-xs-flex"}>
                  <Link to="/record-creation" className="text-link">
                    <Box
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <RiAdvertisementFill className="me-2 fs-5" /> Déposer une
                      annonce
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  className={"d-lg-none d-md-flex"}
                >
                  <Box
                    component="span"
                    className="d-flex align-items-center justify-content-evenly"
                  >
                    <RiShoppingCartFill className="me-2 fs-5" /> Online Shop
                  </Box>
                </MenuItem>
                <Divider className="my-2" />
                <MenuItem>
                  <Link to="/logout" className="text-link">
                    <Box
                      component="span"
                      className="d-flex align-items-center justify-content-evenly"
                    >
                      <FaPowerOff className="me-2 fs-5" /> Se déconnecter
                    </Box>
                  </Link>
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                color="Primary"
                variant="contained"
              >
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/login"
                >
                  Se Connecter / Inscription
                </Link>
              </Button>
            </React.Fragment>
          )}
        </Box>
        {user.username && (
          <Box>
            <IconButton onClick={handleNotificationMenu}>
              <Badge
                classes={{ badge: classes.redBadge }}
                {...(getAttention ? {
                  variant: 'dot',
                  className: classes.animatedBadge,
                } : {})}
              >
                <Notifications />
              </Badge>
            </IconButton>
            <Menu
              id="menu-appbar-notification"
              anchorEl={anchorElNotification}
              className="user-options"
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={notificationOpen}
              onClose={handleNotificationClose}
              PaperProps={{
                style: {
                  maxHeight: 216,
                },
              }}
            >
              {notifications.length > 0 ? (
                notifications.map((notification) => {
                  const link = {};

                  if (notification.type === "Proposition") {
                    const prop_notification =
                      notification.proposition_notification;

                    link.pathname =
                      // prop_notification.proposition.user.username ===
                      //   user.username
                      prop_notification.proposition.user.id ===
                      user.id
                        ? `/my-request-state/${notification.proposition_notification.proposition.id}`
                        : `/my-offer-state/${notification.proposition_notification.proposition.id}`;

                    link.state = {
                      askRecord:
                        prop_notification.proposition.record.type === "Ask",
                    };
                  } else if (notification.type === "Message") {
                    link.pathname = "/chat";
                    link.state = {
                      currentPropRoom: notification.room_notification ? notification.room_notification.room : null,
                    };
                  }

                  return [(
                    <MenuItem key={`menu-item-${notification.id}`}>
                      <div
                        className="d-flex align-items-center"
                        onClick={() =>
                          redirectWithNotification(link, notification.id)
                        }
                      >
                        <Avatar style={{ marginRight: "10px" }} />{" "}
                        {notification.message}
                      </div>
                      <IconButton
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Close color="action" />
                      </IconButton>
                      {!notification.is_read && (
                        <IconButton
                          onClick={() => markAsRead(notification.id)}
                        >
                          <FiberManualRecord color="primary" />
                        </IconButton>
                      )}
                    </MenuItem>
                  ), (
                    <Divider key={`divider-${notification.id}`} />
                  )]
                })
              ) : (
                <MenuItem>Vous n'avez pas des notifications</MenuItem>
              )}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
