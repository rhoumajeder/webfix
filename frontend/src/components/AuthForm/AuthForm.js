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
  makeStyles,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { ScreenContext } from "../../helpers/context";
import { Link } from "react-router-dom";




const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh'
    },
  }
}))


const AuthForm = ({ setForm, onFormSubmit, type, formData, isValid, captcha }) => {
  const screen = React.useContext(ScreenContext);
  const classes = useStyles()

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
        className={classes.root}
      >
        <Grid item xs={12} md={10}>
          <Card className={"my-5"}>
            <CardContent>
              {type === "Login" && (
                <Typography
                  component={"h6"}
                  variant={"h6"}
                  className={"fw-bold my-2"}
                >
                  Se Connecter
                </Typography>
              )}
              {type === "Register" && (
                <Typography
                  component={"h6"}
                  variant={"h6"}
                  className={"fw-bold my-2"}
                >
                  Inscription
                </Typography>
              )}
              {type === "Register" ? (
                <TextField
                  required
                  id={`${type}_username`}
                  name={"username"}
                  InputLabelProps={{ shrink: false }}
                  style={{ minWidth: "100px" }}
                  placeholder={"Entrer Username"}
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
                id={`${type}_email`}
                name={"email"}
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Entrer votre Email"}
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
                id={`${type}_password`}
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Entrer Votre Mot de Passe"}
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
                    id={`${type}_password2`}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Confirmer Votre mot De Passe"}
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
                    id={`${type}_phone_number`}
                    InputLabelProps={{ shrink: false }}
                    style={{ minWidth: "100px" }}
                    placeholder={"Entrer Numéro de téléphone"}
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
                                        id={"${type}_city"}
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
                                        id={"${type}_address"}
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
                                        id={"${type}_dob"}
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
              {captcha}



              <Button
                id={`${type}_btn_login`}
                type={"submit"}
                disabled={isValid !== true}
                color="primary"
                fullWidth
                className={"mb-3"}
                variant="contained"
              >
                {type === "Register" ? "Inscription" : "Se Connecter"}
              </Button>
              <Box component={"div"} className={"my-3"}>
                {type === "Login" && (
                  <Typography
                    variant={"body1"}
                    color={"textSecondary"}
                    className={"fw-normal my-2"}
                  >
                    Mot de passe oublié?{" "}
                    <Link to="/reset-password"> Cliquer ici </Link>
                  </Typography>
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
