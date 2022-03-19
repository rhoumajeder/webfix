import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Paper, makeStyles, ButtonBase } from "@material-ui/core";

import TextTransition, { presets } from "react-text-transition";

import Header from "../../components/Header/Header";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { IoAirplane } from "react-icons/io5";
import TravelCard from "../../components/TravelCard/TravelCard";
import axiosInstance from "../../helpers/axios";
import Search from "../../components/Search/Search";

import NewFooter from "../../components/NewFooter/NewFooter";
import Newvideo from "../../components/NewVideo/Newvideo";
import Social from "../../components/Social/Social";
import NewFeedback from "../../components/NewFeedback/NewFeedback";
import AdvServiceSec from "../../components/Advantageservicesection/AdvServiceSec";

import ReactTextAnimation from "./ReactTextAnimation";

import "./index.css";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import { Link } from "react-router-dom";

import usePaginationHomePage from "../../hooks/usePaginationHomePage";

import CustomPagination from "../../components/Pagination/Pagination";

import Spinner from "../../components/Spinner/Spinner";
import { MdLiveTv } from "react-icons/md";

import moment from "moment";

const TEXTS = ["Forest", "Building", "Tree", "Color"];
import { FaSearch } from "react-icons/fa";


const PAGE_SIZE = 3;


const useStyles = makeStyles(theme => ({
  pageHeader: {
    height: 'unset',
    borderBottomLeftRadius: '10% 15% !important',
    borderBottomRightRadius: '10% 15% !important',
  }
}))

let first_load = true;


const Index = () => {
  const classes = useStyles()
  // State for tracking active record type
  const [recordType, setRecordType] = useState({
    propose: true,
    ask: true,
  });
  const texts = ["Colis", "Accessoires", "Documents"]; // Colis/Accessoires/ Documents
  const texts2 = ["Documents", "Accessoires","Colis"];
  const texts1 = ["d'avion", " de bateau"];

  // Record and loading state
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number_of_items, set_number_of_items] = useState(12);

  const [filters, setFilters] = useState({});

  // Fetch records from database
  const fetchRecords = (recordTypeCheck) => {
    const paramFilters = { ...filters };
    if (recordTypeCheck.propose && recordTypeCheck.ask) {
      delete paramFilters.type;
    } else if (recordTypeCheck.propose && !recordTypeCheck.ask) {
      paramFilters.type = "Propose";
    } else if (!recordTypeCheck.propose && recordTypeCheck.ask) {
      paramFilters.type = "Ask";
    }

    setFilters(paramFilters);

    axiosInstance
      .get("get-all-records/", {
        params: paramFilters,
      })
      .then((res) => {
        //console.log(res.data);
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  };

  const fetchRecords_for_button_search = (recordTypeCheck) => {  //it was only fetchRecords
    const paramFilters = { ...filters };
    if (recordTypeCheck.propose && recordTypeCheck.ask) {
      delete paramFilters.type;
    } else if (recordTypeCheck.propose && !recordTypeCheck.ask) {
      paramFilters.type = "Propose";
    } else if (!recordTypeCheck.propose && recordTypeCheck.ask) {
      paramFilters.type = "Ask";
    }

    setFilters(paramFilters);

    axiosInstance
      .get("search-all-records/", {
        params: paramFilters,
      })
      .then((res) => {
        first_load = false;
         
        //console.log(paramFilters);
        //console.log(res.data);
        setRecords(res.data.results);
        set_number_of_items(res.data.count);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));


  };

  const get_page = (recordTypeCheck, currentPage) => {  //it was only fetchRecords
    const paramFilters = { ...filters };
    if (recordTypeCheck.propose && recordTypeCheck.ask) {
      delete paramFilters.type;
    } else if (recordTypeCheck.propose && !recordTypeCheck.ask) {
      paramFilters.type = "Propose";
    } else if (!recordTypeCheck.propose && recordTypeCheck.ask) {
      paramFilters.type = "Ask";
    }
    axiosInstance
      .get("search-all-records/?page=" + currentPage, {
        params: paramFilters,

      })
      .then((res) => {

        //console.log(res.data);
        setRecords(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));


  };


  useEffect(() => {
    fetchRecords(recordType);
    // fetchRecords_for_button_search(recordType);
  }, []);

  const [index, setIndex] = useState(0);
  const [newText, setnewText] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => setIndex((index) => index + 1), 5000);
  //   return () => clearTimeout(intervalId);
  // }, []);

  // useEffect(() => {
  //   const newintervalId = setInterval(() => setnewText((newText) => newText + 1), 20000);
  //   return () => clearTimeout(newintervalId);
  // }, []);

  return (
    <Box component="div">
      <Header />

      <Box component={Paper} className={`page-header shadow pb-5 mb-5 ${classes.pageHeader}`}>
        <Box component={"div"}>
          <Typography
            variant="h3"
            gutterBottom
            className="text-center pt-2 fw-bold"
            sx={{ display: "flex" }}
          >
            Envoyez Vos&nbsp;
            <ReactTextAnimation texts={texts} time={2500} />
            {/* <TextTransition
              text={TEXTS[index % TEXTS.length]}
              springConfig={presets.wobbly}
            /> */}
            &nbsp;le plus vite possible.
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            className="text-center fw-bold"
            sx={{ display: "flex" }}
          >
            Economiser vos billets&nbsp;
            <ReactTextAnimation texts={texts1} time={3000}/> 
            {/* <TextTransition
              text={TEXTS[newText % TEXTS.length]}
              springConfig={presets.wobbly}
            /> */}
            &nbsp;en important des&nbsp;
            <ReactTextAnimation texts={texts2} time={2500}/> 
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className="text-center pt-2"
            variant="h5"
          >
            {" "}
            Trouvez la bonne affaire parmi Un vaste choix d'annonces{" "}
          </Typography>
        </Box>

        <Search
          // fetchRecords={fetchRecords} // fetchRecords_for_button_search
          fetchRecords_for_button_search={fetchRecords_for_button_search} // fetchRecords_for_button_search
          recordType={recordType}
          setRecordType={setRecordType}
          setLoading={setLoading}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <CardListing filters={filters} records={records} recordType={recordType} number_of_items={number_of_items} get_page={get_page} />
      )}

      <Social />
      <NewFeedback />
      <Newvideo />
      <AdvServiceSec />
      <NewFooter />
    </Box>
  );
};

