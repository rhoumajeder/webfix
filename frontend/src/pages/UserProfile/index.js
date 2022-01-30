import React, { useState, useContext, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Container, Grid, IconButton, Tab, Tabs, Typography, makeStyles, ButtonBase } from "@material-ui/core";
import { GiCheckMark } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import moment from 'moment';

import "./index.css";
import usePagination from "../../hooks/usePagination";
import axiosInstance from '../../helpers/axios';
import CustomPagination from "../../components/Pagination/Pagination";
import { AuthContext } from "../../context/auth";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Header from "../../components/Header/Header";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import ReportModal from "../../components/ReportModal/ReportModal";
import ProfileFeedback from "../../components/Feedback/ProfileFeedback";
import UserProfileModal from '../../components/UserProfileModal/UserProfileModal';
import HelpButton from '../../components/HelpButton/HelpButton';


const PAGE_SIZE = 5;


const Index = (props) => {
    console.log(props)

    const targetUserId = isNaN(props.match.params.user) ? null : (
        parseInt(props.match.params.user)
    )
    const [tab, setTab] = React.useState(0);
    const [targetUser, setTargetUser] = useState()
    const [authUser, setAuthUser] = useContext(AuthContext)
    const record = targetUser || authUser
    useEffect(() => {
        if (targetUserId && (targetUserId != authUser.id)) {
            axiosInstance
                .get(`auth/get-user/${targetUserId}`)
                .then(res => {
                    setTargetUser(res.data.user)
                })
        }
    }, [targetUserId])

    const { currentPage, getCurrentData, changePage, pageCount } = usePagination(
        record.received_feedback,
        PAGE_SIZE
    );
    const feedbackToShow = getCurrentData();
    const onPageChange = (event, value) => changePage(value);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const openFeedbackModal = () => {
        setFeedbackModalOpen(true);
    };

    const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);

    const [reportModalOpen, setReportModalOpen] = useState(false);
    const openReportModal = () => {
        setReportModalOpen(true);
    };


    const publishedRecords = (
        (record ? record.total_number_of_ads : 0)
        + ' record'
        + ((record && record.total_number_of_ads > 1) ? 's' : '')
        + ' published'
    )

    const startDate = record ? moment(record.start_date).format('YYYY') : null


    const onSubmitUserFrom = (data) => {
        setAuthUser(data)
    }


    return (
        <Box component={"div"}>

            <Header />
            <HelpButton />

            <Container className="py-5">
                <Grid container direction="row" justify="center" spacing={1}>
                    <Grid item md={4} xs={12} className={`my-2`}>

                        <Card className={"shadow"}>
                            <CardContent>
                                <UserAvatar profile={record.photo} name={record.username} />
                                {record && record.intro && (
                                    <Box className="border-top border-2 bg-light p-2">
                                        <Box className="bg-white p-2">
                                            <Typography component="h6" variant="body2" display="inline">
                                                {record.intro}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                <Box className={'border-top border-2 py-3'}>
                                    <Grid container direction="row" justify="space-between">
                                        <Grid item>
                                            <Typography variant="h6" component="h6" gutterBottom
                                                className={`m-0 me-1 fw-medium`}>
                                                Contact Information
                                            </Typography>
                                        </Grid>
                                        {(!targetUserId || (targetUserId == authUser.id)) && (
                                            <Grid item>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setUserProfileModalOpen(true)}
                                                >
                                                    <BiEdit />
                                                </IconButton>
                                            </Grid>
                                        )}
                                    </Grid>
                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Name
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.first_name}
                                        </Typography>
                                    </Box>}
                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Last Name
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.last_name}
                                        </Typography>
                                    </Box>}
                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Email Address
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.email}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                            className="ps-2">
                                            {record && record.checked_email && <GiCheckMark className="text-success" />}
                                        </Typography>
                                    </Box>}
                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Phone Number
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.phone_number}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                            className="ps-2">
                                            {record && record.checked_phone && <GiCheckMark className="text-success" />}
                                        </Typography>
                                    </Box>}
                                    <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Date Of Birth
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.dob}
                                        </Typography>
                                    </Box>

                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Current Password
                                        </Typography>
                                    </Box>}
                                    {(targetUserId == authUser.id) && <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" gutterBottom
                                            className={`m-0 fw-bold`}>
                                            Current Address
                                        </Typography>
                                        <Typography display="inline" variant="body2" component="h6"
                                            className={`m-0 ps-2 fw-normal`}>
                                            {record && record.address}
                                        </Typography>
                                        <Typography variant="body2" component="span"
                                            className="ps-2">
                                            {record && record.checked_billet && <GiCheckMark className="text-success" />}
                                        </Typography>
                                    </Box>}
                                </Box>
                                <Box className={'border-top border-2 py-3'}>
                                    <Typography variant="h6" component="h6" gutterBottom
                                        className={`m-0 me-1 fw-medium`}>
                                        Other Details
                                    </Typography>
                                    <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" className={`m-0 fw-bold`}>
                                            {publishedRecords}
                                        </Typography>
                                    </Box>
                                    {startDate && (
                                        <Box className="my-1">
                                            <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" className={`m-0 fw-bold`}>
                                                Registered since {startDate}
                                            </Typography>
                                        </Box>
                                    )}
                                    <Box className="my-1">
                                        <Typography display="inline" variant="subtitle2" component="h6" color="textSecondary" className={`m-0 fw-bold`}>
                                            {(record && record.is_pro)
                                                ? 'This member is professional'
                                                : 'This member is not professional'
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                                {console.log(targetUserId)}
                                {console.log("authUser")}

                                {console.log(authUser)}

                                {!(targetUserId == authUser.id) && !(targetUserId === null) && <Box align="right">
                                    <ButtonBase>
                                        <Typography
                                            variant="h6"
                                            onClick={openReportModal}
                                            className="text-primary text-decoration-underline fw-bold">
                                            Signalez ce membre
                                        </Typography>
                                    </ButtonBase>
                                </Box>}
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
                                                    {!(targetUserId == authUser.id) && !(targetUserId === null) && <ButtonBase>
                                                        <Typography
                                                            variant="h6"
                                                            component="span"
                                                            onClick={openFeedbackModal}
                                                            className="text-decoration-underline fw-bold"
                                                        >
                                                            Add Feedbacks
                                                        </Typography>
                                                    </ButtonBase>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {record && feedbackToShow.map(feedback => (
                                            <Grid item sm={9} xs={12} className="w-100" key={feedback.id}>
                                                <ProfileFeedback star={feedback.note} text={feedback.text} user={feedback.writer.username} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                                <Box align='center' className="pt-4">
                                    <CustomPagination
                                        itemCount={record.received_feedback.length}
                                        itemsPerPage={PAGE_SIZE}
                                        onPageChange={onPageChange}
                                        currentPage={currentPage}
                                        pageCount={pageCount}
                                    />
                                </Box>
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
            <UserProfileModal
                profile={record}
                onSuccess={onSubmitUserFrom}
                isModalOpen={isUserProfileModalOpen}
                setModalOpen={setUserProfileModalOpen} />
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


export const UserProfileDetails = (props) => <Index {...props} />


export default Index;
