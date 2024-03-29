import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";

import * as yup from "yup";
import axiosInstance from "../../helpers/axios";

import Header from "../../components/Header/Header";
import SelectBoxExtended from "../../components/SelectBoxExtended/SelectBoxExtended";
import LuggageTable from "../../components/LuggageTable/LuggageTable";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { ScreenContext } from "../../helpers/context";
import { FaCarSide, FaPlane } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import moment from "moment";

import { AuthContext } from "../../context/auth";

import "./index.css";

import { useHistory } from "react-router";

import cities from "../../helpers/cities";

import { IoArrowBack } from "react-icons/io5";

const Index = (props) => {
  let history = useHistory();
  const { addToast } = useToasts();
  const screen = React.useContext(ScreenContext);
  const [user, setUser] = useContext(AuthContext);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let recordSchema = yup.object().shape({
    date: yup
      .date()
      .default(function () {
        return moment(new Date()).format("YYYY-MM-DD");
      })
      .min(today, "Date can not be in the past"),
    moyen_de_transport: yup
      .string()
      .required("Please select mode of transportation"),
    city_destination: yup.string().required("Please select destination city"),
    city_arrival: yup
      .string()
      .required("Please select arrival (departure) city")
      .notOneOf(
        [yup.ref("city_destination")],
        "The departure city and destination can not be the same"
      ),
    max_weight: yup
      .number()
      .required("Please enter maximum weight allowed")
      .positive("Maximum weight has to be positive")
      .min(1, "Max weight can not be less than 1")
      .when("moyen_de_transport", {
        is: "Avion",
        then: yup.number().max(15, "Max weight for plane is 15kg"),
      })
      .when("moyen_de_transport", {
        is: "Car",
        then: yup.number().max(50, "Max weight for car is 50kg"),
      }),
    max_volume: yup
      .number()
      .required("Please choose maximum volume")
      .positive("Maximum volume has to be positive")
      .integer()
      .when("moyen_de_transport", {
        is: "Avion",
        then: yup.number().max(3, "Max volume for planes is 3"),
      }),
    description: yup
      .string()
      .required("Please enter a short description about the trip")
      .max(400, "Description can not have more than 400 characters"),
    categories: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least 1 category"),
    phone_number: yup
      .string()
      .required("Phone number for records is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  let subRecordSchema = yup
    .array()
    .of(
      yup.object().shape({
        category: yup.string().required("Please select at least 1 category"),
        name: yup.string().required("Sub-category name is required!"),
        price: yup
          .number()
          .required("Please add a price for selected sub-category")
          .positive("Price for items must be positive")
          .max(999, "Price can not be more than $999"),
        max_quantity: yup
          .number()
          .required("Please add a quantity for selected sub-category")
          .positive("Quantity for items must be positive")
          .max(99, "Quantity can not be more than 99"),
        max_weight: yup
          .number()
          .required("Please add a weight for selected sub-category")
          .positive("Weight for items must be positive")
          .integer()
          .max(99, "Weight can not be more than 99"),
      })
    )
    .min(1, "Please select at least 1 sub-category for selected category(s)");

  let Records = {
    date: moment(new Date()).format("YYYY-MM-DD"),
    moyen_de_transport: "",
    city_destination: "",
    city_arrival: "",
    max_weight: 0,
    max_volume: 1,
    description: "",
    categories: [],
    type: "Propose",
    phone_number: user.phone_number ? user.phone_number : null
  };

  const [record, setRecord] = React.useState(Records);

  const marks = [
    {
      value: 0,
      label: (
        <img
          src={require("../../assets/slider/coke.png").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 25 : 50}
          height={screen.width <= 480 ? 25 : 50}
        />
      ),
    },
    {
      value: 25,
      label: (
        <img
          src={require("../../assets/slider/bottle.png").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 50 : 75}
          height={screen.width <= 480 ? 50 : 75}
        />
      ),
    },
    {
      value: 50,
      label: (
        <img
          src={require("../../assets/slider/gallon-small.png").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 75 : 100}
          height={screen.width <= 480 ? 75 : 100}
        />
      ),
    },
    {
      value: 75,
      label: (
        <img
          src={require("../../assets/slider/gallon-big.png").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 100 : 125}
          height={screen.width <= 480 ? 100 : 125}
        />
      ),
    },
    {
      value: 100,
      label: (
        <Typography
          variant={screen.width <= 480 ? "caption" : "body2"}
          color={"textSecondary"}
        >
          {" "}
          No Max{" "}
        </Typography>
      ),
    },
  ];

  let transportOptions = [
    {
      label: "Avion",
      value: "Avion",
      avatar: <FaPlane className={"fs-6 rotate-negative-90"} />,
    },
    { label: "Car", value: "Car", avatar: <FaCarSide className={"fs-6"} /> },
  ];

  const handleDateChange = (date) => {
    setRecord({ ...record, ["date"]: moment(date).format("YYYY-MM-DD") });
  };

  const handleSelectChange = (item, target) => {
    setRecord({ ...record, [target.name]: item.value });
    console.log(record);
  };

  const CategoryList = {
    Food: {
      state: false,
      name: "Food",
      items: [
        {
          id: 1,
          accepted: false,
          name: "Food Solide",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Food"
        },
        {
          id: 2,
          accepted: false,
          name: "Food Liquid",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Food"
        },
      ],
    },
    Medicaments: {
      state: false,
      name: "Medicaments",
      items: [
        {
          id: 3,
          accepted: false,
          name: "Medicaments",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Medicaments"
        },
      ],
    },
    "Small Electronics": {
      state: false,
      name: "Small Electronics",
      items: [
        {
          id: 4,
          accepted: false,
          name: "Portable",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Small Electronics"
        },
        {
          id: 5,
          accepted: false,
          name: "HeartBeat",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Small Electronics"
        },
      ],
    },
    "Small Accessories": {
      state: false,
      name: "Small Accessories",
      items: [
        {
          id: 6,
          accepted: false,
          name: "Montre",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Small Accessories"
        },
        {
          id: 7,
          accepted: false,
          name: "Braclet",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Small accessories"
        },
      ],
    },
    Vetements: {
      state: false,
      name: "Vetements",
      items: [
        {
          id: 8,
          accepted: false,
          name: "Pantalon",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Vetements"
        },
        {
          id: 9,
          accepted: false,
          name: "Robe",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Vetements"
        },
        {
          id: 10,
          accepted: false,
          name: "Chaussure",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Vetements"
        },
      ],
    },
    "Big Mechanical": {
      state: false,
      name: "Big Mechanical",
      items: [
        {
          id: 11,
          accepted: false,
          name: "Moteur",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Big Mechanical"
        },
        {
          id: 12,
          accepted: false,
          name: "Trotinette",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Big Mechanical"
        },
      ],
    },
    "Big Electronics": {
      state: false,
      name: "Big Electronics",
      items: [
        {
          id: 13,
          accepted: false,
          name: "Machine Cafe",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Big Electronics"
        },
        {
          id: 14,
          accepted: false,
          name: "Machine à Laver",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Big Electronics"
        },
      ],
    },
    Autres: {
      state: false,
      name: "Autres",
      items: [
        {
          id: 15,
          accepted: false,
          name: "Autres",
          max_quantity: 0,
          max_weight: 0,
          price: 0,
          category: "Autres"
        },
      ],
    },
  };

  const [subRecords, setSubRecords] = React.useState([]);
  const [categories, setCategories] = React.useState(CategoryList)

  const handleAvailableCategories = (event) => {
    if (event.target.checked) {
      setRecord({ ...record, categories: [...record.categories, event.target.name] })

      setCategories({
        ...categories, [event.target.name]: {
          ...categories[event.target.name],
          state: true
        }
      })

      setSubRecords([...subRecords, ...categories[event.target.name].items])

    } else {
      console.log(subRecords)
      const newCategories = [...record.categories];
      const index = newCategories.indexOf(event.target.name)
      newCategories.splice(index, 1)
      setRecord({ ...record, categories: newCategories })

      setCategories({
        ...categories, [event.target.name]: {
          ...categories[event.target.name],
          state: false
        }
      })

      const newSubRecords = [];


      subRecords.forEach((subRecord, index, object) => {
        if (subRecord.category !== event.target.name) {
          newSubRecords.push(subRecord)
        }
      })
      console.log(newSubRecords)
      setSubRecords(newSubRecords)
    }
  };

  const handleVolumeChange = (event, val) => {
    setRecord({
      ...record,
      ["max_volume"]: marks.findIndex((mark) => mark.value === val) + 1,
    });
  };

  const handleRecordChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setRecord({ ...record, [name]: value * 1 });
    } else {
      setRecord({ ...record, [name]: value });
    }
  };

  const handleRecordSubmission = () => {
    const validationSubRecords = [...subRecords];

    validationSubRecords.forEach((subRecord, index, object) => {
      if (!subRecord.accepted) {
        object.splice(index, 1)
      }
    })

    console.log("Submitted")
    console.log(validationSubRecords)

    recordSchema
      .validate(record)
      .then(function (valid) {
        if (valid) {
          subRecordSchema
            .validate(validationSubRecords)
            .then(function (valid) {
              if (valid) {
                axiosInstance
                  .post(`create-record/`, record)
                  .then((res) => {
                    console.log(res);
                    if (res.data.id) {
                      const recordId = res.data.id;
                      let subRec = validationSubRecords.map((v) => ({
                        ...v,
                        record: recordId,
                      }));
                      axiosInstance
                        .post(`/sub-records/bulk`, subRec)
                        .then((res) => {
                          setRecord(Records);
                          setSubRecords([]);
                          setCategories(CategoryList);
                          const message = `
                                                    Record added successfully!
                                                    Categories Saved: ${res.data.saved.length}
                                                    Categories Failed: ${res.data.error.length}`;
                          addToast(message, { appearance: "success" });
                          history.push(`/record-details/${recordId}`);
                          history.go();
                        })
                        .catch((err) => {
                          console.log(err.response);
                          addToast("There was an error", { appearance: "error" });

                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                    addToast(err.response.data, { appearance: "error" });

                  });
              }
            })
            .catch(function (err) {
              addToast(err.message, { appearance: "error" });
              console.log(err);
            });
        }
      })
      .catch(function (err) {
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
            <Box component={"div"} className={"my-2"}>
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
                    disableToolbar
                    autoOk
                    variant={screen.width <= 480 ? "dialog" : "inline"}
                    format="DD MMM, yyyy"
                    margin="normal"
                    fullWidth
                    id="date-picker-inline"
                    placeholder="Aujourd'hui"
                    value={record.date}
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
                <Grid item md={4} sm={6} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-1"}
                  >
                    Moyen de Transport:
                  </Typography>
                  <SelectBoxExtended
                    options={transportOptions}
                    name={"moyen_de_transport"}
                    placeholder={"Moyen de Transport"}
                    onChange={handleSelectChange}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Max Weight (kg):
                  </Typography>
                  <TextField
                    id={`luggage-weight`}
                    size={"small"}
                    variant="outlined"
                    type={"number"}
                    inputProps={{ min: 1 }}
                    fullWidth={true}
                    name={"max_weight"}
                    value={record.max_weight}
                    onChange={handleRecordChange}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Max. Weight"}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="my-2">
                  <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Phone Number:
                  </Typography>
                  <TextField
                    id="phone_number"
                    InputLabelProps={{ shrink: false }}
                    placeholder={"Enter Phone Number"}
                    value={record.phone_number}
                    type="text"
                    size={"small"}
                    variant="outlined"
                    name={"phone_number"}
                    onChange={handleRecordChange}

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
                    Max Volume:
                  </Typography>
                  <Box
                    component={"div"}
                    className={"px-3 pb-5 position-relative"}
                  >
                    <Slider
                      step={null}
                      valueLabelDisplay="off"
                      marks={marks}
                      defaultValue={0}
                      name={"max_volume"}
                      value={marks[record.max_volume - 1].value}
                      onChange={handleVolumeChange}
                    />
                  </Box>
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
                    onChange={handleRecordChange}
                    name={"description"}
                    value={record.description}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Description"}
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
                    className={"fw-bold"}
                  >
                    Accepted Categories:
                  </Typography>
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories.Food.state}
                        name="Food"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Food"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories.Medicaments.state}
                        name="Medicaments"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Medicaments"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories["Small Electronics"].state}
                        name="Small Electronics"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Small Electronic"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories["Small Accessories"].state}
                        name="Small Accessories"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Small Accessories"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories.Vetements.state}
                        name="Vetements"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Vetements"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={record.moyen_de_transport === "Avion"}
                        color="primary"
                        checked={categories["Big Mechanical"].state}
                        name="Big Mechanical"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Big Mechanical"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={record.moyen_de_transport === "Avion"}
                        color="primary"
                        checked={categories["Big Electronics"].state}
                        name="Big Electronics"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Big Electronics"
                  />
                </Grid>
                <Grid item xs={"auto"} className="my-1">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={categories.Autres.state}
                        name="Autres"
                        onChange={handleAvailableCategories}
                      />
                    }
                    label="Autres"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box component={"div"} className={"shadow my-2"}>
              {record.categories.length > 0 &&
                record.categories.map((data, index) => {
                  if (data !== "Autres") {
                    const rows = subRecords.filter(subRecord => subRecord.category === data);
                    console.log(rows)

                    return (
                      <Box component={"div"} key={index} className={"my-2"}>
                        <LuggageTable
                          rows={rows}
                          title={data}
                          hasTitle={true}
                          hasPagination={true}
                          hasCheckbox={true}
                          isCheckboxDisabled={false}
                          setSelected={setSubRecords}
                          selected={subRecords}
                          isQuantityEdited={true}
                          isWeightEdited={true}
                          isPriceEdited={true}
                          getCheckedValFromCol={true}
                        />
                      </Box>
                    );
                  }
                })}
            </Box>

            <Box
              component={"div"}
              className={"d-flex align-items-center justify-content-end my-2"}
            >
              <Button
                className="ms-auto my-2"
                variant="outlined"
                color={"primary"}
                onClick={handleRecordSubmission}
                size="large"
              >
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Index;
