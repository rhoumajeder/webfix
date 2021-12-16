import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Box, CardActionArea, Typography } from "@material-ui/core";
import PaginationExtended from "../PaginationExtended/PaginationExtended";
import { CgShapeCircle } from "react-icons/cg";

import {
  ModeOfTransportationContext,
  ScreenContext,
} from "../../helpers/context";
import LuggageCheck from "../LuggageCheck/LuggageCheck";
import UserAvatar from "../UserAvatar/UserAvatar";

import moment from "moment";
import "./TravelCard.css";

import ItemCard from "../ItemCard/ItemCard";
import objectSum from "../../helpers/objectSum";

const getMinPrice = (record) => {

  let minPrice = 0;
  let prices = [];
  console.log(record)

  try {

    record.forEach(elem => {
      if (Object.prototype.hasOwnProperty.call(myObj, 'items')) {
        elem.items.forEach(
          el => {
            prices.push(el.price)
          }
        )

      } else {
        record.forEach(elem => {
          prices.push(elem.price)
        })
      }


    })
    return Math.min(...prices);



  } catch (err) {

    console.log(err);

  }
}


const TravelCard = (props) => {
  const { record } = props;
  const screen = React.useContext(ScreenContext);
  const modes = React.useContext(ModeOfTransportationContext);
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  const allCategories = [
    "Food",
    "Medicaments",
    "Small Electronics",
    "Small Accessories",
    "Vetements",
    "Big Mechanical",
    "Big Electronics",
    "Autres",
  ];

  return (
    <Card
      className={`${props.hasShadow ? "shadow" : "shadow-none"}`}
      style={{ backgroundColor: props.disabled && (props.typeRecord === 'Propose') ? "#f9f9f9" : "white" }}
    >
      <ConditionalWrapper
        wrapper={(children) => <CardActionArea>{children}</CardActionArea>}
      >
        <CardContent className={"py-3 position-relative"}>
          <Grid container direction="row" spacing={2}>
            {props.hasAvatar && (
              <Grid
                item
                sm={"auto"}
                xs={12}
                className="my-2 text-center px-lg-4 px-md-4 px-sm-4 user-info"
              >
                <UserAvatar
                  hasRating={true}
                  name={props.username}
                  user={props.user}
                />
              </Grid>
            )}

            <Grid
              item
              sm
              xs={12}
              className={`my-2 ms-lg-2 ms-md-2 ms-sm-2 ${screen.width <= 480 ? "mt-5" : ""
                }`}
            >
              <Grid
                container
                direction="row"
                spacing={2}
                item
                sm={"auto"}
                xs={12}
              >
                <Grid item sm={"auto"} xs={12}>
                  <Box component="div">
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      gutterBottom
                      className="fw-bold m-0 pb-1 border-bottom border-2 text-dark"
                    >
                      {record &&
                        moment(record.date).format("dddd DD MMMM YYYY")}
                      {record &&
                        modes &&
                        record.moyen_de_transport &&
                        modes[record.moyen_de_transport]}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {props.recordInputInfo ? (
                <Box
                  component="div"
                  className={"user-luggage-info position-absolute"}
                >
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0"
                  >
                    {" "}
                    Min price:{" "}
                    {console.log(record)}
                    {record.sub_records.length > 0 &&
                      getMinPrice(record.sub_records) + "€"}{" "}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0"
                  >
                    {" "}
                    Max weight: {record && record.max_weight + "Kg"}{" "}
                  </Typography>
                </Box>
              ) : (
                <Box
                  component="div"
                  className={"user-luggage-info position-absolute"}
                >
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0"
                  >
                    {" "}
                    Total price:{" "}
                    {record && objectSum(record.ask_items, "price") + "€"}{" "}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                    className="fw-bold m-0"
                  >
                    {" "}
                    Total weight:{" "}
                    {record &&
                      objectSum(record.ask_items, "weight") + "Kg"}{" "}
                  </Typography>
                </Box>
              )}

              <Grid
                container
                direction="row"
                spacing={2}
                item
                sm={"auto"}
                xs={12}
              >
                <Grid item sm={"auto"} xs={12}>
                  <Box
                    component="div"
                    className={"border-bottom border-2 pb-2"}
                  >
                    <TravelInformation
                      location={record && record.city_arrival}
                      departure={true}
                    />
                    <TravelInformation
                      location={record && record.city_destination}
                      destination={true}
                    />
                  </Box>
                </Grid>
              </Grid>

              {record.type === "Propose" && (
                <Box component={"div"} className={"mt-2"}>
                  <Grid container direction="row" spacing={2}>
                    {record &&
                      record.categories &&
                      allCategories.map((value, index) => (
                        <Grid item xs={"auto"} className={"pb-0"} key={index}>
                          <LuggageCheck
                            check={record.categories.includes(value)}
                            text={value}
                            className={"fw-medium"}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              )}

              {props.itemTable && (
                <Box className="mt-3">
                  <Grid container direction="row" spacing={2}>
                    <ItemCard
                      onlyDisplay={true}
                      item={record}
                      disabled={props.disabled}
                      noShadow={true}
                    />
                  </Grid>
                </Box>
              )}
              <div className="my-2">
                {props.hasViewButton && props.viewButton}
              </div>
            </Grid>
          </Grid>
          {props.hasTable && (
            <Box
              component={"div"}
              className={`my-2 border-top ${!props.TableHeader && "pt-4"}`}
            >
              {props.TableHeader && props.TableHeader}
              {props.hasTable}
            </Box>
          )}
        </CardContent>
      </ConditionalWrapper>
    </Card>
  );
};

export const TravelInformation = (props) => {
  return (
    <Box className="mt-1">
      <Box className="d-flex align-items-center">
        {props.departure && <CgShapeCircle className="text-success" />}
        {props.destination && <CgShapeCircle className="text-danger" />}
        <Typography
          variant="subtitle2"
          component="span"
          color="textSecondary"
          gutterBottom
          className="fw-bold m-0 ms-2"
        >
          {props.location}
        </Typography>
      </Box>
    </Box>
  );
};

const TravelCardExtendedTables = ({ luggageTables }) => {
  const screen = React.useContext(ScreenContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage] = React.useState(3);

  const indexOfLastPage = currentPage * cardsPerPage;
  const indexOfFirstPage = indexOfLastPage - cardsPerPage;
  const currentCards = luggageTables.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className={"shadow py-3 position-relative"}>
      <CardContent className={"px-0"}>
        <Box component={"div"} className={"my-2"}>
          <TravelCard hasAvatar={true} hasShadow={false} />
          <Box
            component={"div"}
            className={"border-top border-bottom py-2 my-2"}
          >
            <Typography
              variant="subtitle1"
              component="h6"
              color="textSecondary"
              gutterBottom
              className="fw-bold m-0 my-2 px-3"
            >
              {luggageTables.length} Offers Disponible
            </Typography>
          </Box>
        </Box>
        {currentCards.map((data, index) => (
          <Grid container direction="row">
            <Grid
              item
              sm={"auto"}
              xs={12}
              className="my-2 text-center px-lg-4 px-md-4 px-sm-4"
            >
              <UserAvatar hasRating={true} />
            </Grid>
            <Grid
              item
              sm
              xs={12}
              className={`my-2 ms-lg-2 ms-md-2 ms-sm-2 ${screen.width <= 480 ? "mt-5" : ""
                }`}
            >
              <Box component={"div"} key={index} className={"px-1"}>
                {data}
              </Box>
            </Grid>
          </Grid>
        ))}

        <PaginationExtended
          recordsPerPage={cardsPerPage}
          totalRecords={luggageTables.length}
          paginate={paginate}
          currentPage={currentPage}
          shape={"rounded"}
          className={"justify-content-center"}
        />
      </CardContent>
    </Card>
  );
};

export default TravelCard;
export { TravelCardExtendedTables };
