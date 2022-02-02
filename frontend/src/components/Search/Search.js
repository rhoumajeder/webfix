import React, { useEffect, useState, useContext } from "react";
import { ScreenContext } from "../../helpers/context";
import './Search.css';

import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  Grid,
  Card,
  CardContent,
  Container,
  FormControl,
  Checkbox,
  Button,
  CardActions,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  InputAdornment,
  FormHelperText,
  makeStyles,
  Box,
  Slider,
} from "@material-ui/core";
import { FormControlLabel as FormLabelL, Checkbox as CheckBoxL } from '@mui/material';
import { FaCarSide, FaPlane } from "react-icons/fa";

import SelectBoxExtended from "../../components/SelectBoxExtended/SelectBoxExtended";
import { FaSearch } from "react-icons/fa";
import { ExpandMore } from "@material-ui/icons";

import moment from "moment";

import cities from "../../helpers/cities";
import useVolumeSlider from "../../hooks/useVolumeSlider";

import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel as MuiFormControlLabel,
  Radio as MuiRadio
} from '@mui/material';


const useStyles = makeStyles(theme => ({
  positionFix: {
    marginTop: '5px !important',
  }
}))

const Search = (props) => {
  const { maxVolume, sliderMarks, handleVolumeChange: setVolume } = useVolumeSlider(0);
  const handleVolumeChange = (e, value) => {
    props.setFilters({
      ...props.filters,
      max_volume: sliderMarks.findIndex(marks => marks.value === value) + 1
    })
    setVolume(e, value)
  }
  const classes = useStyles()
  const { propose, ask } = props.recordType;
  let defaultdatevalue = moment(new Date()).add(3, 'M').format("YYYY-MM-DD") // var futureMonth = moment(currentDate).add(1, 'M');
  //alert(defaultdatevalue);
  // const [currentDate, setCurrentDate] = useState(
  //   moment(new Date()).format("YYYY-MM-DD")
  // ); 
  const [currentDate, setCurrentDate] = useState(
    defaultdatevalue
  );

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const screen = React.useContext(ScreenContext);

  const handleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters)
  }

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

  const handleDateChange = (date) => {
    const newFilters = {
      ...props.filters,
      date: moment(date).format("YYYY-MM-DD"),
    };
    props.setFilters(newFilters);
    setCurrentDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleCheckboxChange = (e) => {
    let newRecordType = {};

    if (e.target.name === "ask") {
      if (!propose) {
        return;
      }
      newRecordType = {
        propose: propose,
        ask: !ask,
      };
    } else {
      if (!ask) {
        return;
      }
      newRecordType = {
        propose: !propose,
        ask: ask,
      };
    }
    props.setRecordType(newRecordType);
    // props.fetchRecords(newRecordType); 
    props.fetchRecords_for_button_search(newRecordType);
    props.setLoading(true);
  };

  const handleSelectChange = (values, target) => {
    let newFilters = {
      ...props.filters,
    };

    if (values.value === "") {
      delete newFilters[target.name];
    } else {
      newFilters[target.name] = values.value;
    }
    console.log(newFilters);
    props.setFilters(newFilters);
  };

  const handleInputChange = (e) => {
    let newFilters = {
      ...props.filters,
    };

    if (e.target.value === "" || e.target.value === "0") {
      delete newFilters[e.target.name];
    } else {
      if (e.target.type === "number") {
        newFilters[e.target.name] = parseInt(e.target.value);
      } else {
        newFilters[e.target.name] = e.target.value;
      }
    }
    console.log(newFilters);
    props.setFilters(newFilters);
  };

  const submitFilters = () => {
    props.setLoading(true);
    //props.fetchRecords(props.recordType);
    props.fetchRecords_for_button_search(props.recordType);
  };

  return (
    <Container className="pt-5">
      <Card className="px-2 py-5 shadow">
        <CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                className="d-flex align-items-center justify-content-center"
              >
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    variant="inline"
                    value="Offers"
                    control={
                      <Checkbox
                        onChange={handleCheckboxChange}
                        name="propose"
                        checked={propose}
                      />
                    }
                    label="Offers"
                  />
                  <FormControlLabel
                    variant="inline"
                    value="Demandes"
                    control={
                      <Checkbox
                        onChange={handleCheckboxChange}
                        name="ask"
                        checked={ask}
                      />
                    }
                    label="Demandes"
                  />
                </div>
              </FormControl>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SelectBoxExtended
                labelId={"ville-de-depart"}
                options={cities}
                label={"Ville De Départ"}
                name={"city_arrival"}
                placeholder={"Ville De Départ"}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SelectBoxExtended
                labelId={"ville-de-destination"}
                label={"Ville De Destination"}
                options={cities}
                name={"city_destination"}
                placeholder={"Ville De Destination"}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item md={4} xs={12}>
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
                InputLabelProps={{ shrink: false }}
                className={"m-0 p-0"}
                color={"primary"}
                size="small"
                defaultValue={defaultdatevalue}
                value={currentDate}
                inputVariant="outlined"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} className="my-2">
              <Accordion expanded={showAdvancedFilters} onChange={handleAdvancedFilters}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Advanced filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1} alignItems="flex-start" direction="row">
                    <Grid item sm={6} xs={12} className={classes.positionFix}>
                      <TextField
                        variant="outlined"
                        type={"number"}
                        id="outlined-start-adornment"
                        onChange={handleInputChange}
                        name="max_weight"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">kg</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                          },
                        }}
                        value={
                          props.filters.max_weight ? props.filters.max_weight : 0
                        }
                        fullWidth
                      />
                      <FormHelperText>Weight</FormHelperText>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <div className="container">
                        <div className="container">
                          <div className="container">
                            <div className="container">
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
                                    <MuiFormControlLabel value="male" control={<MuiRadio />} label={<FaCarSide size="35px" />} />
                                  </div>
                                </div>
                              </MuiRadioGroup>

                              {/* <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <label className='labelss mt-2'>Plane</label>
                                </div>
                                <div className="col d-flex justify-content-start">
                                  <FormLabelL
                                    control={<CheckBoxL onChange={handleSelectChange} className='mx-2' />}
                                    name={"moyen_de_transport"}
                                    defaultValue={transportOptions[0]}
                                    label={<FaPlane size="35px" />}
                                  />
                                </div>
                                <div className="col d-flex justify-content-end">
                                  <label className='labelss mt-2'>
                                    Car
                                  </label>
                                </div>
                                <div className="col d-flex justify-content-start">
                                  <FormLabelL
                                    control={<CheckBoxL onChange={handleSelectChange} className='mx-2' />}
                                    name={"moyen_de_transport"}
                                    defaultValue={transportOptions[0]}
                                    label={<FaCarSide size="35px" />}
                                  />
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <SelectBoxExtended
                        style={{ zIndex: 100 }}
                        labelId={"moyen-de-transport"}
                        label={"Moyen de transport"}
                        options={transportOptions}
                        name={"moyen_de_transport"}
                        placeholder={"Moyen de transport"}
                        onChange={handleSelectChange}
                        className="my-2"
                        value={
                          props.filters.moyen_de_transport
                            ? transportOptions.filter(
                              (option) =>
                                props.filters.moyen_de_transport === option.value
                            )
                            : ""
                        }
                      /> */}
                    </Grid>
                    <Grid item xs={12} className="mb-5">
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
                          marks={sliderMarks}
                          defaultValue={0}
                          name={"max_volume"}
                          value={maxVolume}
                          onChange={handleVolumeChange}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ display: "block" }}>

          <div className="w-100 text-center">
            <Button
              variant="outlined"
              color={"primary"}
              startIcon={<FaSearch />}
              onClick={submitFilters}
              id={"search_id"}
            >
              Rechercher
            </Button>
          </div>
          <div className="w-100 text-center mt-2">
            <Button color="primary" onClick={handleAdvancedFilters}>
              Show Advanced Filters
            </Button>
          </div>
        </CardActions>
      </Card>
    </Container >
  );
};

export default Search;
