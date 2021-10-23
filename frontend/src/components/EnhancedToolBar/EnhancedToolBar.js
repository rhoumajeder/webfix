import React from "react";
import SearchExtended from "../SearchExtended/SearchExtended";
import { Grid, Typography } from "@material-ui/core";

const EnhancedTableToolbar = (props) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={"bg-primary text-white mx-0 rounded-3"}
    >
      <Grid
        item
        sm
        xs={"auto"}
        className={`text-start ${
          props.screen.width <= 480 ? "w-100 mb-1 m-3" : "m-3"
        }`}
      >
        <Typography variant="h6" id="tableTitle" component="div">
          {props.title}
        </Typography>
      </Grid>
      <Grid
        item
        sm
        xs={"auto"}
        className={`text-end ${
          props.screen.width <= 480 ? "w-100 mt-1 m-3" : "m-3"
        }`}
      >
        <SearchExtended data={props.record} setRows={props.setRows} />
      </Grid>
    </Grid>
  );
};

export default EnhancedTableToolbar;
