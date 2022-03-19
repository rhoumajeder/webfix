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
import SelectBoxExtended from "../../components/SelectBoxExtended/SelectBoxExtended";
import { KeyboardDatePicker } from "@material-ui/pickers";
import cities from "../../helpers/cities";
import moment from "moment";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";

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
  const [share_on_fb_image, Setshare_on_fb_image] = React.useState(false);

  let defaultdatevalue =  moment(new Date()).add(3, 'M').format("YYYY-MM-DD") // var futureMonth = moment(currentDate).add(1, 'M')
  let Records = {
    date: defaultdatevalue,
    Proposed_moyen_de_transport: "Avion",
    Proposed_city_arrival: "Bretagne, France",
    Proposed_city_destination: "Berlin, Allemagne",
    Proposed_home_delivery: false
  };


  const [proposition, setProposition] = useState({
    date: defaultdatevalue,
    Proposed_moyen_de_transport: "Avion",
    Proposed_city_arrival: "Bretagne, France",
    Proposed_city_destination: "Berlin, Allemagne",
    Proposed_home_delivery: false
  });   
  // currentDate
;
  //alert(defaultdatevalue);
  // const [currentDate, setCurrentDate] = useState(
  //   moment(new Date()).format("YYYY-MM-DD")
  // ); 
  const [currentDate, setCurrentDate] = useState(
    defaultdatevalue
  );
  const [checked, setChecked] = React.useState(false);



  const transportOptions = [
    {
      label: "None",
      value: "",
    },
    {
      label: "Avion",
      value: "Avion",
    },
    {
      label: "Car",
      value: "Car",
    },
  ];

  // Get the current record
  useEffect(() => {
    axiosInstance
      .get(`get-record/${id}/`)
      .then((res) => {
        console.log(res.data);
        console.log("f");
        setRecord(res.data);
        Setshare_on_fb_image((res.data.image_ask).slice(49));
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const deleteRecord = () => {
    axiosInstance 
      .delete(`delete-record/${record.id}/`)
      .then((res) => {
        addToast("Annonce a été supprimé avec succès", { appearance: "success" });
        history.goBack()
      })
  }

  // Submit a proposition to current record
  const submitProposition = () => {
    axiosInstance
      .post(`create-proposition/${id}/`, proposition)
      .then((res) => {
        console.log(res.data);
        addToast("Proposition envoyée", { appearance: "success" });
        history.push({
          pathname: `/my-request-state/${res.data.id}`,
          state: {
            askRecord: true,
          },
        });
        history.go();
      })
      .catch((err) => {
        console.log(err);
      addToast(err.response.data, { appearance: "error" });
      }
      

      );
     
  };

  const handleInputChange = (e) => {
    setProposition({ ...proposition, [e.target.name]: e.target.value });
     
  };


  const handleChangeForCheckBox = () => {
    setChecked(!checked);
    setProposition({ ...proposition, ["Proposed_home_delivery"]: checked });
     
  };


  const handleSelectChange = (item, target) => {
    setProposition({ ...proposition, [target.name]: item.value });
    
     
  };
 

  const handleDateChange = (date) => {
    // setCurrentDate(moment(date).format("YYYY-MM-DD"));
    setProposition({ ...proposition, ["date"]: moment(date).format("YYYY-MM-DD") });
     
    
  };

  const handleConfirm = () => {
    handleModal();
    submitProposition();
    alert(proposition);
  };
  const handleX= () => { 
    setModalOpen(!modalOpen);
   
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

            {!(user.id === record.user.id ) &&<Button
                className="ms-auto my-2"
                variant="outlined"
                color={"primary"}
                disabled={user.username ? false : true}
                size="large" 
                hidden={modalOpen}
                onClick={handleModal}
              >
                Proposer
              </Button>}
              {(user.id === record.user.id) && <Grid item>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={deleteRecord}
                        className="ms-auto my-2 text-danger"
                      >
                        Supprimer
                      </Button>
                    </Grid>}
              <Grid item>
                      <FacebookShareButton 
                            url={"https://storage-test-rje.s3.amazonaws.com/images/" + encodeURI(share_on_fb_image)} 
                            // url={"https://storage-test-rje.s3.amazonaws.com/images/name.jpg"} 
                            quote={" this is a quand "}
                            hashtag={"#this is htag"} 
                            description={" this is description "}
                            className="Demo__some-network__share-button"
                          >   
                            <FacebookIcon size={32} round /> Partager Sur FaceBook
                      </FacebookShareButton>
                </Grid>
            </Box>



            <Fade in={modalOpen} >
              
              <Grid  className={"shadow"} item sm={12} xs={12} md={12}  style={{ backgroundColor: "white", padding:"10px"}} >
                <Typography variant="h6">Send a proposition</Typography>
                <Grid item md={4} xs={12} sm={12} className="my-2">
                    <Typography
                      variant={"subtitle2"}
                      color={"textPrimary"}
                      className={"fw-bold my-2"}
                    >
                      Date de Voyage:
                    </Typography> 
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk
                      variant={screen.width <= 480 ? "dialog" : "inline"}
                      format="DD MMM, yyyy"
                      margin="normal"
                      fullWidth
                      id="date-picker-inline"
                      placeholder="Aujourd'hui"
                      InputLabelProps={{ shrink: false }}
                      className={"m-0 p-0"}
                      color={"primary"}
                      size="small" 
                      defaultValue={defaultdatevalue}
                      value={proposition.date} 
                      inputVariant="outlined"
                      // name={"date"}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}/>  

                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <SelectBoxExtended
                      labelId={"ville-de-depart"}
                      options={cities}
                      label={"Ville De Départ"}
                      name={"Proposed_city_arrival"}
                      // value={proposition.Proposed_city_arrival}
                      placeholder={"Ville De Départ"}
                      onChange={handleSelectChange}
                    />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <SelectBoxExtended
                      labelId={"ville-de-destination"}
                      label={"Ville De Destination"}
                      options={cities}
                      name={"Proposed_city_destination"}
                      // value={proposition.Proposed_city_destination}
                      placeholder={"Ville De Destination"}
                      onChange={handleSelectChange}
                    />
                </Grid>
                <Grid item md={4} xs={12} sm={12} className="my-2">
                      <Typography
                          variant={"subtitle2"}
                          color={"textPrimary"}
                          className={"fw-bold my-1"}
                        >Moyen de Transport:</Typography>
                      <SelectBoxExtended
                        // style={{ zIndex: 100 }}
                        labelId={"moyen-de-transport"}
                        label={"Moyen de transport"}
                        options={transportOptions}
                        name={"Proposed_moyen_de_transport"}
                        // value={proposition.Proposed_moyen_de_transport}
                        placeholder={"Moyen de transport"}
                        onChange={handleSelectChange}
                        className="my-2"
                        // value={ }
                      />
                </Grid>
                <Grid>
                  <label>
                  <input type="checkbox" name={"Proposed_home_delivery"} checked={proposition.Proposed_home_delivery} onChange={handleChangeForCheckBox}/> 
                  | Livraison Main Propre
                  </label>
                </Grid>
                <Grid >
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
                  Confirmer
                  </Button>&nbsp;&nbsp;&nbsp;
                  <Button
                    className="ms-auto my-2"
                    variant="outlined"
                    color={"primary"}
                    disabled={user.username ? false : true}
                    size="large"
                    onClick={handleX} 
                  >
                    X
                  </Button>
                </Grid>
              </Grid>
            </Fade>






          </Grid>
          <RecordDetailsSideBar record={record} disabled={user.username ? false : true} />
        </Grid>
        <Modal
          // open={modalOpen}
          open={false}
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
