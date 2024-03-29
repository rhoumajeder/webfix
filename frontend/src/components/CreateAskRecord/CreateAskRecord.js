import React, { useState, useContext } from "react";

import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

import * as yup from "yup";

import { KeyboardDatePicker } from "@material-ui/pickers";
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

import { IoArrowBack } from "react-icons/io5";

import { AuthContext } from "../../context/auth";

const CreateAskRecord = (props) => {
  let history = useHistory();
  const { addToast } = useToasts();
  const [user, setUser] = useContext(AuthContext)

  // Ask record state holder
  const [askRecord, setAskRecord] = useState({
    city_arrival: "",
    city_destination: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    description: "",
    type: "Ask",
    phone_number: user.phone_number ? user.phone_number : null
  });

  // Ask record items state holder
  const [rows, setRows] = useState([
    {
      id: `row-${uuid()}`,
      name: "",
      quantity: 0,
      weight: 0,
      price: 0,
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
      .min(today, "Date can not be in the past"),
    city_destination: yup.string().required("Please select destination city"),
    city_arrival: yup
      .string()
      .required("Please select arrival (departure) city")
      .notOneOf(
        [yup.ref("city_destination")],
        "The departure city and destination can not be the same"
      ),
    description: yup
      .string()
      .required("Please enter a short description")
      .max(400, "Description can not be more than 400 characters"),
    phone_number: yup
      .string()
      .required("Phone number for records is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  // Validation schema for record item
  let itemSchema = yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .required("Item name is required")
        .max(40, "Name can not be more than 40 characters"),
      price: yup
        .number()
        .required("Please add a price for selected sub-category")
        .positive("Price for items must be positive")
        .max(999, "Price can not be more than $999"),
      quantity: yup
        .number()
        .required("Please add a quantity for selected sub-category")
        .positive("Quantity for items must be positive")
        .max(99, "Quantity can not be more than 99"),
      weight: yup
        .number()
        .required("Please add a weight for selected sub-category")
        .positive("Weight for items must be positive")
        .integer()
        .max(99, "Weight can not be more than 99"),
    })
  );

  const handleDateChange = (date) => {
    setAskRecord({ ...askRecord, ["date"]: moment(date).format("YYYY-MM-DD") });
  };

  const handleSelectChange = (item, target) => {
    setAskRecord({ ...askRecord, [target.name]: item.value });
    console.log(askRecord);
  };

  const handleInputChange = (e) => {
    setAskRecord({ ...askRecord, [e.target.name]: e.target.value });
  };

  // Submit record to database
  const submitItems = () => {


    askRecordSchema
      .validate(askRecord)
      .then((valid) => {
        if (valid) {
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

                axiosInstance
                  .post(`create-record/`, askRecord)
                  .then((res) => {
                    if (res.data.id) {
                      const recordId = res.data.id;
                      axiosInstance
                        .post(`create-ask-record-items/${recordId}/`, itemData)
                        .then((res) => {
                          itemFiles.forEach((fileArr, index) => {
                            fileArr.forEach((file) => {
                              let data = new FormData();
                              data.append("image", file);

                              fileAxios
                                .post(
                                  `create-ask-record-item-images/${res.data[index].id}/`,
                                  data
                                )
                                .then((res) => {
                                  console.log(res.data);
                                })
                                .catch((err) => {
                                  console.log(err.response);
                                });
                            });
                          });
                          addToast("Record created", { appearance: "success" });
                          history.push(`/ask-record-details/${recordId}`);
                          history.go();
                        })
                        .catch((err) => {
                          addToast("There was an error", { appearance: "error" });
                          console.log(err);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err.response);
                    addToast(err.response.data, { appearance: "error" });
                  });
              }
            })
            .catch((err) => {
              addToast(err.message, { appearance: "error" });
              console.log(err);
            });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
        console.log(err);
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
              Back
            </Button>
            <Box component="div">
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item md={4} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Date Of Voyage:
                  </Typography>
                  <KeyboardDatePicker
                    value={askRecord.date}
                    disableToolbar
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
                  />
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
                    placeholder={"Ville De Departure"}
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
                    placeholder={"Ville De Destination"}
                    onChange={handleSelectChange}
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
                    Phone Number
                  </Typography>
                  <TextField
                    id="phone_number"
                    InputLabelProps={{ shrink: false }}

                    placeholder={"Enter Phone Number"}
                    value={askRecord.phone_number}
                    type="text"
                    size={"small"}
                    variant="outlined"
                    name={"phone_number"}
                    onChange={handleInputChange}

                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box component={"div"} className={"my-2"}>
              <Grid container direction="row" alignItems="center" spacing={1}>
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
              </Grid>
            </Box>
            <Box className={"my-2"}>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item xs={12} className="my-2">
                  <CreateItemTable
                    setRows={setRows}
                    rows={rows}
                    submitItems={submitItems}
                    priceRequired={true}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateAskRecord;
