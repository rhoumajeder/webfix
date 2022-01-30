import React from "react";
import Grid from '@material-ui/core/Grid';


import RegisterForm from '../Register';
import LoginForm from './LoginForm';
import Header from "../../components/Header/Header";
import HelpButton from "../../components/HelpButton/HelpButton";


const Index = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Grid container spacing={2}>
        <Grid item md={6}>
          <LoginForm {...props} />
        </Grid>
        <Grid item md={6}>
          <RegisterForm {...props} />
        </Grid>
      </Grid>
      <HelpButton />
    </React.Fragment>
  );
};

export default Index;
