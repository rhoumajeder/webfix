import React, { useState } from "react";
import {
  IconButton,
  TableRow,
  TableCell,
  TextField,
  Collapse,
  Box,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FileUpload from "../../FileUpload/FileUpload";
import findWithAttr from "../../../helpers/findAttr";
import { FcDeleteRow } from "react-icons/fc";
import uuid from "react-uuid";

const CreateItemRow = (props) => {
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    props.setRows((prevState) => {
      const newTableData = [...prevState];
       

      const rowIndex = findWithAttr(newTableData, "id", props.index);

      newTableData[rowIndex][e.target.name] = e.target.value;
      return newTableData;
    });
  };

  const removeRowHandler = (index) => () => {
    props.setRows((prevState) => {
      const newTableData = [...prevState];

      const deleteIndex = findWithAttr(newTableData, "id", index);

      newTableData.splice(deleteIndex, 1);
      return newTableData;
    });
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <PhotoCamera />
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={"text-nowrap"} align="left">
          <TextField
            id={`name-${props.row.name}-${props.index}`}
            name="name"
            size={"small"}
            variant="outlined"
            style={{ minWidth: "150px" }}
            placeholder={"Name"}
            defaultValue={props.row.name}
            onChange={handleInputChange}
          />
        </TableCell>

        <TableCell className={"text-nowrap"} align="left">
          <TextField
            id={`quantity-${props.row.name}-${props.index}`}
            size={"small"}
            variant="outlined"
            name="quantity"
            type={"number"}
            inputProps={{ min: 0 }}
            style={{ minWidth: "100px" }}
            placeholder={"Quantity"}
            defaultValue={props.row.quantity}
            onChange={handleInputChange}
          />
        </TableCell>

        <TableCell className={"text-nowrap"} align="left">

        <TextField   pattern="[0-9]*"
            id={`weight-${props.row.name}-${props.index}`}
            size={"small"}
            variant="outlined"
            name="weight"
            // type={"number"}
            inputProps={{ min: 0 }}
           
            style={{ minWidth: "100px" }}
            placeholder={"Weight"}  
            defaultValue={props.row.weight}
            onChange={handleInputChange}
          />



          {/* <TextField
            id={`weight-${props.row.name}-${props.index}`}
            size={"small"}
            variant="outlined"
            name="weight"
            // type={"number"}
            inputProps={{ min: 0 }}
           
            style={{ minWidth: "100px" }}
            placeholder={"Weight"} 
            defaultValue={props.row.weight}
            onChange={handleInputChange}
          /> */}
        </TableCell>

        {props.priceRequired ? (
          <TableCell className={"text-nowrap"} align="left">
            <TextField
              id={`price-${props.row.name}-${props.index}`}
              size={"small"}
              variant="outlined"
              name="price"
              type={"number"}
              inputProps={{ min: 0 }}
              style={{ minWidth: "100px" }}
              placeholder={"Prix €"}
              defaultValue={props.row.price}
              onChange={handleInputChange}
            />
          </TableCell>
        ) : (
          <TableCell className={"text-nowrap"} align="left">
            <p>Prix -- En cours</p>
          </TableCell>
        )}

        <TableCell className={"text-nowrap"} align="left">
          {props.currentLength > 1 && (
            <IconButton
              aria-label="delete"
              onClick={removeRowHandler(props.index)}
            >
              <FcDeleteRow className={"text-danger"} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <FileUpload
                rowId={props.index}
                id={`fileUpload-${uuid()}`}
                setDynamicRows={props.setRows}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CreateItemRow;