const CardListing = (props) => {
  const [user, setUser] = useContext(AuthContext);

  // Pagination
  const { currentPage, getCurrentData, changePage, pageCount } = usePaginationHomePage(
    // first_load ? props.records:props.records.results,
    props.records,
    PAGE_SIZE,
    first_load,
    props.number_of_items,

  );




  const onPageChange = (event, value) => {
    first_load ? "1" : props.get_page(props.recordType, value);
    changePage(value);

  };

  const recordToShow = getCurrentData();

  return (
    <Container>
      <Card className="px-2 py-5 shadow mb-5">
        <CardContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} className="my-2">
              <Grid
                container
                direction="row"
                spacing={3}
              >
                <Grid
                  item
                  sm={6}
                  xs={12}
                  className="my-2 text-sm-start text-center"
                >
                  <Typography
                    variant="h6"
                    component="span"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0"
                  >
                    {props.filters.city_arrival &&
                      props.filters.city_destination ? (
                      <div>
                        {props.filters.city_arrival}{" "}
                        <IoAirplane className="mx-2" />{" "}
                        {props.filters.city_destination}
                      </div>
                    ) : (
                      "Annonces :"
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0 d-block"
                  >
                    {first_load ? props.records.length : props.number_of_items} Annonces
                  </Typography>

                  {props.records.length == 0 &&
                    <Link to="/record-creation" className="text-link">
                      Aucun Résultat, Mais Vous Pouvez créer votre propre annonce pour (Transporter ou envoyer un colis)
                    <Button
                      className="mx-2"
                      variant="contained"
                      color="secondary"
                      aria-label="menu"
                      // startIcon={<RiAdvertisementFill />}
                    >
                      Déposer une annonce
                    </Button>
                    </Link>
                      
                      
                      }


                </Grid>
              </Grid>
            </Grid>
            {/*To add more customer cards duplicate this grid... */}
            {
              recordToShow.map((row, index) => {
                const recordDateExpired = moment(row.date).isBefore(
                  new Date(),
                  "day"
                );

                return (<Grid item lg={8} md={10} xs={12} className="my-2" key={index}>
                  <TravelCard
                    disabled={recordDateExpired}
                    recordInputInfo={row.type === "Propose" ? true : false}
                    itemTable={row.type === "Propose" ? false : true}
                    typeRecord={row.type}
                    username={row.user.username}
                    user={row.user}
                    record={row}
                    hasAvatar={true}
                    hasShadow={true}
                    hasViewButton={true}
                    viewButton={
                      <Button
                        variant="contained"
                        style={{ marginTop: "10px" }}
                        // disabled={recordDateExpired}
                        {...(!recordDateExpired ? { color: 'primary' } : {})}
                      >
                        <Link
                          style={{
                            textDecoration: "inherit",
                            color: "inherit",
                          }}
                          
                           
                          to={
                            row.type === "Propose"
                              ? `record-details/${row.id}`
                              : `ask-record-details/${row.id}`
                          } 
                        >
                         Zoom
                        </Link>
                        
                      </Button> 
                    }
                  />
                </Grid>)
              }
              )}
            <Grid item lg={8} md={10} xs={12} className="my-2 text-center">
              <CustomPagination
                itemCount={props.records.count}
                itemsPerPage={PAGE_SIZE}
                onPageChange={onPageChange}
                currentPage={currentPage}
                pageCount={pageCount}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Index;
