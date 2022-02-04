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
import { FaCarSide, FaCommentsDollar, FaPlane } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import moment from "moment";

import { AuthContext } from "../../context/auth";

import "./index.css";

import { useHistory } from "react-router";

import cities from "../../helpers/cities";
import useVolumeSlider from '../../hooks/useVolumeSlider';

import { IoArrowBack } from "react-icons/io5";

import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel as MuiFormControlLabel,
  Radio as MuiRadio
} from '@mui/material';
import HelpButton from "../../components/HelpButton/HelpButton";


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
      .of(yup.string()),
    // .min(1, "Please select at least 1 category"),
    phone_number: yup
      .string()
      .required("Phone number for records is required")
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  let subRecordSchema = yup
    .array()
    .of(
      yup.object().shape({
        //   category: yup.string().required("Please select at least 1 category"),
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
  //.min(1, "Please select at least 1 sub-category for selected category(s)");

  let Records = {
    date: moment(new Date()).format("YYYY-MM-DD"),
    moyen_de_transport: "Avion",
    city_arrival: "Bretagne, France",
    city_destination: "Berlin, Allemagne",
    max_weight: 1,
    max_volume: 3,
    min_price: 0,
    description: "null value",
    categories: [],
    categoriesv: ["Food", "Vetements", "Small Accessories", "Autres"],
    type: "Propose",
    phone_number: user.phone_number ? user.phone_number : "8328382332"
  };

  const [record, setRecord] = React.useState(Records);

  const { sliderMarks: marks } = useVolumeSlider(0);

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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Food"
        },
        {
          id: 2,
          accepted: false,
          name: "Food Liquid",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Small Electronics"
        },
        {
          id: 5,
          accepted: false,
          name: "HeartBeat",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Small Accessories"
        },
        {
          id: 7,
          accepted: false,
          name: "Braclet",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Vetements"
        },
        {
          id: 9,
          accepted: false,
          name: "Robe",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Vetements"
        },
        {
          id: 10,
          accepted: false,
          name: "Chaussure",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Big Mechanical"
        },
        {
          id: 12,
          accepted: false,
          name: "Trotinette",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Big Electronics"
        },
        {
          id: 14,
          accepted: false,
          name: "Machine à Laver",
          max_quantity: 1,
          max_weight: 1,
          price: 1,
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
          max_quantity: 1,
          max_weight: 1,
          price: 1,
          category: "Autres"
        },
      ],
    },
  };


  const getMinPrice = (record) => {

    let minPrice = 0;
    let prices = [];
    console.log(record)

    try {

      record.forEach(elem => {
        if (Object.prototype.hasOwnProperty.call(elem, 'items')) {
          elem.items.forEach(
            el => {
              prices.push(el.price)
            }
          )

        } else {
          record.forEach(elem => {
            prices.push(elem.price)
          })
        }


      })
      return Math.min(...prices);



    } catch (err) {

      console.log(err);

    }
  }

  const [subRecords, setSubRecords] = React.useState([]);
  const [categories, setCategories] = React.useState(CategoryList)





  // # create another categories which will be send to database , check every time if the default value have touched 

  const handleAvailableCategories = (event) => {
    if (event.target.checked) {
      setRecord({ ...record, categories: [...record.categories, event.target.name], categoriesv: [...record.categoriesv, event.target.name] })


      // setRecord({ ...record, categoriesv: [...record.categoriesv, event.target.name] })




      setCategories({
        ...categories, [event.target.name]: {
          ...categories[event.target.name],
          state: true
        }
      })

      setSubRecords([...subRecords, ...categories[event.target.name].items])
      console.log("rje sub record ===");
      console.log(subRecords)

    } else {
      console.log(subRecords)
      const newCategories = [...record.categories];
      const index = newCategories.indexOf(event.target.name)
      if (index > -1) {
        newCategories.splice(index, 1)
      }


      const newCategoriesv = [...record.categoriesv];
      const indexv = newCategoriesv.indexOf(event.target.name)
      if (indexv > -1) {
        newCategoriesv.splice(indexv, 1)
      }


      setRecord({ ...record, categories: newCategories, categoriesv: newCategoriesv })


      // setRecord({ ...record, categoriesv: newCategoriesv })  

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
  const handleRecordSubmission = async () => {
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
    //       return handleRecordSubmissionAfter();

    //     }

    //   })
    //   .catch((err) => {
    //     addToast(err?.response?.data?.detail || "ReCaptcha Failed", {
    //       appearance: "error",
    //     });
    //     return


    //   })

    return handleRecordSubmissionAfter();
  }

  const handleRecordSubmissionAfter = () => {
    let validationSubRecords = [...subRecords];
    // alert(validationSubRecords.length); 


    // validationSubRecords.forEach((subRecord, index, object) => {
    //   if (subRecord.accepted == false) {
    //     object.splice(index, 1);
    //     alert(validationSubRecords.length); 
    //   }
    // })

    // validationSubRecords.forEach((subRecord, index, object) => {
    //   if (subRecord.accepted == false) {
    //     object.splice(index, 1);
    //     alert(validationSubRecords.length); 
    //   }
    // })

    let newlist = [];
    for (let i = 0; i < validationSubRecords.length; i++) {

      let dict1 = validationSubRecords[i]
      if (dict1.accepted == true) {
        newlist.push(dict1)

      }

    }

    validationSubRecords = newlist;

    record["min_price"] = getMinPrice(validationSubRecords) < 9999 ? getMinPrice(validationSubRecords) : 0;
    console.log("validationSubRecords")
    console.log(validationSubRecords);
    // alert(validationSubRecords.length);   





    recordSchema
      .validate(record)
      .then(async function (valid) {
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
                    disablePast
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
                  {/* <SelectBoxExtended
                    options={transportOptions}
                    name={"moyen_de_transport"}
                    // placeholder={"Moyen de Transport"}
                    defaultValue={transportOptions[0]}
                    onChange={handleSelectChange}
                  /> */}
                  <MuiRadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <div className="container row">
                      <div className="col d-flex justify-content-end">
                        <MuiFormControlLabel value="Plane" control={<MuiRadio />} label={<FaPlane size="35px" />} />
                      </div>
                      <div className="col d-flex justify-content-start">
                        <MuiFormControlLabel value="Car" control={<MuiRadio />} label={<FaCarSide size="35px" />} />
                      </div>
                    </div>
                  </MuiRadioGroup>
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
                  <div className='row'>
                    <div className="col-2 d-flex justify-content-end font-3 mt-3">
                      Max Volume:
                    </div>
                    <div className="col-1 d-flex justify-content-start">
                      <HelpButton />
                    </div>
                  </div>
                  {/* <Typography
                    variant={"subtitle2"}
                    color={"textPrimary"}
                    className={"fw-bold my-2"}
                  >
                    Max Volume:
                  </Typography> */}
                  <Box
                    component={"div"}
                    className={"px-3 pb-5 position-relative"}
                  >
                    <Slider
                      step={null}
                      valueLabelDisplay="off"
                      marks={marks}
                      defaultValue={marks[3].value}
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
                        checked={categories.Food.state || record.categoriesv.indexOf("Food") > -1}
                        // checked={record.categoriesv.indexOf("Food") > -1}
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
                        checked={categories["Small Accessories"].state || record.categoriesv.indexOf("Small Accessories") > -1}
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
                        checked={categories.Vetements.state || record.categoriesv.indexOf("Vetements") > -1}
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
                        checked={categories.Autres.state || record.categoriesv.indexOf("Autres") > -1}
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
