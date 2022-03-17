import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import IndexListing from "./pages/IndexListing";
import UserProfile, { UserProfileDetails } from "./pages/UserProfile";
import RecordDetails from "./pages/RecordDetails";
import CreateRecord from "./pages/CreateRecord";
import ListRequests from "./pages/ListRequests";
import ListOffers from "./pages/ListOffers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./components/Logout/Logout";
import Spinner from "./components/Spinner/Spinner";
import RecordCreation from "./pages/RecordCreation/RecordCreation";
import RequestPasswordReset from "./pages/RequestPasswordReset/RequestPasswordReset";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm/ResetPasswordConfirm";
import Chat from "./pages/Chat/Chat";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";

import { ToastProvider } from "react-toast-notifications";

import Context from "./helpers/context";
import { components } from "react-select";

import axiosInstance from "./helpers/axios";

import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";

import { AuthContext } from "./context/auth";

import PropositionState from "./pages/PropositionState/PropositionState";

import AskRecordDetails from "./pages/AskRecordDetails/AskRecordDetails";

import Commentcamarche from "./pages/Commentcamarche";
import cgu from "./pages/cgu";

import Contactnous from "./pages/Contactnous";
import Quisommesnous from "./pages/Quisommesnous";
import FaqAccordation from "./components/FaqAccordation/FaqAccordation";
import PaymentModal from "./components/PaymentModal/PaymentModal";



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(AuthContext);

  const getUser = () => {
    setLoading(true);
    axiosInstance
      .get("auth/get-user")
      .then((res) => {
        if (res.data.user) {
          setIsAuthenticated(true);
          setUser(res.data.user);
          setLoading(false);
        }
      })
      .catch((err) => {
         
        setIsAuthenticated(false);
        setUser({});
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (

      <MuiPickersUtilsProvider utils={MomentUtils}>

        <ThemeProvider theme={theme}>
          <Context>
            <ToastProvider
              autoDismiss={true}
              placement={"bottom-right"}
              components={{ Toast: Alert }}
            >
              <Router>
                <Switch>
                  <PublicRoute
                    exact
                    path="/login"
                    component={Login}
                    isAuthenticated={isAuthenticated}
                  />
                  <PublicRoute
                    exact
                    path="/register"
                    component={Register}
                    isAuthenticated={isAuthenticated}
                  />
                  <PublicRoute
                    exact
                    path="/password/reset/confirm/:uid/:token"
                    component={ResetPasswordConfirm}
                    isAuthenticated={isAuthenticated}
                  />
                  <PublicRoute
                    exact
                    path="/reset-password"
                    component={RequestPasswordReset}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path="/logout"
                    component={Logout}
                    isAuthenticated={isAuthenticated}
                  />
                  <Route exact path={"/home"} component={IndexListing} />
                  <PrivateRoute
                    exact
                    path={"/user-profile"}
                    component={UserProfile}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path={"/user-profile/:user"}
                    component={UserProfileDetails}
                    isAuthenticated={isAuthenticated}
                  />
                  <Route
                    exact
                    path={"/record-details/:id"}
                    component={RecordDetails}

                  />
                  <PrivateRoute
                    exact
                    path={"/record-creation"}
                    component={RecordCreation}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path={"/list-requests"}
                    component={ListRequests}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path={"/my-request-state/:id"}
                    component={PropositionState}
                    otherProps={{ itemType: "request" }}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path={"/list-offers"}
                    component={ListOffers}
                    isAuthenticated={isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path={"/my-offer-state/:id"}
                    component={PropositionState}
                    isAuthenticated={isAuthenticated}
                    otherProps={{ itemType: "offer" }}
                  />
                  <Route
                    exact
                    path={"/ask-record-details/:id"}
                    component={AskRecordDetails}

                  />
                  <PrivateRoute
                    exact
                    path={"/chat"}
                    component={Chat}
                    isAuthenticated={isAuthenticated}
                  />
                  <Route
                    exact
                    path={"/shop"}
                    component={ShoppingPage}
                  />
                  <Route
                    exact
                    path={"/Commentcamarche"}
                    component={Commentcamarche}
                  />
                  <Route
                    exact
                    path={"/Quisommesnous"}
                    component={Quisommesnous}
                  />
                  <Route
                    exact
                    path={"/Centreaide"}
                    component={FaqAccordation}
                  />
                  <Route
                    exact
                    path={"/Contactnous"}
                    component={Contactnous}
                  />
                  <Route
                    exact
                    path={"/cgu"}
                    component={cgu}
                  />
                  <Route
                    exact
                    path="/"
                    render={(props) => <Redirect to="/home" />}
                  />
                </Switch>
              </Router>
            </ToastProvider>
          </Context>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
};

const Alert = ({ appearance, children }) => {
  return (
    <div
      className={`alert animated flipInX 
        ${appearance === "error" ? "alert-danger" : "alert-" + appearance}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default App;
