import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "@material-ui/core";
import Header from "../../components/Header/Header";
import NewFooter from "../../components/NewFooter/NewFooter";
import axiosInstance from "../../helpers/axios";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router";
 

function index() {
  let history = useHistory();
  const { addToast } = useToasts();
  const submitHandler = (e) => {
    console.log("function call");
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })

    console.log("data :", data);

    axiosInstance
    .post("contactus/", formData)
    .then((res) => {
      console.log("function call sucess");
      console.log(res.data);
      addToast("Message envoyé.", { appearance: "success" }); 
      history.push(`/home`);
      history.go();  
      
    })
    .catch((err) => {
      console.log("function call wrong");
      console.log("err",err);
      console.log("err.response",err.response);
      addToast('Bad Request.', { appearance: "error" });
    });
    console.log("function call end");
  }






  return (
    <div>
      <Header />
      <Box
        sx={{
          my: 5,
          mx: 12,
        }}
      >
        <Grid
          container
          component="main"
          component={Paper}
          elevation={8}
          sx={{ height: 600 }}
        >
          <Grid item xs={false} sm={8} md={5}>
            <Box
              sx={{
                my: 15,
                mx: 8,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  alignItems: "left",
                }}
                component="h2"
                variant="h7"
              >
                Contactez‑nous
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  alignItems: "left",
                }}
              >
               N'hésitez pas à nous contacter pour tout renseignement complémentaire
              </Typography>
              <Grid container sx={{ mb: 2 }}>
                <MailOutlineIcon sx={{ mr: 1 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  ****@gmail.com
                </Typography>
              </Grid>
              <Grid container>
                <Link href="#">
                  <FacebookIcon
                    sx={{ color: "darkblue", mr: 3 }}
                    fontSize="large"
                  ></FacebookIcon>
                </Link>
                <Link href="#">
                  <TwitterIcon
                    sx={{ color: "skyblue", mr: 3 }}
                    fontSize="large"
                  ></TwitterIcon>
                </Link>
                <Link href="#">
                  <InstagramIcon
                    sx={{ color: "magenta", mr: 3 }}
                    fontSize="large"
                  ></InstagramIcon>
                </Link>
                <Link href="#">
                  <YouTubeIcon
                    sx={{ color: "red", mr: 3 }}
                    fontSize="large"
                  ></YouTubeIcon>
                </Link>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={7}
            sx={{ backgroundColor: "#EEF1F6", height: 600 }}
          >
            <Box
              sx={{
                my: 8,
                mx: 14,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  mb: 4,
                  alignItems: "left",
                }}
                component="h2"
                variant="h7"
              >
                Contactez‑nous
              </Typography>
              <form onSubmit={submitHandler}>

              
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>Nom & Prénom</InputLabel>
                <TextField
                  name="name"
                  required
                  fullWidth
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel shrink>Adresse Email</InputLabel>
                  <TextField
                    required
                    name="email"
                    fullWidth
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    id="email"
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel shrink>Numéro de téléphone</InputLabel>
                  <TextField
                    name="phone_number"
                    fullWidth
                    size="small"
                    inputProps={{ maxLength: 23 }}
                    id="phone"
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>Objet</InputLabel>
                <TextField
                  required
                  name="objet"
                  fullWidth
                  id="object"
                  inputProps={{ maxLength: 100 }}
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>Message</InputLabel>
                <TextField
                  required
                  name="message"
                  fullWidth
                  size="small"
                  id="message"
                  inputProps={{ maxLength: 500 }}
                  multiline
                  rows={6}
                  placeholder="Write message here"
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid sx={{ my: 4 }}>
                <Button type="submit" variant="contained">Contactez‑nous!</Button> 
              </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NewFooter />
    </div>
  );
}

export default index;
