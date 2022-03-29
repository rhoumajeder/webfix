import React, { useContext } from "react";
import {Typography} from "@material-ui/core";

import { ScreenContext } from "../helpers/context";

export const useVolumeSlider = (defaultValue) => {
  const screen = useContext(ScreenContext);

  const marks = [
    {
      value: 0,
      label: (
        <Typography color={"textSecondary"}>  
        <img
        // src={require("../assets/slider/coke.jpg").default}
        src={require("../assets/slider/v1p.png").default}
        alt={"Coke"}
        // width={screen.width <= 480 ? 25 : 50}
        // height={screen.width <= 480 ? 25 : 50}
        width={screen.width <= 480 ? 100 : 75}
        height={screen.width <= 480 ? 100 : 75}
        // style={{  marginLeft: "20%",}} 
      ></img>Petit Colis</Typography>    

     
        
      ),
      
    },
    {
      value: 25,
      label: (
        <Typography color={"textSecondary"}>  
        <img
          // src={require("../assets/slider/bottle.jpg").default}
          src={require("../assets/slider/v2.jpg").default}
          alt={"Coke"}
          // width={screen.width <= 480 ? 50 : 75}
          // height={screen.width <= 480 ? 50 : 75}
          width={screen.width <= 480 ? 100 : 100}
          height={screen.width <= 480 ? 100 : 100} 
          ></img>Moyen</Typography>  
      ),
    },
    {
      value: 50,
      label: (
        <Typography color={"textSecondary"}>  
        <img
          // src={require("../assets/slider/gallon-small.jpg").default}
          src={require("../assets/slider/v3.jpg").default}
          alt={"Coke"}
          // width={screen.width <= 480 ? 75 : 100}
          // height={screen.width <= 480 ? 75 : 100}
          width={screen.width <= 480 ? 100 : 100}
          height={screen.width <= 480 ? 100 : 100}
          ></img>Grand Colis</Typography>  
      ),
    },
    {
      value: 75,
      label: (
        <Typography color={"textSecondary"}>  
        <img
          // src={require("../assets/slider/gallon-big.jpg").default}
          src={require("../assets/slider/v4.jpg").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 100 : 125}
          height={screen.width <= 480 ? 100 : 125}
          ></img>Très grand Colis</Typography>  
      ),
    },
    {
      value: 100,
      label: (
        <Typography
          variant={screen.width <= 480 ? "caption" : "body2"}
          color={"textSecondary"}
        >
          {" "}
            ....{" "}
        </Typography>
      ),
    },
  ];

  const [selectedIndex, setSelectionIndex] = React.useState(
    marks.findIndex((mark) => mark.value === defaultValue)
  );

  const setMaxVolume = (value) => {
    setSelectionIndex(
      marks.findIndex((mark) => mark.value === value)
    )
  };


  const handleVolumeChange = (event, val) => {
    setMaxVolume(val)
  };

  return {
    setMaxVolume,
    selectedIndex,
    setSelectionIndex,
    handleVolumeChange,
    sliderMarks: marks,
    maxVolume: marks[selectedIndex].value,
  }
}



export default useVolumeSlider;
