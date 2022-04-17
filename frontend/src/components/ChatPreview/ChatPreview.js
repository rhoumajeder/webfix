import React, { useContext } from "react";

import {
  Paper,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Box,
  Grid,
  Button,
  ButtonBase,
  
} from "@material-ui/core";
import { Link } from "react-router-dom";

import moment from "moment";

import objectSum from "../../helpers/objectSum";

import { ModeOfTransportationContext } from "../../helpers/context";

import { TravelInformation } from "../TravelCard/TravelCard";

const ChatPreview = (props) => {
  const modes = React.useContext(ModeOfTransportationContext);
 
  return (
    <React.Fragment>
      <ListItem
        selected={props.selected}
        button
        onClick={() => props.handleClick(props.room.id)}
        key={props.username}
        style={{ display: "block" }}
      >
        <Box component="div">
          <Typography
            variant="subtitle1"
            color="inherit"
            gutterBottom
            className="fw-bold m-0 pb-1 border-bottom border-2 text-dark"
          >
            {moment(props.room.record.date).format("dddd DD MMMM YYYY")}
            {props.room.record.moyen_de_transport &&
              modes[props.room.record.moyen_de_transport]}
          </Typography>
        </Box>
        <div className="d-flex justify-content-between border-bottom border-2 my-3 pb-3">
          <Box component="div">
            <TravelInformation
              location={props.room.record.city_arrival}
              departure={true}
            />
            <TravelInformation
              location={props.room.record.city_destination}
              destination={true}
            />
          </Box>
          <Box component="div" className={"user-luggage-info"}>
            {props.room.record.type === "Propose" ? (
              <React.Fragment>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  className="fw-bold m-0"
                >
                  {" "}
                  Min Prix:{props.room.record.min_price}
                  {/* {objectSum(props.room.record.sub_records, "price") + "€"}{" "}  min_price */}
                  {/* {objectSum(props.room.record.sub_records, "price") + "€"}{" "}  min_price */}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  className="fw-bold m-0"
                >
                  {" "}
                  Max Poids: {props.room.record.max_weight + "Kg"}{" "}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  className="fw-bold m-0"
                >
                  {" "}
                  {/* Total price:{props.room.record.min_price} */}
                  {/* {objectSum(props.room.record.ask_items, "price") + "€"}{" "} */}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                  className="fw-bold m-0"
                >
                  {" "}
                  {/* Total weight:{props.room.record.max_weight} */}
                  {/* {objectSum(props.room.record.ask_items, "weight") + "Kg"}{" "} */}
                </Typography>
              </React.Fragment>
            )}
          </Box>
        </div>

        <div
          style={{ display: "flex", alignContent: "center" }}
          className="my-2"
        >
          <ListItemIcon>
            <Avatar
              alt={props.username}
              
              // src="https://material-ui.com/static/images/avatar/1.jpg"
              src={
                props.room.owner.photo
                  ?  props.room.owner.photo 
                  : require("../../assets/images/placeholder-avatar.png").default
              }
            />
          </ListItemIcon>
          {/* <ListItemText primary={props.username}></ListItemText> */}
           
             
          { props.username && (
            // <ListItemText primary={props.username}>
          <Link to={`/user-profile/${props.id}`}>
            <ButtonBase>
              {props.username ? props.username : "Unknown"}
            </ButtonBase>
          </Link> 
          
          // </ListItemText>
          )
         }  
        {" "}
        <ListItemText primary={" "}></ListItemText>

          {props.room.record.type === "Propose" ? 
              (
              <Button variant="contained" color="primary" style={{ marginTop: "10px" }} >
                <Link style={{ textDecoration: "inherit",  color: "inherit", }}
                    to={`/record-details/${props.room.record.id}`}> Zoom </Link> 
              </Button>
              ) :
              (
                <Button variant="contained" color="primary" style={{ marginTop: "10px" }} >
                <Link style={{ textDecoration: "inherit",  color: "inherit", }}
                    to={`/ask-record-details/${props.room.record.id}`}> Zoom </Link>  
              </Button>
              )
          }


        </div>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default ChatPreview;
