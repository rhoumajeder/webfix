import React, { useState, useContext } from "react";

import {
  Grid,
  Card,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import * as yup from "yup";

import { KeyboardDatePicker } from "@material-ui/pickers";
import {MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";
import "./index.css";


import SelectBoxExtended from "../../components/SelectBoxExtended/SelectBoxExtended";

import moment from "moment";

import CreateItemTable from "../CreateItemTable/CreateItemTable";

import uuid from "react-uuid";

import axiosInstance from "../../helpers/axios";
import { fileAxios } from "../../helpers/axios";

import { useToasts } from "react-toast-notifications";

import { useHistory } from "react-router";

import cities from "../../helpers/cities";
import Spinner from "../../components/Spinner/Spinner";

import { IoArrowBack } from "react-icons/io5";

import { AuthContext } from "../../context/auth";
import objectSum from "../../helpers/objectSum";

const CreateAskRecord = (props) => {

  let history = useHistory();
  const { addToast } = useToasts();
  const [user, setUser] = useContext(AuthContext)

  const [showSubRecord, SetshowSubRecord] = useState(false)

  // Ask record state holder
  const [askRecord, setAskRecord] = useState({
    city_arrival: "",
    city_destination: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    description: "",
    weight_items:3,
    price_proposed:10,
    type: "Ask",
    phone_number: "", 
    ask_item_info: []
  });  

  // Ask record items state holder
  const [rows, setRows] = useState([
    {
      id: `row-${uuid()}`,
      name: "colis",
      quantity: 1,
      weight: 1,
      price: 1,
      files: [],
      type: "added",
    },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // Validation schema for ask record
  let askRecordSchema = yup.object().shape({
    date: yup
      .date()
      .default(function () {
        return moment(new Date()).format("YYYY-MM-DD");
      })
      .min(today, "Date doit etre dans le passé"),
    city_destination: yup.string().required("Veuillez Choisir votre destiantion"),
    city_arrival: yup
      .string()
      .required("Veuillez Choisir une ville de départ")
      .notOneOf(
        [yup.ref("city_destination")],
        "Veuillez vérifier Départ/Destination"
      ),
      weight_items: yup
      .number()
      .typeError('Veuillez entrer poids de l article (Nombre)')
      .required("Veuillez entre prix de kg")
      .positive("Max Poids doit etre strictement positive")
     
      ,

      price_proposed: yup
      
      .number("Veuillez entrer le prix proposé")
      .typeError('Veuillez entrer le prix proposé (Nombre)')
      .required("Veuillez entrer prix de kg")
      .positive("Max Poids doit etre strictement positive")
   
      .min(1, "Prix par  kg ne peut pas etre inférieur à 1")
      ,

    description: yup
      .string()
      .required("Veullez détailler ce que vous voulez envoyer")
      .max(1000, "Description doit etre inférieur à 1000 "),
    phone_number: yup
      .string()
      // .required("Phone number for records is required")
      // .matches(phoneRegExp, "Phone number est incorrect!"),
  });

  // Validation schema for record item
  let itemSchema = yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required(" Champs objet ne doit pas etre vide")
        .max(40, "Objet doit etre inférieur à 40 characters"),
      price: yup
        .number("Prix doit être un nombre entier")
        .required("Veuillez ajouter le prix")
        .positive("Prix doit être un nombre positive")
        .integer("Prix doit être un nombre entier")
        .max(999, "Prix can not be more than $999"),
      quantity: yup
        .number("la quantité doit être un nombre entier")
        .required("Please add a quantity for selected sub-category")
        .positive("Quantité doit etre positive")
        .integer("la quantité doit être un nombre entier")
        .max(99, "Quantity can not be more than 99"),
      weight: yup
        .number("Poids doit être un nombre entier")
        .required("Ajouter le poids")
        .positive("Poids Doit etre positive")
        .integer("Poids doit être un nombre entier")
        .max(99, " Poids doit etre inférieur à 99kg"),
    })
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCheckboxChange = (e) => {
    if (e.target.name === "AddItems") {
      SetshowSubRecord(!showSubRecord)
    }

  };

  const handleDateChange = (date) => {
    setAskRecord({ ...askRecord, ["date"]: moment(date).format("YYYY-MM-DD") });
  };

  const handleSelectChange = (item, target) => {
    setAskRecord({ ...askRecord, [target.name]: item.value });
     
  };

  const handleInputChange = (e) => {
    setAskRecord({ ...askRecord, [e.target.name]: e.target.value });
  };
  const [isloading, setisLoading] = useState(false);
  const submitItems = async () => {
    handleClose();
    // setAskRecord({ ...askRecord, ["ask_item_info"]: ["a","c"] });

    // let x = await props.recaptchaRef.current.executeAsync()
    // alert(x)
    // axiosInstance
    //   .post("auth/verify_recaptcha", { recaptcha_token: x })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 400) {
    //       addToast(err?.response?.data?.detail || "ReCaptcha Failed", {
    //         appearance: "error",
    //       });
    //       return

    //     } else if (res.status === 200) {
    //       return submitItemAfter();

    //     }

    //   })
    //   .catch((err) => {
    //     addToast(err?.response?.data?.detail || "ReCaptcha Failed", {
    //       appearance: "error",
    //     });
    //     return


    //   }) 
    const itemData1 = [...rows];
    itemSchema
    .validate(rows)
    .then((valid) => {
      if (valid) {
      return submitItemAfter(); 
    }
  }).catch((err) => {
    addToast(err.message, { appearance: "error" });
  });
    
  }
  const CreatingRecord = "  Creating Record ... ";
  if (isloading) {
    return <Spinner name={CreatingRecord} />;
  }


  // Submit record to database
  const submitItemAfter = () => {

    const itemData1 = [...rows];
    
    
    askRecord["ask_item_info"] = itemData1;
    askRecord["ask_total_price"] = objectSum(itemData1, "price");
    askRecord["ask_total_weight"] = objectSum(itemData1, "weight");
    

    askRecordSchema
      .validate(askRecord)
      .then((valid) => {
        if (valid) {
          setisLoading(true);

          itemSchema
            .validate(rows)
            .then((valid) => {
              if (valid) {
                const itemData = [...rows];
                const itemFiles = [];

                itemData.forEach((item) => {
                  delete item.id;
                  itemFiles.push(item.files);
                  delete item.files;
                });
                let bimages = false;  // to detect the presence of image , so we should wait for the uploading 
                itemFiles.forEach((fileArr, index) => {
                  fileArr.forEach((file) => {
                    if (fileArr[fileArr.length - 1] === file) {
                      
                      if (fileArr.length > 0) {
                        bimages = true;
                      }
                    }
                  });
                });

                axiosInstance
                  .post(`create-record/`, askRecord)
                  .then((res) => {
                    let ps = []
                    if (res.data.id) {
                      const recordId = res.data.id;
                      if(!showSubRecord){
                        addToast("Record created", { appearance: "success" });
                        history.push(`/ask-record-details/${recordId}`);
                        history.go();  
                        setisLoading(false);
                      }

                      if(showSubRecord){
                      axiosInstance
                        .post(`create-ask-record-items/${recordId}/`, itemData)
                        .then((res) => {
                          if (bimages == false) {
                            addToast("Record created", { appearance: "success" });
                            history.push(`/ask-record-details/${recordId}`); 
                            history.go();
                            setisLoading(false);

                          }
                          itemFiles.forEach((fileArr, index) => {
                            fileArr.forEach((file) => {
                              if (fileArr[fileArr.length - 1] === file) {
                                 
                                setisLoading(true);
                                let data = new FormData();
                                data.append("image", file);

                                fileAxios
                                  .post(
                                    `create-ask-record-item-images/${res.data[index].id}/`,
                                    data
                                  )
                                  .then((res) => {
                                     

                                    Promise.all(ps).then(
                                      () => {

                                        addToast("Record created", { appearance: "success" });
                                        history.push(`/ask-record-details/${recordId}`);
                                        history.go();
                                        setisLoading(false);

                                      }
                                    )

                                  })
                                  .catch((err) => {
                                    
                                    setisLoading(false);
                                  });

                              }
                              else {
                                let data = new FormData();
                                data.append("image", file);

                                let p = fileAxios
                                  .post(
                                    `create-ask-record-item-images/${res.data[index].id}/`,
                                    data
                                  )
                                  .then((res) => {
                                     
                                  })
                                  .catch((err) => {
                                     
                                    setisLoading(false);
                                  });
                                ps.push(p)

                              }

                            });
                          });

                        })
                        .catch((err) => {
                          addToast("There was an error", { appearance: "error" });
                          setisLoading(false);
                           
                        });
                     }
                    }


                  })
                  .catch((err) => {
                     
                    addToast(err.response.data, { appearance: "error" });
                    setisLoading(false);
                  });
              }
            })
            .catch((err) => {
              addToast(err.message, { appearance: "error" });
              
            });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
         
      });
  };






  return (



    <Grid container direction="row" alignItems="center" justify="center">


      <Grid item xl={8} md={10} xs={12} className="my-5">
        <Card className={"shadow"}>
          <CardContent>
            <Button
              onClick={props.goBack}
              color="default"
              startIcon={<IoArrowBack />}
            >
              Retour
            </Button>
            <Box component="div">
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item md={4} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Date de voyage:
                  </Typography>
                  <MuiPickersUtilsProvider locale="fr" utils={MomentUtils}>
                  <KeyboardDatePicker
                    value={askRecord.date}
                    disableToolbar
                    disablePast
                    autoOk
                    variant={screen.width <= 480 ? "dialog" : "inline"}
                    format="DD MMM, yyyy"
                    margin="normal"
                    fullWidth
                    id="date-picker-inline"
                    placeholder="Aujourd'hui"
                    className={"m-0 p-0"}
                    color={"primary"}
                    InputLabelProps={{ shrink: false }}
                    size="small"
                    inputVariant="outlined"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  /></MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-1"}
                  >
                    Départ:
                  </Typography>
                  <SelectBoxExtended
                    options={cities}
                    placeholder={"Départ"}
                    name={"city_arrival"}
                    onChange={handleSelectChange}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-1"}
                  >
                    Destination:
                  </Typography>
                  <SelectBoxExtended
                    options={cities}
                    name={"city_destination"}
                    placeholder={"Destination"}
                    onChange={handleSelectChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box component={"div"} className={"my-2"}>
              <Grid container direction="row" alignItems="center" spacing={1}>

              <Grid item md={4} sm={4} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Poids de l’article en Kg
                  </Typography>
                  <TextField
                    id={`luggage-weight`}
                    size={"small"}
                    variant="outlined"
                    type={"number"}
                    inputProps={{ min: 0.5, step: 0.5 }}
                    fullWidth={true}
                    name={"weight_items"}
                    value={askRecord.weight_items}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"1"}
                  />
                </Grid>

               <Grid item md={4} sm={4} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Prix Proposé en €
                  </Typography>
                  <TextField
                    id={`price_proposed`}
                    size={"small"}
                    variant="outlined"
                    type={"number"}
                    inputProps={{ min: 1, step: 0.5 }}
                    fullWidth={true}
                    name={"price_proposed"}
                    value={askRecord.price_proposed}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }} 
                    placeholder={"10"}

                  />
                </Grid>
              
              </Grid>
            </Box>
            <Box component={"div"} className={"my-2"}>
              <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item xs={4} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Numéro de téléphone
                  </Typography>
                  <TextField
                    id="phone_number"
                    InputLabelProps={{ shrink: false }}

                    placeholder={"Enter Phone Number"}
                    // value={askRecord.phone_number}
                    type="text"
                    size={"small"}
                    variant="outlined"
                    name={"phone_number"}
                    onChange={handleInputChange}

                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Description:
                  </Typography>
                  <TextField
                    id={`luggage-description`}
                    size={"small"}
                    variant="outlined"
                    inputProps={{ min: 1 }}
                    fullWidth={true}
                    multiline
                    rows={6}
                    onChange={handleInputChange}
                    name={"description"}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Description"}
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={showSubRecord}
                        name="AddItems"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Add Items"
                  />
                </Grid>
              </Grid>
              { !showSubRecord &&
              //    <Button
              //    onClick={submitItems}
              //    color="primary"
              //    variant={"contained"}
              //  >
              //    Valider
              //  </Button>

            //   <Button 
            //   variant="outlined" 
            //   onClick={handleClickOpen}
            //   className="ms-auto my-2"
            //   color={"primary"}
            //   size="large">
            //     Valider
            // </Button>
            <Button 
            variant="outlined" 
            onClick={handleClickOpen}
            className="ms-auto my-2"
            color={"primary"}
            size="large">
              Valider
          </Button>
              }
             

            </Box>
            
            { showSubRecord && 
                          <Box className={"my-2"}>
                          <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item xs={12} className="my-2">
                              <CreateItemTable
                                setRows={setRows}
                                rows={rows}
                                isloading={isloading}
                                submitItems={handleClickOpen}
                                priceRequired={true}
                              />
                            </Grid>
                          </Grid>
                        </Box>

            }


          </CardContent>
        </Card>
        <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Etes-vous sûr de vouloir valider votre annonce? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          En cliquant sur le bouton Valider, vous indiquez avoir pris connaissance et accepté les Conditions Générales d'Utilisation.
          <a href="/cgu"  target="_blank" rel="noreferrer noopener">CGU</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          
          <Button onClick={handleClose && submitItems} 
            variant="contained" 
           color={"secondary"} autoFocus> 
            Confirmer
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
      </Grid>
    </Grid>
  );
};

export default CreateAskRecord;
