import React from 'react';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import {RiCheckFill, RiSecurePaymentFill, RiSendPlaneFill} from "react-icons/ri";
import {FaDollarSign, FaHandshake, FaThumbsUp} from "react-icons/fa";
import clsx from "clsx";

import "./StepperExtended.css";


const StepperConnectorStyling = makeStyles({

    root: {
        top: 20,
    },
    line: {
        height: 10,
        backgroundColor: 'rgba(234,240,244,255)',
        border: "none"
    }
});


const StepperExtended = ({activeStep}) => {
    const classes = StepperConnectorStyling();
    return (
        <Stepper activeStep={activeStep} alternativeLabel style={{overflowX: 'auto'}}
                 connector={
                     <StepConnector
                         classes={{
                             root: classes.root,
                             line: classes.line
                         }}
                     />}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={customStepIcons}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};



const useCustomStepIconsStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(234,240,244,255)',
        zIndex: 1,
        color: 'rgba(153,162,168,255)',
        padding: 10,
        width: 50,
        height: 50,
        fontSize: 20,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: 'rgba(92, 184, 92, 255)',
        color: 'rgba(255,255,255,255)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor: 'rgba(92, 184, 92, 255)',
        color: 'rgba(255,255,255,255)',
    },
});

const customStepIcons = (props) => {
    const {active, completed} = props;
    const classes = useCustomStepIconsStyles();

    const icons = {
        1: <RiSendPlaneFill/>,
        2: <RiCheckFill className={"fw-bold"}/>,
        3: <RiSecurePaymentFill/>,
        4: <FaHandshake/>,
        5: <FaDollarSign/>,
        6: <FaThumbsUp/>,
    };

    return (
        <Box component={"div"}
             className={clsx(classes.root, {
                 [classes.active]: active,
                 [classes.completed]: completed,
             })}>

            {icons[String(props.icon)]}
        </Box>
    );
}


export const StepperButtons = ({ children, setActiveStep,
                                   activeStep, nextButtonDisabled}) => {

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(1);
    };

    return (
        <React.Fragment>
            {activeStep === steps.length ? (
                <Box component={"div"} className={"mx-3"}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                </Box>
            ) : (
                <Box component={"div"} className={"mx-3"}>
                    {children}
                    <Box component={"div"} className={"my-3"}>
                        <Button
                            disabled={activeStep === 1}
                            onClick={handleBack}>
                            Back
                        </Button>
                        <Button disabled={nextButtonDisabled} variant="contained" color="primary"
                                onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>)}
        </React.Fragment>
    );
}


const steps = [
    'Offre Envoyé',
    'Offre Accepted',
    'Payment',
    'Meeting',
    'Shipment',
    'Delivered',
]

export default StepperExtended;