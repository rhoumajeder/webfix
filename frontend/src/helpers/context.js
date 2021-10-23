import React from "react";
import { createContext, useState, useEffect } from "react";
import { FaCarSide, FaPlane } from "react-icons/fa";
import { getUserID } from "./auth";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const getModesOfTransportation = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const Context = ({ children }) => {
  const [screenSize, setScreenSize] = useState(getWindowDimensions);
  const [modes] = useState({
    Avion: <FaPlane className={"rotate-negative-90 text-warning mx-2 fs-5"} />,
    Car: <FaCarSide className={"text-warning mx-2 fs-5"} />,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getWindowDimensions);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenContext.Provider value={screenSize}>
      <ModeOfTransportationContext.Provider value={modes}>
        {children}
      </ModeOfTransportationContext.Provider>
    </ScreenContext.Provider>
  );
};

export const ScreenContext = createContext(getWindowDimensions);
export const ModeOfTransportationContext = createContext({});
export default Context;
