import React from "react";

import { Grid, Button, Box } from "@material-ui/core";
import UserAvatar from "../UserAvatar/UserAvatar";

import ItemCard from "../ItemCard/ItemCard";
import objectInArray from "../../helpers/objectInArray";

import usePagination from "../../hooks/usePagination";
import CustomPagination from "../Pagination/Pagination";

import { Link } from "react-router-dom";

const PAGE_SIZE = 4;

const Propositions = (props) => {
  const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
    props.propositions,
    PAGE_SIZE
  );

  const onPageChange = (event, value) => changePage(value);

  return (
    <div>
      {getCurrentData().map((item) => {
        return (
          <Box className={"border-bottom py-2 my-2"}>
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={3}>
                <div className="text-center">
                  <UserAvatar
                    hasRating={true}
                    name={
                      props.itemType === "offer"
                        ? item.user.username
                        : item.record.created_by.username
                    }
                    user={
                      props.itemType === "offer"
                        ? item.user
                        : item.record.created_by
                    }
                  />
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
                        pathname: `/my-offer-state/${item.id}`,
                        state: {
                          askRecord: props.askProposition ? true : false,
                        },
                      }}
                    >
                      View
                    </Link>
                  </Button>
                </div>
              </Grid>

              <Grid item xs={9}>
                <ItemCard
                  item={item}
                  disabled={props.disabled}
                  askProposition={props.askProposition ? true : false}
                  showTotal={
                    objectInArray(item.proposition_items, "state", "Undefined")
                      ? false
                      : true
                  }
                  fetchItems={props.fetchItems}
                  itemType={props.itemType}
                />
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <CustomPagination
          itemCount={props.propositions.length}
          itemsPerPage={PAGE_SIZE}
          onPageChange={onPageChange}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default Propositions;
