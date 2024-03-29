import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../helpers/auth";
import { useToasts } from "react-toast-notifications";
import AuthForm from "../../components/AuthForm/AuthForm";
import * as yup from "yup";
import axiosInstance from "../../helpers/axios";
import Header from "../../components/Header/Header";

const Index = () => {
  const { addToast } = useToasts();
  const history = useHistory();

  let FormRecord = { email: "", password: "" };
  const [formData, setForm] = useState(FormRecord);
  const [isValid, setValidForm] = useState(false);

  let validFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email Format")
      .required("Email is required!"),
    password: yup.string().required("Password is required!"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("auth/token", formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        addToast("Login Successful", { appearance: "success" });
        history.push("/home");
        history.go();
      })
      .catch((err) => {
        console.log(err.response);
        addToast(err?.response?.data?.detail || "Something went wrong", {
          appearance: "error",
        });
      });
  };

  React.useEffect(() => {
    validFormSchema.isValid(formData).then((valid) => {
      setValidForm(valid);
    });
  }, [formData]);

  return (
    <React.Fragment>
      <Header />
      <AuthForm
        type={"Login"}
        onFormSubmit={handleSubmit}
        setForm={setForm}
        formData={formData}
        isValid={isValid}
      />
    </React.Fragment>
  );
};

export default Index;
