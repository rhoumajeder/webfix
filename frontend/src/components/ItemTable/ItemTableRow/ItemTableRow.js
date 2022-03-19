import React from "react";

import { TableCell, TableRow, Checkbox, TextField } from "@material-ui/core";

import objectInArray from "../../../helpers/objectInArray";
import findWithAttr from "../../../helpers/findAttr";

const ItemTableRow = (props) => {
  const handleInputChange = (e) => {
    props.setDynamicRows((prevState) => {
      const newTableData = [...prevState];
      //console.log(newTableData);

      const rowIndex = findWithAttr(newTableData, "id", props.row.id);

      newTableData[rowIndex][e.target.name] = e.target.value;
      return newTableData;
    });
  };

  return (
    <TableRow key={props.index}>
      {props.hasCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            id={props.row.id}
            checked={objectInArray(
              props.dynamicRows,
              "id",
              props.row.id.toString()
            )}
            onClick={props.handleCheckboxClick}
            // inputProps={{
            // "aria-labelledby": `${props.title}-${index}`,
            // }}
          />
        </TableCell>
      )}
      {props.headings.map((heading) => {
        return (
          <TableCell
            className={"text-nowrap"}
            id={`${props.title}-${props.index}`}
            align="right"
          >
            {heading.isTextInput ? (
              <TextField
                id={`${props.title}-${heading.text}-${props.row.id}`}
                type={heading.inputType}
                size={"small"}
                variant="outlined"
                inputProps={{ min: 0 }}
                InputLabelProps={{ shrink: false }}
                className={`minInputWidth`}
                InputProps={{
                  classes: { input: "py-2 customize-inputField" },
                }}
                name={heading.text.toLowerCase()}
                placeholder={heading.text}
                onChange={handleInputChange}
              />
            ) : (
              <p>{props.row[heading.default]}</p>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default ItemTableRow;
