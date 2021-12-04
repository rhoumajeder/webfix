import React, { useState } from "react";

import {
  TableCell,
  TableRow,
  IconButton,
  Paper,
  Grid,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import "./FileUpload.css";

import uploadPlaceholder from "../../assets/images/upload-placeholder.png";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useToasts } from "react-toast-notifications";

import findWithAttr from "../../helpers/findAttr";





const FileUpload = (props) => {
  const { addToast } = useToasts();
  const [files, setFiles] = useState([1, 2, 3]);

  // Function called when user selects one or multiple files
  const selectFile = (e) => {
    if (e.target.files.length > 3) {
      addToast("You can not add more than 3 images per item", {
        appearance: "error",
      });
      return;
    }

    const newFiles = [...files];

    for (let i = 0; i < e.target.files.length; i++) {
      console.log(i);

      let fileSize = e.target.files[i].size;
      fileSize = Math.round(fileSize / 1024);

      if (fileSize > 5000) {
        addToast("Max file size is 5mb", {
          appearance: "error",
        });
        return;
      }

      for (let j = 0; j < newFiles.length; j++) {
        if (typeof newFiles[j] === "number") {
          newFiles[j] = {
            file: e.target.files[i],
            preview: URL.createObjectURL(e.target.files[i]),
          };
          break;
        }
      }
    }

    setFiles(newFiles);

    props.setDynamicRows((prevState) => {
      console.log(prevState);
      const newTableData = [...prevState];
      const rowFiles = [];

      newFiles.forEach((file) => {
        if (typeof file !== "number") {
          rowFiles.push(file.file);
        }
      });

      const rowIndex = findWithAttr(newTableData, "id", props.rowId);

      newTableData[rowIndex].files = rowFiles;
      return newTableData;
    });
  };

  // Delete a selected file
  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles[index] = index;
    setFiles(newFiles);

    props.setDynamicRows((prevState) => {
      console.log(prevState);
      const newTableData = [...prevState];

      const rowIndex = findWithAttr(newTableData, "id", props.rowId);

      newTableData[rowIndex].files.splice(index, 1);
      return newTableData;
    });
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <input
          onChange={selectFile}
          accept="image/*"
          style={{ display: "none" }}
          id={props.id}
          type="file"
          multiple
        />
        <label htmlFor={props.id}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
          <p>Select up to 3 images for your item</p>
        </label>
      </Grid>
      {files.map((file, index) => {
        if (typeof file === "number") {
          return (
            <Grid item item xs={3}>
              <Paper variant="outlined">
                <img className="item-image" src={uploadPlaceholder} />
              </Paper>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={3}>
              <Paper variant="outlined" style={{ position: "relative" }}>
                <HighlightOffIcon
                  onClick={() => deleteFile(index)}
                  color="error"
                  style={{ position: "absolute", left: "70%", top: "10px" }}
                />
                <img className="item-image" src={file.preview} />
              </Paper>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default FileUpload;
