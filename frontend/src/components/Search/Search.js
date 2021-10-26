import React, { useEffect, useState, useContext } from "react";
import { ScreenContext } from "../../helpers/context";

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
  Select,
  Menu,
} from "@material-ui/core";
import SelectBoxExtended from "../../components/SelectBoxExtended/SelectBoxExtended";
import { FaSearch } from "react-icons/fa";
import { ExpandMore } from "@material-ui/icons";

import moment from "moment";

import cities from "../../helpers/cities";

const Search = (props) => {
  const { propose, ask } = props.recordType;
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const screen = React.useContext(ScreenContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const filtersOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
    props.fetchRecords(newRecordType);
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
    props.fetchRecords(props.recordType);
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
            <Grid item md={4} sm={6} xs={12} className="my-2">
              <SelectBoxExtended
                labelId={"ville-de-depart"}
                options={cities}
                label={"Ville De Départ"}
                name={"city_arrival"}
                placeholder={"Ville De Départ"}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12} className="my-2">
              <SelectBoxExtended
                labelId={"ville-de-destination"}
                label={"Ville De Destination"}
                options={cities}
                name={"city_destination"}
                placeholder={"Ville De Destination"}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item md={4} xs={12} className="my-2">
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
                value={currentDate}
                inputVariant="outlined"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="my-2">
              <Menu
                anchorEl={anchorEl}
                open={filtersOpen}
                onClose={handleCloseMenu}
                style={{ zIndex: 0 }}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}

              >
                <div className="p-4">
                  <div className="my-2">
                    <TextField
                      variant="outlined"
                      type={"number"}
                      id="outlined-start-adornment"
                      onChange={handleInputChange}
                      name="max_weight"
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
                    />
                    <FormHelperText>Weight</FormHelperText>
                  </div>
                  <div className="my-2">
                    <TextField
                      type={"number"}
                      variant="outlined"
                      id="outlined-start-adornment"
                      name="max_volume"
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">L</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                        },
                      }}
                      value={
                        props.filters.max_volume ? props.filters.max_volume : 0
                      }
                    />
                    <FormHelperText>Volume</FormHelperText>
                  </div>

                  <SelectBoxExtended
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
                  />
                </div>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className="d-flex justify-content-center">
          <Button color="primary" onClick={handleMenu}>
            Show Advanced Filters
          </Button>
          <Button
            variant="outlined"
            color={"primary"}
            startIcon={<FaSearch />}
            onClick={submitFilters}
          >
            Rechercher
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Search;
