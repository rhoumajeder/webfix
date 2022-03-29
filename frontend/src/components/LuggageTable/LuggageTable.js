import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import PaginationExtended from "../PaginationExtended/PaginationExtended";

import { GoVerified, GoUnverified } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { ScreenContext } from "../../helpers/context";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import EnhancedTableToolbar from "../EnhancedToolBar/EnhancedToolBar";

import "./LuggageTable.css";
import produce from "immer";

const LuggageTable = (props) => {
  const screen = React.useContext(ScreenContext);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = props.rows

  const handleClick = (event, rowID) => {
    if (props.isCheckboxDisabled === false) {
      const newRows = [...props.selected];
      const isChecked = event.target.checked;

      if (isChecked) {
        newRows.forEach(row => {
          if (row.id === rowID) {
            row.accepted = true
          }
        })

        props.setSelected(newRows);
      } else {
        newRows.forEach(row => {
          if (row.id === rowID) {
            row.accepted = false
          }
        })

        props.setSelected(newRows);
      }
    }
  };

  const handleInputChange = (event, rowId) => {
    const newRows = [...props.selected];
    newRows.forEach(row => {
      if (row.id === rowId) {
        row[event.target.name] = event.target.value;
      }
    })
     
    props.setSelected(newRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const isSelected = (row) => {
    return (
      props.selected.findIndex((obj) => {
        return obj.name === row.name;
      }) !== -1
    );
  };
  const rename_catego=(param)=>{
    switch(param) {
      case 'Food':
        return "Aliments"
      case 'Medicaments':
        return 'Médicaments'
      case 'Small Electronics':
        return 'High-Tech'
      case 'Small Accessories':
        return 'Accessoires'
      case 'Vetements':
        return 'Vêtements'
      case 'Big Mechanical':
        return 'Mécanique'
      case 'Big Electronics':
        return 'Electronique'
      case 'Autres':
        return 'Autres'
      default:
        return "Autres";
    
      }
  
  }

  const indexOfLastPage = page * rowsPerPage;
  const indexOfFirstPage = indexOfLastPage - rowsPerPage;
  const RowsToShow = rows.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <Paper className={`${props.className}`}>
      {props.hasTitle && (
        <EnhancedTableToolbar
          title={rename_catego(props.title)}
          screen={screen}
          record={props.rows}
        // setRows={setRows}
        />
      )}
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.hasCheckbox && <TableCell padding="checkbox" />}
              <TableCell className={"text-nowrap"}>Name</TableCell>
              <TableCell className={"text-nowrap"} align="right">
                Max Quantité
              </TableCell>
              <TableCell className={`text-nowrap`} align="right">
                Max Poids
              </TableCell>
              {props.inProgress ? null : (
                <TableCell
                  className={`${props.Decide ? "" : "text-nowrap"}`}
                  align="right"
                >
                  Prix €
                </TableCell>
              )}
              {props.LuggageState && (
                <TableCell
                  className={`${props.Decide ? "" : "text-nowrap"}`}
                  align="right"
                >
                  State
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {RowsToShow.map((row, index) => (
              <TableRow
                key={index}
                selected={
                  props.hasCheckbox &&
                  props.isCheckboxDisabled === false &&
                  isSelected(row)
                }
                id={`luggage-${row.id}`}
              >
                {props.hasCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        props.getCheckedValFromCol
                          ? row.accepted
                          : isSelected(row)
                      }
                      onClick={(event) => handleClick(event, row.id)}
                      inputProps={{
                        "aria-labelledby": `${props.title}-${index}`,
                      }}
                    />
                  </TableCell>
                )}
                <TableCell
                  className={"text-nowrap"}
                  id={`${props.title}-${index}`}
                >
                  {props.isNameEdited ? (
                    <TextField
                      id={`name-${props.title}-${index}`}
                      size={"small"}
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      InputLabelProps={{ shrink: false }}
                      className={`minInputWidth`}
                      InputProps={{
                        classes: { input: "py-2 customize-inputField" },
                      }}
                      name={"name"}
                      placeholder={"Name"}
                      defaultValue={row.name}
                      onChange={(event) => handleInputChange(event, row.id)}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell className={"text-nowrap"} align="right">
                  {props.isQuantityEdited ? (
                    <TextField
                      id={`quantity-${props.title}-${index}`}
                      size={"small"}
                      variant="outlined"
                      type={"number"}
                      inputProps={{ min: 0 }}
                      InputLabelProps={{ shrink: false }}
                      className={`minInputWidth`}
                      name={"max_quantity"}
                      disabled={row.accepted ? false : true}
                      InputProps={{
                        classes: { input: "py-2 customize-inputField" },
                      }}
                      disabled={row.accepted ? false : true}
                      placeholder={"Max. Quantity"}
                      defaultValue={row.max_quantity}
                      onChange={(event) => handleInputChange(event, row.id)}
                    />
                  ) : (
                    row.max_quantity
                  )}
                </TableCell>
                <TableCell className={`text-nowrap`} align="right">
                  {props.isWeightEdited ? (
                    <TextField
                      id={`weight-${props.title}-${index}`}
                      size={"small"}
                      variant="outlined"
                      type={"number"}
                      inputProps={{ min: 0 }}
                      InputLabelProps={{ shrink: false }}
                      className={`minInputWidth`}
                      name={"max_weight"}
                      InputProps={{
                        classes: { input: "py-2 customize-inputField" },
                      }}
                      disabled={row.accepted ? false : true}
                      placeholder={"Max. Weight"}
                      defaultValue={row.max_weight}
                      onChange={(event) => handleInputChange(event, row.id)}
                    />
                  ) : (
                    row.max_weight
                  )}
                </TableCell>

                {props.inProgress ? null : (
                  <TableCell
                    className={`${props.Decide ? "" : "text-nowrap"}`}
                    align="right"
                  >
                    {props.isPriceEdited || props.Decide ? (
                      <TextField
                        id={`price-${props.title}-${index}`}
                        size={"small"}
                        variant="outlined"
                        type={"number"}
                        inputProps={{ min: 0 }}
                        className={`minInputWidth ${props.Decide && "currentInputWidth"
                          }`}
                        InputLabelProps={{ shrink: false }}
                        name={"price"}
                        InputProps={{
                          classes: { input: "py-2 customize-inputField" },
                        }}
                        disabled={row.accepted ? false : true}
                        placeholder={"Prix"}
                        defaultValue={row.price}
                        onChange={(event) => handleInputChange(event, row.id)}
                      />
                    ) : row.state === "Rejected" ? (
                      <MdCancel className={"text-danger fs-6"} />
                    ) : (
                      `${row.price}$`
                    )}
                  </TableCell>
                )}
                {props.LuggageState && (
                  <TableCell
                    className={`${props.Decide ? "" : "text-nowrap"}`}
                    align="right"
                  >
                    {props.Decide ? (
                      <Box
                        component={"div"}
                        className={
                          "d-flex align-items-center justify-content-end"
                        }
                      >
                        <Button
                          className="me-1 text-success border-success customize-inputButton"
                          variant="outlined"
                          onClick={props.handleAcceptedLuggage}
                          size="small"
                        >
                          Accept
                        </Button>
                        <Button
                          className="ms-1 text-danger border-danger customize-inputButton"
                          variant="outlined"
                          onClick={props.handleRejectedLuggage}
                          size="small"
                        >
                          Refuser
                        </Button>
                      </Box>
                    ) : (
                      <React.Fragment>
                        {row.state}
                        {props.inProgress && (
                          <GoUnverified className={"text-primary ms-1 fs-6"} />
                        )}
                        {row.state === "Accepted" && (
                          <GoVerified className={"ms-1 text-success fs-6"} />
                        )}
                        {row.state === "Rejected" && (
                          <MdCancel className={"ms-1 text-danger fs-6"} />
                        )}
                      </React.Fragment>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {props.showTotal && (
              <React.Fragment>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className={`text-nowrap`}
                    align={"right"}
                  >
                    Total: {props.TotalPayment}€{" "}
                  </TableCell>
                  <TableCell align="right" className={`text-nowrap`}>
                    {props.PaymentStatus === "paid" && "Payé"}
                    {props.PaymentStatus === "paid" && (
                      <GoVerified className={"ms-1 text-success fs-6"} />
                    )}
                    {props.PaymentStatus === "pending" && (
                      <Typography
                        variant="subtitle1"
                        component="h6"
                        color="primary"
                        gutterBottom
                        className="fw-bold m-0"
                      >
                        Paiment en attente ..{" "}
                        <GoUnverified className={"ms-1 fs-6"} />
                      </Typography>
                    )}
                    {props.PaymentStatus === "payable" && (
                      <Button
                        className="mx-auto text-danger border-danger"
                        variant="outlined"
                        onClick={props.handlePayment}
                        size="small"
                      >
                        Payer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )}
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

export const LuggageTableExtendedHeader = ({
  TableRows,
  UniqueName,
  Payment,
  LuggageConfirmationInProgress = false,
  handlePayer,
  handleAcceptLuggage,
  handleDeclineLuggage,
  CurrentPaymentStatus,
  DecideFields = false,
}) => {
  LuggageTableExtendedHeader.propTypes = {
    CurrentPaymentStatus: PropTypes.oneOf(["payable", "paid", "pending"]),
    TableRows: PropTypes.object.isRequired,
    UniqueName: PropTypes.string.isRequired,
  };

  const [weight] = React.useState(
    TableRows.some((e) => e.hasOwnProperty("weight"))
  );

  return (
    <LuggageTable
      rows={TableRows}
      title={UniqueName}
      hasPagination={true}
      LuggageState={true}
      showTotal={
        LuggageConfirmationInProgress !== true && DecideFields !== true
      }
      inProgress={LuggageConfirmationInProgress}
      Decide={DecideFields}
      TotalPayment={Payment}
      PaymentStatus={CurrentPaymentStatus}
      handlePayment={handlePayer}
      hasWeight={weight}
      handleAcceptedLuggage={handleAcceptLuggage}
      handleRejectedLuggage={handleDeclineLuggage}
    />
  );
};

export default LuggageTable;
export { EnhancedTableToolbar };
