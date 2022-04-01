import React, { useState } from "react";

import {
  TableCell,
  TableRow,
  IconButton,
  Paper,
  Grid,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import "./Avatarupload.css";

import uploadPlaceholder from "../../assets/images/upload-placeholder.png";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useToasts } from "react-toast-notifications";

import findWithAttr from "../../helpers/findAttr";

import Resizer from "react-image-file-resizer";
import Button from "@material-ui/core/Button";
 



const Avatarupload = (props) => {
  const { addToast } = useToasts();
  const [files, setFiles] = useState([1]);

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1024,
      768,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });


  // Function called when user selects one or multiple files
  const selectFile = async (e) => {
    
   

    const newFiles = [...files];

      let fileSize = e.target.files[0].size;
      fileSize = Math.round(fileSize / 1024);

      if (fileSize > 10000) {
        addToast("Max image volume 10mb,compresser vos images https://imagecompressor.com/ ", {
          appearance: "error",
        });
        return;
      }

   

        try {
        const file_c = e.target.files[0];
        const image_c = await resizeFile(file_c);
        if (typeof newFiles[0] === "number") {
          newFiles[0] = {
            file: image_c,
            preview: URL.createObjectURL(e.target.files[0]), 
          };
         
        }
        } catch (err) {
          
        }


  
    
   

    setFiles(newFiles);
    
  };

  // Delete a selected file
  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles[index] = index;
    setFiles(newFiles);

 
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <input
          onChange={selectFile }
          accept="image/*"
          style={{ display: "none" }}
          id={props.id}
          type="file"
          multiple
        />
        <label htmlFor={props.id}>
          <Button
            className="mx-2"
            variant="contained"
            color="secondary" 
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera /> Ajouter une photo de profile
          </Button>
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

export default Avatarupload;
