import React from "react";
import {
  Table,
  Box,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Card,
  CardContent,
  Paper,
  Button,
} from "@material-ui/core";
import uuid from "react-uuid";
import CreateItemRow from "./CreateItemRow/CreateItemRow";
import { useToasts } from "react-toast-notifications";

const CreateItemTable = (props) => {
  const { addToast } = useToasts();

  const addRow = () => {
    if (props.rows.length > 14) {
      addToast("You can not add more than 15 items", { appearance: "error" });
      return;
    }

    props.setRows((prevState) => {
      const newTableData = [...prevState];
      newTableData.push({
        id: `row-${uuid()}`,
        name: "",
        quantity: 0,
        weight: 0,
        files: [],
        type: "added",
      });
      return newTableData;
    });
  };

  function getButton() {
    if (props.isloading) {
      return (
        <Button
        color="primary"
        variant={"contained"}
      >
        Uploading...
      </Button>
      
      );
    }
    else {
      return (<Button
        onClick={props.submitItems}
        color="primary"
        variant={"contained"}
      >
        Save changes 
      </Button>);
    }
  }

  return (
    <React.Fragment>
      <Box component={"div"} className={"my-3"}>
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={"text-nowrap"} align="left">
                  Objet
                </TableCell>
                <TableCell className={"text-nowrap"} align="left">
                  Quantité
                </TableCell>
                <TableCell className={"text-nowrap"} align="left">
                  Poids(kg)
                </TableCell>
                <TableCell className={"text-nowrap"} align="left">
                  Prix €
                </TableCell>
                <TableCell
                  className={"text-nowrap"}
                  align="left"
                  padding={"checkbox"}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row, index) => {
                if (row.type === "added") {
                  return (
                    <CreateItemRow
                      key={row.id}
                      row={row}
                      index={row.id}
                      currentLength={props.rows.length}
                      setRows={props.setRows}
                      priceRequired={props.priceRequired}
                    />
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        component={"div"}
        className={"d-flex flex-column align-items-end justify-content-end"}
      >
        <Button
          color="primary"
          variant={"contained"}
          className={"my-3 float-end"}
          onClick={addRow}
        >
          Ajouter un Objet

        </Button>
        <Box
        component={"div"}
        className={""}
      >
        {getButton}

       
      </Box>
       

      </Box>
     
    </React.Fragment>
  );
};

export default CreateItemTable;
