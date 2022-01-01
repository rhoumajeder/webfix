import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';
import Spinner from "../../components/Spinner/Spinner";
import UserAvatar from "../UserAvatar/UserAvatar";
import TravelCard from "../TravelCard/TravelCard";
import PaginationExtended from "../PaginationExtended/PaginationExtended";
import ItemCard from "../ItemCard/ItemCard";

import axiosInstance from "../../helpers/axios";

import { Link } from "react-router-dom";

import { ScreenContext } from "../../helpers/context";

import objectInArray from "../../helpers/objectInArray";

import { AuthContext } from "../../context/auth";

import usePagination from "../../hooks/usePagination";
import CustomPagination from "../Pagination/Pagination";

import Propositions from "../Propositions/Propositions";

import { useParams } from "react-router";

import moment from "moment";

const PAGE_SIZE = 4;

const Toggler = ({children}) => {
  const [isVisiable, setVisiable] = useState(true)
  return children({
    isVisiable,
    setVisiable
  })
}


const ListItemCard = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const screen = React.useContext(ScreenContext);
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]);

  const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
    items,
    PAGE_SIZE
  );

  const onPageChange = (event, value) => changePage(value);


  const {
    currentPage: recordsCurrentPage,
    getCurrentData: getRecordsCurrentData,
    changePage: changeRecordsPage,
    pageCount: countRecordsPage
  } = usePagination(
    records,
    PAGE_SIZE
  );
  const [isloading, setisLoading] = useState(true);




  const recordsData = getRecordsCurrentData()

  // Fetch all records for user
  const fetchItems = () => {
    if (props.itemType === "offer") {

      axiosInstance.get("get-records-for-user/").then((res) => {
        console.log(res.data);
        setRecords(res.data);
        setisLoading(false);
        // alert(isloading);
        
      });
    } else {
      axiosInstance.get("get-requests/").then((res) => {
        console.log(res.data);
        setItems(res.data);
        setisLoading(false);
        // alert(isloading);
         
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const sloading = " Loading ... ";
  if (isloading) {
    return <Spinner name = {sloading}/>;
  }

  if (props.itemType === "offer") {
    
    return (
      <Card className="shadow">
        {records.length > 0 ? (
          recordsData.map((record) => {
            
            let disabled = false;
            const recordDateExpired = moment(record.date).isBefore(
              new Date(),
              "day"
            );

            if (recordDateExpired || record.disabled) {
              disabled = true;
            }

            return (
              <Card
                className={"shadow py-3 position-relative mt-4"}

              >
                <Toggler>
                  {({isVisiable, setVisiable}) => (
                    <CardContent className={"px-0"}>
                      <Box component={"div"} className={"my-2"}>
                        {record.type === "Propose" ? (
                          <TravelCard

                            recordInputInfo={true}
                            hasAvatar={true}
                            hasShadow={false}
                            username={record.user.username}
                            record={record}
                            user={record.user}
                          />
                        ) : (
                          <div>
                            <TravelCard
                              user={record.user}
                              itemTable={true}

                              hasAvatar={true}
                              hasShadow={false}
                              username={record.user.username}
                              record={record}
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
                                    to={`/ask-record-details/${record.id}`}
                                  >
                                    View
                                  </Link>
                                </Button>
                              }
                            />
                          </div>
                        )}

                        <Grid container direction="row" justify="space-between" className="border-top border-bottom py-2 my-2">
                          <Grid item>
                            <Typography
                              variant="subtitle1"
                              component="h6"
                              color="textSecondary"
                              className="fw-bold m-0 my-2 px-3"
                            >
                              {record.propositions.length}{" "}
                              {props.itemType === "offer"
                                ? "Offers Disponibles"
                                : "Requests Disponibles"}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <ButtonBase onClick={() => setVisiable(!isVisiable)}>
                              <Typography
                                variant="subtitle1"
                                component="h6"
                                className="fw-bold m-0 my-2 px-3 text-decoration-underline text-primary"
                              >
                                {isVisiable ? "Hide" : "Show"}
                              </Typography>
                            </ButtonBase>
                          </Grid>
                        </Grid>
                      </Box>

                      {isVisiable && (
                        <Propositions
                          askProposition={record.type === "Propose" ? false : true}
                          propositions={record.propositions}
                          itemType={"offer"}
                          fetchItems={fetchItems}
                          disabled={disabled}
                        />
                      )}
                    </CardContent>
                  )}
                </Toggler>
              </Card>
            );
          })
        ) : (
          <Card
            className={"shadow py-3 position-relative"}
            style={{
              marginTop: "20px",
            }}
          >
            <CardContent className="text-center">
              <Typography variant="h6">
                You have not created any records yet
              </Typography>
            </CardContent>
          </Card>
        )}
        <Box className="border-top mt-5 py-3">
          <CustomPagination
            itemCount={records.length}
            itemsPerPage={PAGE_SIZE}
            onPageChange={(e, value) => changeRecordsPage(value)}
            currentPage={recordsCurrentPage}
            pageCount={countRecordsPage}
          />
        </Box>
      </Card>
    );
  } else {
    return (
      <div>
        {getCurrentData().length > 0 ? (
          getCurrentData().map((item) => { 
            let disabled = false;
            const recordDateExpired = moment(item.record.date).isBefore(
              new Date(),
              "day"
            );

            if (recordDateExpired || item.record.disabled) {
              disabled = true;
            }

            return (
              <Card
                className={"shadow py-3 position-relative"}
                style={{
                  marginTop: "20px",
                  backgroundColor: disabled ? "#f9f9f9" : "inherit",
                }}
              >
                <CardContent className={"px-0"}>
                  <TravelCard
                    disabled={disabled}
                    recordInputInfo={
                      item.record.type === "Propose" ? true : false
                    }
                    itemTable={item.record.type === "Propose" ? false : true}
                    record={item.record}
                    hasAvatar={true}
                    hasShadow={false}
                    username={item.record.user.username}
                    user={item.record.user}
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
                          to={{
                            pathname: `/my-request-state/${item.id}`,
                            state: {
                              askRecord:
                                item.record.type === "Ask" ? true : false,
                            },
                          }}
                        >
                          View
                        </Link>
                      </Button>
                    }
                    hasTable={
                      <ItemCard
                        disabled={disabled}
                        askProposition={
                          item.record.type === "Propose" ? false : true
                        }
                        item={item}
                        showTotal={
                          objectInArray(
                            item.proposition_items,
                            "state",
                            "Undefined"
                          )
                            ? false
                            : true
                        }
                        fetchItems={fetchItems}
                        itemType={props.itemType}
                      />
                    }
                  />
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card
            className={"shadow py-3 position-relative"}
            style={{
              marginTop: "20px",
            }}
          >
            <CardContent className="text-center">
              <Typography variant="h6">
                You have not made any requests yet
              </Typography>
            </CardContent>
          </Card>
        )}
        <div style={{ marginTop: "20px" }}>
          <CustomPagination
            itemCount={items.length}
            itemsPerPage={PAGE_SIZE}
            onPageChange={onPageChange}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        </div>
      </div>
    );
  }
};

export default ListItemCard;
