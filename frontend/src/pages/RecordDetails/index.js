import React, { useEffect, useState, useContext } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import TravelCard from "../../components/TravelCard/TravelCard";
import { ScreenContext } from "../../helpers/context";
import LuggageCheck from "../../components/LuggageCheck/LuggageCheck";
import Header from "../../components/Header/Header";
import Feedback from "../../components/Feedback/Feedback";
import { IoArrowBack } from "react-icons/io5";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import ItemTable from "../../components/ItemTable/ItemTable";

import objectInArray from "../../helpers/objectInArray";

import "./index.css";
import axiosInstance from "../../helpers/axios";
import { fileAxios } from "../../helpers/axios";

import uuid from "react-uuid";
import FormData from "form-data";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router";

import CreateItemTable from "../../components/CreateItemTable/CreateItemTable";

import RecordDetailsSideBar from "../../components/RecordDetailsSideBar/RecordDetailsSideBar";

import * as yup from "yup";

import Spinner from "../../components/Spinner/Spinner";

import { AuthContext } from "../../context/auth";

const Index = ({ match }) => {
  const [user, setUser] = useContext(AuthContext)
  const { addToast } = useToasts();
  let history = useHistory();
  const [record, setRecord] = useState({ created_by: null });
  const [categories, setCategories] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const screen = React.useContext(ScreenContext);

  useEffect(() => {
    axiosInstance
      .get(`get-record/${match.params.id}/`)
      .then((res) => {
        const group = {};
        res.data.sub_records.forEach(({ category, ...rest }) => {
          group[category] = group[category] || { category, items: [] };
          group[category].items.push({
            id: rest.id,
            name: rest.name,
            max_quantity: rest.max_quantity,
            max_weight: rest.max_weight,
            price: rest.price,
            accepted: rest.accepted,
          });
        });

        res.data.sub_records = Object.values(group);
        setRecord(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleCategories = () => {
    setCategories(!categories);
  };

  const openInteractionTable = () => {
    setDynamicRows((prevState) => {
      const newTableData = [...prevState];
      console.log(newTableData);

      if (
        !objectInArray(newTableData, "type", "added") &&
        categories === false
      ) {
        newTableData.push({
          id: `row-${uuid()}`,
          name: "",
          quantity: 0,
          weight: 0,
          files: [],
          type: "added",
        });
      }
      return newTableData;
    });
    setCategories(!categories);
  };

  let itemSchema = yup.array().of(
    yup.object().shape({
      name: yup.string().required("Item name is required"),
      quantity: yup
        .number()
        .required("Please add a quantity for the items")
        .positive("Quantity for items must be positive"),
      weight: yup
        .number()
        .required("Please add a weight for the items")
        .positive("Weight for items must be positive")
        .integer(),
    })
  );

  const submitItems = () => {
    const itemData = [...dynamicRows];
    const itemFiles = [];

    itemData.forEach((item) => {
      delete item.id;
      itemFiles.push(item.files);
      delete item.files;
    });

    itemSchema
      .validate(itemData)
      .then((valid) => {
        if (valid) {
          axiosInstance
            .post(`create-proposition/${record.id}/`, {})
            .then((res) => {
              if (res.data.id) {
                const propositionId = res.data.id;
                axiosInstance
                  .post(`create-proposition-items/${propositionId}/`, itemData)
                  .then((res) => {
                    itemFiles.forEach((fileArr, index) => {
                      fileArr.forEach((file) => {
                        let data = new FormData();
                        data.append("image", file);

                        fileAxios
                          .post(
                            `create-item-images/${res.data[index].id}/`,
                            data
                          )
                          .then((res) => {
                            console.log(res.data);
                          })
                          .catch((err) => {
                            console.log(err.response);
                          });
                      });
                    });
                    addToast("Proposition created", { appearance: "success" });
                    history.push({
                      pathname: `/my-request-state/${propositionId}`,
                      state: {
                        askRecord: false,
                      },
                    });
                    history.go();
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
        console.log(err.message);
      });

    setCategories(!categories);
    setDynamicRows([
      {
        id: `row-${uuid()}`,
        name: "",
        quantity: 0,
        weight: 0,
        files: [],
        type: "added",
      },
    ]);
  };

  const [dynamicRows, setDynamicRows] = React.useState([]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box component={"div"}>
      <Header />

      <Container className="py-5">
        <Grid container direction="row" justify="center" spacing={1}>
          <Grid
            item
            md={8}
            xs={12}
            className={`my-2 ${screen.width <= 768 ? "order-last" : "order-first"
              }`}
          >
            {record.user ? (
              <TravelCard
                recordInputInfo={true}
                username={record.user.username}
                user={record.user}
                record={record}
                hasShadow={true}
              />
            ) : null}

            <Card className={"shadow py-2 my-3"}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h6"
                  color="textPrimary"
                  gutterBottom
                  className={`m-0 me-1 fw-medium`}
                >
                  Description
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h6"
                  color="textPrimary"
                  gutterBottom
                  className={`m-0 me-1 fw-normal`}
                >
                  {record && record.description}
                </Typography>
              </CardContent>
            </Card>

            {categories ? (
              <Card className={`shadow py-2 my-3`}>
                <CardContent>
                  <Box
                    component={"div"}
                    className={
                      "d-flex align-items-center justify-content-between"
                    }
                  >
                    <Button
                      onClick={handleCategories}
                      color="default"
                      startIcon={<IoArrowBack />}
                    >
                      Back
                    </Button>
                  </Box>
                  {record &&
                    record.sub_records &&
                    record.sub_records.map((value, index) => {
                      if (
                        objectInArray(dynamicRows, "category", value.category)
                      ) {
                        return (
                          <div>
                            <ItemTable
                              inputTable={true}
                              setDynamicRows={setDynamicRows}
                              rows={dynamicRows}
                              title={value.category}
                              isCheckboxDisabled={true}
                              hasCheckbox={false}
                              hasTitle={true}
                              // hasPagination={true}
                              headings={[
                                {
                                  text: "Name",
                                  isTextInput: false,
                                  default: "name",
                                },
                                {
                                  text: "Quantity",
                                  isTextInput: true,
                                  default: "quantity",
                                  inputType: "number",
                                },
                                {
                                  text: "Weight",
                                  isTextInput: true,
                                  default: "weight",
                                  inputType: "number",
                                },
                                {
                                  text: "Price",
                                  isTextInput: false,
                                  default: "price",
                                },
                              ]}
                            />
                          </div>
                        );
                      }
                    })}

                  <Box>
                    <CreateItemTable
                      setRows={setDynamicRows}
                      rows={dynamicRows}
                      submitItems={submitItems}
                      priceRequired={false}
                    />
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Box component={"div"}>
                {record &&
                  record.sub_records &&
                  record.sub_records.map((value, index) => {
                    return (
                      <div style={{ marginTop: "10px" }}>
                        <ItemTable
                          inputTable={false}
                          title={value.category}
                          headings={[
                            {
                              text: "Name",
                              isTextInput: false,
                              default: "name",
                            },
                            {
                              text: "Quantity",
                              isTextInput: false,
                              default: "max_quantity",
                            },
                            {
                              text: "Weight",
                              isTextInput: false,
                              default: "max_weight",
                            },
                            {
                              text: "Price",
                              isTextInput: false,
                              default: "price",
                            },
                          ]}
                          rows={value.items}
                          hasCheckbox={true}
                          setDynamicRows={setDynamicRows}
                          dynamicRows={dynamicRows}
                        />
                      </div>
                    );
                  })}

                <Box
                  component={"div"}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <Button
                    className="ms-auto my-2"
                    variant="outlined"
                    color={"primary"}
                    disabled={user.username ? false : true}
                    onClick={openInteractionTable}
                    size="large"
                  >
                    Interact
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
          <RecordDetailsSideBar record={record} disabled={user.username ? false : true} />
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
