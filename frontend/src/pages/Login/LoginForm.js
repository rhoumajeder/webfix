import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import AuthForm from "../../components/AuthForm/AuthForm";
import * as yup from "yup";
import axiosInstance from "../../helpers/axios";
import ReCAPTCHA from "react-google-recaptcha";


const LoginForm = (props) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const recaptchaRef = React.useRef();


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const gRecaptchaToken = await recaptchaRef.current.executeAsync();
    //console.log(gRecaptchaToken)
    // axiosInstance
    //   .post("auth/verify_recaptcha", { recaptcha_token: gRecaptchaToken })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 400) {
    //       addToast(err?.response?.data?.detail || "ReCaptcha Failed", {
    //         appearance: "error",
    //       });
    //       return

    //     }
    //     else if (res.status === 200) {
          axiosInstance
            .post("auth/token", formData)
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("access_token", res.data.access);
              localStorage.setItem("refresh_token", res.data.refresh);
              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + localStorage.getItem("access_token");
              addToast("Login Successful", { appearance: "success" });
              if (props.location.search) {
                const url = new URLSearchParams(props.location.search)
                const next = url.get('next')
                if (next) {
                  history.push(next)
                  history.go()
                  return
                }
              }
              history.push("/home");
              history.go();
            })
            .catch((err) => {
              console.log(err.response);
              addToast(err?.response?.data?.detail || "Something went wrong", {
                appearance: "error",
              });
            });

        //}


     // }
      // )
      // .catch((err) => {
      //   console.log(err.response);
      //   addToast(err?.response?.data?.detail || "Recaptcha Failed", {
      //     appearance: "error",
      //   });
      //   return
      // });

      

  };

  React.useEffect(() => {
    validFormSchema.isValid(formData).then((valid) => {
      setValidForm(valid);
    });
  }, [formData]);

  return (
    <AuthForm
      type={"Login"}
      onFormSubmit={handleSubmit}
      setForm={setForm}
      formData={formData}
      isValid={isValid}
      // captcha={<ReCAPTCHA
      //   sitekey="6LdF_5IdAAAAALzAguYkwNu1qdj_CnQoUh0wQD9y"
      //   ref={recaptchaRef}
      //   size="invisible"
      // />}
    />
  );
};

export default LoginForm;
