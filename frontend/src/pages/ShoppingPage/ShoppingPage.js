import React, { useState } from "react";

import {
  Grid,
  Typography,
  IconButton,
  Button,
  FormControl,
  Box,
  Container,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItem,
  Paper,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import Header from "../../components/Header/Header";

import {
  LeakAddTwoTone,
  Search,
  ShoppingBasket,
  Stars,
} from "@material-ui/icons";

import usePagination from "../../hooks/usePagination";
import CustomPagination from "../../components/Pagination/Pagination";

import amazonPic from "../../assets/images/amazon.png";
import ebayPic from "../../assets/images/ebay.png";
import cdiscountPic from "../../assets/images/cdiscount.png";
import bosePic from "../../assets/images/bose.jpg";
import ramPic from "../../assets/images/ram.jpg";

import "./index.css";
import HelpButton from "../../components/HelpButton/HelpButton";

const PAGE_SIZE = 2;

const ShoppingPage = () => {
  const [selected, setSelected] = useState("amazon");

  const changeSelectedImage = (select) => {
    setSelected(select);
  };

  const products = [
    {
      title:
        "Bose QuietComfort Earbuds - Audífonos inalámbricos, reducción de ruido, Negro",
      img: bosePic,
      price: "$799",
      provider: "amazon",
    },
    {
      title: "16GB 2 X 8GB DDR3 1333 Reg Memoria RAM para DELL PRECISION",
      img: ramPic,
      price: "$499",
      provider: "ebay",
    },
  ];

  const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
    products,
    PAGE_SIZE
  );

  const onPageChange = (event, value) => changePage(value);

  return (
    <React.Fragment>
      <Header />
      <HelpButton />
      <Container maxWidth="md" className="mt-5 mb-5">
        <Box>
          <Grid container spacing={6}>
            <Grid item xs={3}>
              <Paper>
                <List>
                  <ListItem
                    button
                    onClick={() => changeSelectedImage("amazon")}
                    selected={selected === "amazon"}
                  >
                    <img src={amazonPic} alt="amazon" className="side-img" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => changeSelectedImage("ebay")}
                    selected={selected === "ebay"}
                  >
                    <img src={ebayPic} alt="ebay" className="side-img" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => changeSelectedImage("cdiscount")}
                    selected={selected === "cdiscount"}
                  >
                    <img
                      src={cdiscountPic}
                      alt="cdiscount"
                      className="side-img"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={8}>
              <TextField
                placeholder="Search..."
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <div className="text-center">
                <Button
                  color="primary"
                  className="mt-2 mb-4"
                  variant="outlined"
                >
                  Search
                </Button>
              </div>
              <Grid container spacing={2}>
                {getCurrentData().map((product) => {
                  let providerImage = "";

                  if (product.provider === "amazon") {
                    providerImage = (
                      <img src={amazonPic} className="provider-img" />
                    );
                  } else if (product.provider === "ebay") {
                    providerImage = (
                      <img src={ebayPic} className="provider-img" />
                    );
                  } else {
                    providerImage = (
                      <img src={cdiscountPic} className="provider-img" />
                    );
                  }

                  return (
                    <Grid item xs={6}>
                      <Card style={{ minHeight: "100%" }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.img}
                          alt="amazon"
                        />
                        <CardContent>
                          <Typography variant="h6">{product.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.price}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton>
                            <ShoppingBasket color="primary" />
                          </IconButton>
                          <IconButton>
                            <Stars color="secondary" />
                          </IconButton>
                          <div className="ms-auto">{providerImage}</div>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              <div className="mt-4">
                <CustomPagination
                  itemCount={products.length}
                  itemsPerPage={PAGE_SIZE}
                  onPageChange={onPageChange}
                  currentPage={currentPage}
                  pageCount={pageCount}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ShoppingPage;
