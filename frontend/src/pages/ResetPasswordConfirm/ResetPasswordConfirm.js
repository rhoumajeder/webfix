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
import { useParams } from "react-router";

const ResetPasswordConfirm = () => {
  let { uid, token } = useParams();

  const { addToast } = useToasts();
  const history = useHistory();
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });

  let validFormSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must have at least 8 characters"),
    password_confirm: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendResetPasswordConfirmation = () => {
    validFormSchema
      .validate(formData)
      .then((valid) => {
        if (valid) {
          axiosInstance
            .post("accounts/users/reset_password_confirm/", {
              uid: uid,
              token: token,
              new_password: formData.password,
              re_new_password: formData.password_confirm,
            })
            .then((res) => {
              console.log(res.data);
              addToast("Password reseted correctly", { appearance: "success" });
              history.push("/login");
              history.go();
            })
            .catch((err) => {
              addToast(err.message, { appearance: "warning" });
              console.log(err.response);
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
                Confirm password reset
              </Typography>

              <TextField
                required
                id="password"
                name={"password"}
                type="password"
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Enter Password"}
                value={formData.passwod}
                size={"small"}
                variant="outlined"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />

              <TextField
                required
                id="password_confirm"
                name={"password_confirm"}
                type="password"
                InputLabelProps={{ shrink: false }}
                style={{ minWidth: "100px" }}
                placeholder={"Confirm Password"}
                value={formData.password_confirm}
                size={"small"}
                variant="outlined"
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </CardContent>
            <CardActions className={"px-3 d-block text-center"}>
              <Button
                onClick={sendResetPasswordConfirmation}
                color="primary"
                fullWidth
                className={"mb-3"}
                variant="contained"
              >
                Reset Password
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ResetPasswordConfirm;
