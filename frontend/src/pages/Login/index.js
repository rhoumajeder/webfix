import React from "react";
import Grid from '@material-ui/core/Grid';


import RegisterForm from '../Register';
import LoginForm from './LoginForm';
import Header from "../../components/Header/Header";

import {
 
  Button,
   
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//import ReactTextAnimation from "./IndexListing/ReactTextAnimation";
//frontend\src\pages\IndexListing\ReactTextAnimation.js

import ReactTextAnimation from "../../pages/IndexListing/ReactTextAnimation";

const Index = (props) => {
  const texts2 = ["Documents", "Accessoires","Colis"];
  const texts1 = ["d'avion", " de bateau"];
  return (
    <React.Fragment>
      <Header />
      <Grid container > 
      {/* spacing={2} */}
        <Grid item md={2} sm={1} xs={1}>
          {/* <RegisterForm {...props} /> */}
        </Grid>
        <Grid item md={8} sm={10} xs={10}>
          <LoginForm {...props} /> 
        </Grid> 

        <Grid item md={2} sm={1} xs={1} >
          {/* <LoginForm {...props} /> */}
        </Grid> 
      </Grid>
    </React.Fragment>
  );
};

export default Index;
