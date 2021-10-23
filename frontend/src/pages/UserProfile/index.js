import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {Box, Paper, Card, CardContent, Container, Grid, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import {GoVerified} from "react-icons/go";
import {HiEye, HiEyeOff} from "react-icons/hi";

import "./index.css";
import axios from "../../utils/custom-axios";

const Index = () => {

    const [togglePassword, setPassword] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [record, setRecord] = useState({});

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() =>{
        axios
            .get("/api/auth/me/1")
            .then(res => {
                setRecord(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err.response))

    }, [])
    return (
        <Box component={"div"}>

            <Header/>

            <Container className="py-5">
                <Grid container direction="row" justify="center" spacing={1}>
                    <Grid item md={4} xs={12} className={`my-2`}>

                        <Card className={"shadow"}>
                            <CardContent>
                                <UserAvatar profile={record.photo} name={record.first_name} />
                                <Box component={'div'} className={'border-top border-2 py-3'}>
                                    <Typography variant="h6" component="h6" color="textPrimary" gutterBottom
                                                className={`m-0 me-1 fw-medium`}>
                                        Contact Information
                                    </Typography>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Email Address
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {/*l3wjmzq0tvb@temporary-mail.net*/} {record && record.email}
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Phone Number
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {/*077 7707 0675*/} {record && record.phone_number}
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Current Address
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {/*62 Cambridge Road NOONSBROUGH ZE2 7WR*/} {record && record.address}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box component={'div'} className={'border-top border-2 py-3'}>
                                    <Typography variant="h6" component="h6" color="textPrimary" gutterBottom
                                                className={`m-0 me-1 fw-medium`}>
                                        Other Details
                                    </Typography>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Current Password
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal ${togglePassword ? 'show-password' : 'hide-password'}`}>
                                            tSHH6@g+F+r_6fvTXy_WQGL
                                            <IconButton color="secondary" aria-label="show-hide-password" className={`mx-2`} component="span" size={'small'}
                                            onClick={() => setPassword(!togglePassword)}>
                                                { togglePassword ? <HiEyeOff /> : <HiEye /> }
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Gender
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {/*Male*/} {record && record.gender}
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Date Of Birth
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {/*6/1/1962*/} {record && record.dob}
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Account Status
                                        </Typography>
                                        <Typography variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 fw-normal`}>
                                            {
                                                record && record.is_active && <React.Fragment>
                                                    Active <GoVerified className={"text-success mx-1"}/>
                                                </React.Fragment>
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item md={8} xs={12} className={`my-2`}>

                        <Card className={"shadow"}>
                            <CardContent>
                                <Paper>
                                    <Tabs value={tab} onChange={handleChange}
                                          aria-label="user-tab-profile" textColor={'secondary'}
                                          variant={"scrollable"} scrollButtons="auto">
                                        <Tab label="Timeline" id={`user-tab-${0}`} />
                                        <Tab label="Notes" id={`user-tab-${1}`} />
                                        <Tab label="Events" id={`user-tab-${2}`} />
                                        <Tab label="Tasks" id={`user-tab-${3}`} />
                                        <Tab label="Deals" id={`user-tab-${4}`} />
                                    </Tabs>
                                </Paper>
                                <TabPanel value={tab} index={0}>
                                    Item One
                                </TabPanel>
                                <TabPanel value={tab} index={1}>
                                    Item Two
                                </TabPanel>
                                <TabPanel value={tab} index={2}>
                                    Item Three
                                </TabPanel>
                                <TabPanel value={tab} index={3}>
                                    Item Four
                                </TabPanel>
                                <TabPanel value={tab} index={4}>
                                    Item Five
                                </TabPanel>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const TabPanel = (props) => {

    const { children, value, index, ...other } = props;
    return (
        <div
            role="userTabPanel"
            className={"bg-light"}
            hidden={value !== index}
            id={`user-detail-tab-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default Index;