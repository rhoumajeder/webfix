import React, { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

export default function Logout() {
  const history = useHistory();

  useEffect(() => {
    const response = axiosInstance.post("auth/logout", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/home");
    history.go();
  });
  return <Spinner />;
}
