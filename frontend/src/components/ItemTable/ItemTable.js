import React from "react";
import PaginationExtended from "../PaginationExtended/PaginationExtended";
import { ScreenContext } from "../../helpers/context";
import {
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
} from "@material-ui/core";
import EnhancedTableToolbar from "../EnhancedToolBar/EnhancedToolBar";
import uuid from "react-uuid";
import findWithAttr from "../../helpers/findAttr";
import objectInArray from "../../helpers/objectInArray";
import ItemTableRow from "./ItemTableRow/ItemTableRow";

const ItemTable = (props) => {
  const screen = React.useContext(ScreenContext);

  // Function that gets called when the item checkbox is clicked
  const handleCheckboxClick = (e) => {
    if (e.target.checked) {
      props.setDynamicRows((prevState) => {
        const newTableData = [...prevState];
        console.log(newTableData);

        const rowIndex = findWithAttr(props.rows, "id", parseInt(e.target.id));
        const newRow = {};

        props.headings.forEach((heading) => {
          newRow[heading.text.toLowerCase()] =
            props.rows[rowIndex][heading.default];
        });

        newRow.id = e.target.id;
        newRow.type = "accepted";
        newRow.files = [];
        newRow.category = props.title;
        newRow.state = "Accepted";

        newTableData.push(newRow);
        return newTableData;
      });
    } else {
      props.setDynamicRows((prevState) => {
        const newTableData = [...prevState];
        console.log(newTableData);

        const rowIndex = findWithAttr(
          newTableData,
          "id",
          parseInt(e.target.id)
        );

        newTableData.splice(rowIndex, 1);

        return newTableData;
      });
    }
  };

  return (
    <Paper className={`${props.className}`}>
      <EnhancedTableToolbar
        screen={screen}
        title={props.title}
        // record={props.rows}
        // setRows={setRows}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.hasCheckbox && <TableCell padding="checkbox" />}
              {props.headings.map((heading) => {
                return (
                  <TableCell className={"text-nowrap"} align="right">
                    {heading.text}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => {
              if (!props.inputTable) {
                return (
                  <ItemTableRow
                    title={props.title}
                    headings={props.headings}
                    handleCheckboxClick={handleCheckboxClick}
                    dynamicRows={props.dynamicRows}
                    index={index}
                    row={row}
                    hasCheckbox={props.hasCheckbox}
                    setDynamicRows={props.setDynamicRows}
                  />
                );
              } else {
                if (row.type === "accepted" && row.category === props.title) {
                  return (
                    <ItemTableRow
                      title={props.title}
                      headings={props.headings}
                      handleCheckboxClick={handleCheckboxClick}
                      dynamicRows={props.dynamicRows}
                      index={index}
                      row={row}
                      hasCheckbox={props.hasCheckbox}
                      setDynamicRows={props.setDynamicRows}
                    />
                  );
                }
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {props.hasPagination && (
        <PaginationExtended
          recordsPerPage={rowsPerPage}
          className={"p-3 justify-content-end"}
          totalRecords={rows.length}
          paginate={handleChangePage}
          currentPage={page}
          shape={"round"}
        />
      )}
    </Paper>
  );
};

export default ItemTable;
