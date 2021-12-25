import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Modal,
  TextField,
  Paper,
  Fade,
  InputLabel,
} from "@material-ui/core";

import { ScreenContext } from "../../helpers/context";
import axiosInstance from "../../helpers/axios";
import Header from "../../components/Header/Header";
import { useParams } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import RecordDetailsSideBar from "../../components/RecordDetailsSideBar/RecordDetailsSideBar";
import TravelCard from "../../components/TravelCard/TravelCard";
import ItemCard from "../../components/ItemCard/ItemCard";

import "./index.css";

import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router";

import { AuthContext } from "../../context/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "white",
  padding: "40px",
};

const AskRecordDetails = () => {
  const [user, setUser] = useContext(AuthContext)
  let history = useHistory();
  const { addToast } = useToasts();
  const { id } = useParams();
  const screen = React.useContext(ScreenContext);
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [proposition, setProposition] = useState({});

  // Get the current record
  useEffect(() => {
    axiosInstance
      .get(`get-record/${id}/`)
      .then((res) => {
        console.log(res.data);
        setRecord(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Submit a proposition to current record
  const submitProposition = () => {
    axiosInstance
      .post(`create-proposition/${id}/`, proposition)
      .then((res) => {
        console.log(res.data);
        addToast("Message sent", { appearance: "success" });
        history.push({
          pathname: `/my-request-state/${res.data.id}`,
          state: {
            askRecord: true,
          },
        });
        history.go();
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    setProposition({ ...proposition, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    handleModal();
    submitProposition();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Header />
      <Container className="py-5">
        <Grid container direction="row" justify="center" spacing={1}>
          <Grid
            item
            md={8}
            xs={12}
            className={`my-2 ${screen.width <= 768 ? "order-last" : "order-first"
              }`}
          >
            {record && (
              <TravelCard
                recordInputInfo={false}
                username={record.user.username}
                user={record.user}
                record={record}
                hasShadow={true}
                itemTable={false}
              />
            )}

            <Card className={"shadow py-2 my-3"}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h6"
                  color="textPrimary"
                  gutterBottom
                  className={`m-0 me-1 fw-medium`}
                >
                  Description
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h6"
                  color="textPrimary"
                  gutterBottom
                  className={`m-0 me-1 fw-normal`}
                >
                  {record && record.description}
                </Typography>
              </CardContent>
            </Card>
            <Card className={`shadow py-2 my-3`}>
              <CardContent>
                <Box>
                  <ItemCard onlyDisplay={true} item={record} noShadow={true} />
                </Box>
              </CardContent>
            </Card>
            <Box className="my-2 d-flex align-items-center justify-content-end">

            {!(user.id === record.user.id) &&<Button
                className="ms-auto my-2"
                variant="outlined"
                color={"primary"}
                disabled={user.username ? false : true}
                size="large"
                onClick={handleModal}
              >
                Interact
              </Button>}

            </Box>
          </Grid>
          <RecordDetailsSideBar record={record} disabled={user.username ? false : true} />
        </Grid>
        <Modal
          open={modalOpen}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={modalOpen}>
            <Box style={style}>
              <Typography variant="h6">Send a proposition</Typography>
              <div className="my-4 w-100">
                <InputLabel htmlFor={"message"}>Message</InputLabel>
                <TextField
                  className="w-100 my-3"
                  name="message"
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Message"
                  multiline
                  rows={3}
                  helperText={"Write a message to the owner of the record"}
                />
              </div>
              <Button
                className="ms-auto my-2"
                variant="contained"
                color={"primary"}
                size="large"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default AskRecordDetails;
