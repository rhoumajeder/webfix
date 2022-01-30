import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../helpers/axios";
import { register } from "../../helpers/auth";
import { useToasts } from "react-toast-notifications";
import AuthForm from "../../components/AuthForm/AuthForm";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import HelpButton from "../../components/HelpButton/HelpButton";


const Index = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const recaptchaRef = React.useRef();


  let FormRecord = {
    username: "",
    email: "",
    password: "",
    password2: "",
    phone_number: null,
  };
  const [formData, setForm] = useState(FormRecord);
  const [isValid, setValidForm] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validFormSchema = yup.object().shape({
    username: yup.string().max(20, "username should have less then 20 characters ").required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must have at least 8 characters"),
    password2: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone_number: yup
      .string()
      .notRequired()
      .nullable()
      .matches(phoneRegExp, "Phone number is not valid"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const gRecaptchaRoken = recaptchaRef.current.execute();
    console.log(gRecaptchaRoken)



    validFormSchema
      .validate(formData)
      .then((valid) => {
        if (valid) {
          axiosInstance
            .post("auth/signup", formData)
            .then((signUpRes) => {
              console.log(signUpRes.data);

              addToast("Registration Successful", { appearance: "success" });

              axiosInstance
                .post("auth/token", {
                  email: formData.email,
                  password: formData.password,
                })
                .then((loginRes) => {
                  console.log(loginRes.data);
                  localStorage.setItem("access_token", loginRes.data.access);
                  localStorage.setItem("refresh_token", loginRes.data.refresh);
                  axiosInstance.defaults.headers["Authorization"] =
                    "JWT " + localStorage.getItem("access_token");
                  addToast("Login Successful", { appearance: "success" });
                  history.push("/home");
                  history.go();
                })
                .catch((err) => {
                  console.log(err.response);
                  addToast("Unable to login user", { appearance: "error" })
                });
            })
            .catch((err) => {
              console.log(err.response)
              Object.keys(err.response.data.errors).forEach(key => {
                console.log(key)
                err.response.data.errors[key].forEach(error => {
                  addToast(error, { appearance: "error" })
                })
              })
            });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: "warning" });
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    validFormSchema.isValid(formData).then((valid) => {
      setValidForm(valid);
    });
  }, [formData]);

  return (
    <div>
      <AuthForm
        type={"Register"}
        onFormSubmit={handleSubmit}
        setForm={setForm}
        formData={formData}
        isValid={isValid}
        captcha={<ReCAPTCHA
          sitekey="6LdF_5IdAAAAALzAguYkwNu1qdj_CnQoUh0wQD9y"
          ref={recaptchaRef}
          size="invisible"
        />}
      />
      <HelpButton />
    </div>
  );
};

export default Index;
