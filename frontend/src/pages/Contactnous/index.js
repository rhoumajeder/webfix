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


function index() {
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
                Let's connect
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  alignItems: "left",
                }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document or
                a typeface without relying on meaningful content. Lorem ipsum may
                be used as a placeholder before final copy is available.
              </Typography>
              <Grid container sx={{ mb: 2 }}>
                <MailOutlineIcon sx={{ mr: 1 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  Info@gmail.com
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
                Send us a message
              </Typography>
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>First & Last Name</InputLabel>
                <TextField
                  name="name"
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel shrink>Email address</InputLabel>
                  <TextField
                    name="email"
                    fullWidth
                    size="small"
                    id="email"
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel shrink>Phone Number</InputLabel>
                  <TextField
                    name="phone"
                    fullWidth
                    size="small"
                    id="phone"
                    sx={{ backgroundColor: "white" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>Object</InputLabel>
                <TextField
                  name="object"
                  fullWidth
                  id="object"
                  size="small"
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 2 }}>
                <InputLabel shrink>Message</InputLabel>
                <TextField
                  name="message"
                  fullWidth
                  size="small"
                  id="message"
                  multiline
                  rows={3}
                  placeholder="Write message here"
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid sx={{ my: 4 }}>
                <Button variant="contained">Contact Us Now!</Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NewFooter />
    </div>
  );
}

export default index;
