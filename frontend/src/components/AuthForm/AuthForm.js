import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ScreenContext } from "../../helpers/context";
import { Link } from "react-router-dom";

const AuthForm = ({ setForm, onFormSubmit, type, formData, isValid }) => {
  const screen = React.useContext(ScreenContext);

  const validateEmail = () => {
    if (formData.email.length < 1) return false;
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email);
  };

  // const validatePassword = () => {
  //     if (formData.password.length < 1) return false;
  //     // return !(formData.password.length >= 6);
  // };

  const validatePassword2 = () => {
    return formData.password !== formData.password2;
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "number") {
      setForm({ ...formData, [name]: value * 1 });
    } else if (type === "radio") {
      setForm({ ...formData, [name]: value });
    } else {
      setForm({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setForm({ ...formData, ["dob"]: moment(date).format("YYYY-MM-DD") });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item md={4} sm={6} xs={10}>
          <Card className={"my-5"}>
            <CardContent>
              {type === "Login" && (
                <Typography
                  component={"h6"}
                  variant={"h6"}
                  className={"fw-bold my-2"}
                >
                  Please Login
                </Typography>
              )}
              {type === "Register" && (
                <Typography
                  component={"h6"}
                  variant={"h6"}
                  className={"fw-bold my-2"}
                >
                  Fill out this form to Register
                </Typography>
              )}
              {type === "Register" ? (
                <TextField
                  required
                  id="username"
                  name={"username"}
                  InputLabelProps={{ shrink: false }}
                  style={{ minWidth: "100px" }}
                  placeholder={"Enter Username"}
                  value={formData.username}
                  size={"small"}
                  variant="outlined"
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                />
              ) : null}
              <TextField
                required
                id="email"
                name={"email"}
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Enter Email"}
                helperText="example@example.com"
                value={formData.email}
                size={"small"}
                variant="outlined"
                onChange={handleChange}
                error={validateEmail()}
                margin="normal"
                fullWidth
              />

              <TextField
                required
                id="password"
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Enter Password"}
                value={formData.password}
                type="password"
                size={"small"}
                variant="outlined"
                name={"password"}
                // helperText={"password must be greater than 4"}
                onChange={handleChange}
                // error={validatePassword()}
                margin="normal"
                fullWidth
              />
              {type === "Register" && (
                <React.Fragment>
                  <TextField
                    required
                    id="password2"
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Confirm Password"}
                    value={formData.password2}
                    type="password"
                    size={"small"}
                    variant="outlined"
                    name={"password2"}
                    // helperText={"password must be greater than 4"}
                    onChange={handleChange}
                    error={validatePassword2()}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    required
                    id="phone_number"
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Enter Phone Number"}
                    value={formData.phone_number}
                    type="text"
                    size={"small"}
                    variant="outlined"
                    name={"phone_number"}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                                        required
                                        id="city"
                                        InputLabelProps={{shrink: false}}
                                        style={{minWidth: '100px'}}
                                        placeholder={"Enter City Name"}
                                        value={formData.city}
                                        size={"small"} variant="outlined"
                                        name={"city"}
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth/>
                                    <TextField
                                        required
                                        id="address"
                                        InputLabelProps={{shrink: false}}
                                        style={{minWidth: '100px'}}
                                        placeholder={"Enter Complete Address"}
                                        value={formData.address}
                                        size={"small"} variant="outlined"
                                        name={"address"}
                                        onChange={handleChange}
                                        margin="normal"
                                        fullWidth/>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant={screen.width <= 480 ? 'dialog' : 'inline'}
                                        format="DD MMM, yyyy"
                                        margin="normal"
                                        fullWidth
                                        id="dob"
                                        placeholder="Date Of Birth"
                                        value={formData.dob}
                                        color={"primary"}
                                        
                                        InputLabelProps={{shrink: false}}
                                        style={{minWidth: '100px'}}
                                        size="small"
                                        inputVariant="outlined"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    /> */}
                  {/* <RadioGroup aria-label="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Male" />
                                        <FormControlLabel value="false" control={<Radio />} label="Female" />
                                    </RadioGroup> */}
                </React.Fragment>
              )}
            </CardContent>
            <CardActions className={"px-3 d-block text-center"}>
              <Button
                id="btn_login"
                type={"submit"}
                disabled={isValid !== true}
                color="primary"
                fullWidth
                className={"mb-3"}
                variant="contained"
              >
                {type === "Register" ? "Register" : "Login"}
              </Button>
              <Box component={"div"} className={"my-3"}>
                {type === "Register" && (
                  <Typography
                    variant={"body1"}
                    color={"textSecondary"}
                    className={"fw-normal my-2"}
                  >
                    Already a member? <Link to="/login"> Login </Link>
                  </Typography>
                )}
                {type === "Login" && (
                  <React.Fragment>
                    <Typography
                      variant={"body1"}
                      color={"textSecondary"}
                      className={"fw-normal my-2"}
                    >
                      New on this site? <Link to="/register"> Register </Link>
                    </Typography>
                    <Typography
                      variant={"body1"}
                      color={"textSecondary"}
                      className={"fw-normal my-2"}
                    >
                      Forgot your password?{" "}
                      <Link to="/reset-password"> Reset password </Link>
                    </Typography>
                  </React.Fragment>
                )}
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthForm;
