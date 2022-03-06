import React, { useContext } from "react";
import {Typography} from "@material-ui/core";

import { ScreenContext } from "../helpers/context";

export const useVolumeSlider = (defaultValue) => {
  const screen = useContext(ScreenContext);

  const marks = [
    {
      value: 0,
      label: (
        <img
          src={require("../assets/slider/coke.jpg").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 25 : 50}
          height={screen.width <= 480 ? 25 : 50}
        />
      ),
    },
    {
      value: 25,
      label: (
        <img
          src={require("../assets/slider/bottle.jpg").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 50 : 75}
          height={screen.width <= 480 ? 50 : 75}
        />
      ),
    },
    {
      value: 50,
      label: (
        <img
          src={require("../assets/slider/gallon-small.jpg").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 75 : 100}
          height={screen.width <= 480 ? 75 : 100}
        />
      ),
    },
    {
      value: 75,
      label: (
        <img
          src={require("../assets/slider/gallon-big.jpg").default}
          alt={"Coke"}
          width={screen.width <= 480 ? 100 : 125}
          height={screen.width <= 480 ? 100 : 125}
        />
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
          No Max{" "}
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
