import React from "react";
import Select, { components } from "react-select";
import { Avatar, Box, Typography } from "@material-ui/core";
import Logo from "./../../assets/images/placeholder-avatar.png";

const SelectBoxExtended = (props) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
      paddingTop: "9px",
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "white !important" : "black",
    }),
    menu: (base) => ({
      ...base,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
    }),
  };

  const SetAvatar = (path, name) => {
    let isURL = new RegExp("^(?:[a-z]+:)?//", "i");
    if (typeof path === "object") {
      return path;
    }

    if (isURL.test(path)) {
      return <Avatar component="span" src={path} alt={name} />;
    } else {
      // let _url = new URL(path, document.baseURI).href;
      return ""; // <Avatar component="span" src={require(_url).default} alt={name}/>;
    }
  };

  const Option = (props) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <Box component={"div"} className={"d-flex align-items-center"}>
          {data.avatar && (
            <Box component={"span"} className={"me-1"}>
              {SetAvatar(data.avatar, data.label)}
            </Box>
          )}
          <Typography
            component={"span"}
            variant={"body2"}
            className={"fw-normal"}
          >
            {data.label}
          </Typography>
        </Box>
      </components.Option>
    );
  };

  const SingleValue = (props) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <Box component={"div"} className={"d-flex align-items-center"}>
          {data.avatar && (
            <Box component={"span"} className={"me-1"}>
              {SetAvatar(data.avatar, data.label)}
            </Box>
          )}
          <Typography
            component={"span"}
            variant={"body2"}
            color={"textPrimary"}
            className={"fw-normal"}
          >
            {data.label}
          </Typography>
        </Box>
      </components.SingleValue>
    );
  };

  return (
    <Select
      options={props.options}
      styles={customStyles}
      components={{ Option, SingleValue }}
      isSearchable={true}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#007bff",
          primary50: "rgba(0, 0, 0, 0.1)",
          primary25: "rgba(0, 0, 0, 0.04)",
        },
      })}
      className={"m-0 p-0"}
      menuPortalTarget={document.body}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      value={props.value}
      name={props.name}
      label={props.label}
      labelId={props.labelId}
      placeholder={props.placeholder}
      inputValue={props.inputValue}
    />
  );
};

export default SelectBoxExtended;
