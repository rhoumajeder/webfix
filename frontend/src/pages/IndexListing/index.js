import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Paper } from "@material-ui/core";

import Header from "../../components/Header/Header";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { IoAirplane } from "react-icons/io5";
import TravelCard from "../../components/TravelCard/TravelCard";
import axiosInstance from "../../helpers/axios";
import Search from "../../components/Search/Search";

import "./index.css";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import { Link } from "react-router-dom";

import usePagination from "../../hooks/usePagination";

import CustomPagination from "../../components/Pagination/Pagination";

import Spinner from "../../components/Spinner/Spinner";
import { MdLiveTv } from "react-icons/md";

const PAGE_SIZE = 3;

const Index = () => {
  // State for tracking active record type
  const [recordType, setRecordType] = useState({
    propose: true,
    ask: true,
  });

  // Record and loading state
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(res.data);
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchRecords(recordType);
  }, []);

  return (
    <Box component="div">
      <Header />

      <Box component={Paper} className="page-header shadow">
        <Box component={"div"}>
          <Typography
            variant="h5"
            gutterBottom
            className="text-center pt-5 fw-bold"
          >
            {" "}
            Choisissez le records qui vous plaît{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className="text-center pt-2"
          >
            {" "}
            Trouvez la bonne affaire parmi les millions de petites annonces
            leboncoin{" "}
          </Typography>
        </Box>

        <Search
          fetchRecords={fetchRecords}
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
        <CardListing filters={filters} records={records} />
      )}
    </Box>
  );
};

const CardListing = (props) => {
  const [user, setUser] = useContext(AuthContext);

  // Pagination
  const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
    props.records,
    PAGE_SIZE
  );

  const onPageChange = (event, value) => changePage(value);

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
                justify="left"
                alignItems="left"
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
                      "All Cities"
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0 d-block"
                  >
                    {props.records.length} Records disponibles
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/*To add more customer cards duplicate this grid... */}
            {recordToShow.map((row, index) => (
              <Grid item lg={8} md={10} xs={12} className="my-2" key={index}>
                <TravelCard
                  recordInputInfo={row.type === "Propose" ? true : false}
                  itemTable={row.type === "Propose" ? false : true}
                  username={row.user.username}
                  user={row.user}
                  record={row}
                  hasAvatar={true}
                  hasShadow={true}
                  hasViewButton={true}
                  viewButton={
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "10px" }}
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
                        View
                      </Link>
                    </Button>
                  }
                />
              </Grid>
            ))}
            <Grid item lg={8} md={10} xs={12} className="my-2 text-center">
              <CustomPagination
                itemCount={props.records.length}
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
