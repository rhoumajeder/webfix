import React, {useState, useContext} from 'react';
import {Box, Paper, Card, CardContent, Container, Grid, IconButton, Tab, Tabs, Typography, makeStyles} from "@material-ui/core";
import {GiCheckMark} from "react-icons/gi";
import {HiEye, HiEyeOff} from "react-icons/hi";

import "./index.css";
import { AuthContext } from "../../context/auth";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Header from "../../components/Header/Header";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import ReportModal from "../../components/ReportModal/ReportModal";
import ProfileFeedback from "../../components/Feedback/ProfileFeedback";


const useStyles = makeStyles(theme => ({
    gridItem: {
        backgroundColor: theme.palette.background.paper
    },
    feedback: {
        textDecoration: "underline",
        fontWeight: "bold",
        "&:hover": {
            cursor: 'pointer',
        }
    }
}))

const Index = () => {

    const [togglePassword, setPassword] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [record, setRecord] = useContext(AuthContext)

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

	const openFeedbackModal = () => {
        setFeedbackModalOpen(true);
    };


    const [reportModalOpen, setReportModalOpen] = useState(false);
	const openReportModal = () => {
		setReportModalOpen(true);
	};

    const classes = useStyles()


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
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Email Address
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 ps-2 fw-normal`}>
                                            {record && record.email}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                                    className="ps-2">
                                            {record && record.checked_email && <GiCheckMark className="text-success" /> }
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Phone Number
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 ps-2 fw-normal`}>
                                            {record && record.phone_number}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                                    className="ps-2">
                                            {record && record.checked_phone && <GiCheckMark className="text-success" /> }
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Current Address
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 ps-2 fw-normal`}>
                                            {record && record.address}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                                    className="ps-2">
                                            {record && record.checked_billet && <GiCheckMark className="text-success" /> }
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box component={'div'} className={'border-top border-2 py-3'}>
                                    <Typography variant="h6" component="h6" color="textPrimary" gutterBottom
                                                className={`m-0 me-1 fw-medium`}>
                                        Other Details
                                    </Typography>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Current Password
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 ps-2 fw-normal ${togglePassword ? 'show-password' : 'hide-password'}`}>
                                            tSHH6@g+F+r_6fvTXy_WQGL
                                            <IconButton color="secondary" aria-label="show-hide-password" className={`mx-2`} component="span" size={'small'}
                                            onClick={() => setPassword(!togglePassword)}>
                                                { togglePassword ? <HiEyeOff /> : <HiEye /> }
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                    <Box component={"div"} className={"my-3"}>
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                                    className={`m-0 fw-bold`}>
                                            Date Of Birth
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6" color="textPrimary" gutterBottom
                                                    className={`m-0 ps-2 fw-normal`}>
                                            {record && record.dob}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography onClick={openReportModal} variant="h6" align="right" className={`text-primary ${classes.feedback}`}>
                                        Signalez ce membre
                                    </Typography>
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
                                        <Tab label="Feedback" id={`user-tab-${0}`} />
                                    </Tabs>
                                </Paper>
                                <TabPanel value={tab} index={0}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="flex-end" direction="column">
                                                <Grid item>
                                                    <Typography onClick={openFeedbackModal} variant="h6" component="span" className={classes.feedback}>
                                                        Add Feedbacks
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {record && record.received_feedback.map(feedback => (
                                            <Grid item sm={9} xs={12} className="w-100" key={feedback.id}>
                                                <ProfileFeedback star={feedback.note} text={feedback.text} user={feedback.writer.username} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <FeedbackModal
                writer={record}
                receiver={record}
                feedbackModalOpen={feedbackModalOpen}
                setFeedbackModalOpen={setFeedbackModalOpen}
            />
            <ReportModal
                writer={record}
                receiver={record}
                reportModalOpen={reportModalOpen}
                setReportModalOpen={setReportModalOpen}
            />
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
                <Box p={1} pt={2}>
					{children}
                </Box>
            )}
        </div>
    );
}


export default Index;
