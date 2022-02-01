import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../helpers/axios";
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
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
import Header from "../../components/Header/Header";

const RequestPasswordReset = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "" });

  // password reset validation schema
  let validFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email Format")
      .required("Email is required"),
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send call to reset password
  const sendResetPasswordRequest = () => {
    validFormSchema
      .validate(formData)
      .then((valid) => {
        if (valid) {
          axiosInstance
            .post("accounts/users/reset_password/", formData)
            .then((res) => {
              console.log(res.data);
              addToast("An email was sent to you with further instructions", {
                appearance: "success",
              });
            })
            .catch((err) => {
              addToast(err.message, { appearance: "warning" });
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        addToast(err.message, { appearance: "warning" });
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Header />
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
              <Typography
                component={"h6"}
                variant={"h6"}
                className={"fw-bold my-2"}
              >
                Request password reset
              </Typography>

              <TextField
                required
                id="email"
                name={"email"}
                type="email"
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Enter Email"}
                helperText="example@example.com"
                value={formData.email}
                size={"small"}
                variant="outlined"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </CardContent>
            <CardActions className={"px-3 d-block text-center"}>
              <Button
                onClick={sendResetPasswordRequest}
                color="primary"
                fullWidth
                className={"mb-3"}
                variant="contained"
              >
                Request Password Reset
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RequestPasswordReset;
