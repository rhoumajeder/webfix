import React, { useState } from 'react';

import './PaymentModal.css';
import PayPal from './PayPal';
import CreditCard from './CreditCard';
import Header from '../Header/Header';
import NewFooter from '../NewFooter/NewFooter';
import { Card, Container } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Input,
    Box, Button, Modal, Grid, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment,
    Accordion, Typography,
    AccordionDetails, AccordionSummary
} from "@mui/material";
import { FaCcMastercard, FaCcVisa, FaCheck, FaLock } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import AccountCircle from '@mui/icons-material/AccountCircle';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    pt: 2,
    px: 4,
    pb: 3,
};

function PaymentModal() {
    const [tog, setTog] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div>
            <Header />
            <Container>
                <Card className="px-2 py-5 shadow">
                    <div className='container m-5'>
                        <Typography variant="h5" component="h2">
                            Add Payment Methods
                        </Typography>
                        <Accordion className='container' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                onClick={() => setTog(!tog)}
                            >
                                <Typography>
                                    <div className="form-check">
                                        <input type="radio" className='form-check-input' checked={tog} />
                                        <label className="form-check-label">
                                            Credit Card
                                        </label>
                                    </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <h2>Credit Card</h2>
                                <div className='container text-left'>
                                    <div className='container p-2'>
                                        <FaCcMastercard size='50px' color='rgb(235, 0, 27)' className='mr-2' />
                                        <FaCcVisa size='50px' color='rgb(0, 87, 159)' className='mr-2' />
                                        <SiAmericanexpress size='38px' color='rgb(0, 111, 207)' /> <br />
                                        <div className="container row p-2 ml-5 mr-5">
                                            <div className="col-auto">
                                                <FormControl variant="standard">
                                                    <InputLabel htmlFor="input-with-icon-adornment">
                                                        Card Number
                                                    </InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <FaCheck size='20px' color='lightgreen' className='mr-1' />
                                                                <FaCcVisa size='20px' color='rgb(0, 87, 159)' />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-auto">
                                                <FormControl variant="standard">
                                                    <InputLabel htmlFor="input-with-icon-adornment">
                                                        Date Expiration
                                                    </InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <FaCheck size='20px' color='lightgreen' className='mr-1' />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-auto">
                                                <FormControl variant="standard">
                                                    <InputLabel htmlFor="input-with-icon-adornment">
                                                        Code CVV
                                                    </InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        startAdornment={
                                                            <InputAdornment position="end">
                                                                <FaLock size='20px' color='black' className='mr-1' />
                                                            </InputAdornment>
                                                        }
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <FaCheck size='20px' color='lightgreen' className='mr-1' />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="container row p-2 ml-5 mr-5">
                                            <div className="col-auto">
                                                <FormControl variant="standard">
                                                    <InputLabel htmlFor="input-with-icon-adornment">
                                                        Last Name
                                                    </InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <FaCheck size='20px' color='lightgreen' className='mr-1' />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-auto">
                                                <FormControl variant="standard">
                                                    <InputLabel htmlFor="input-with-icon-adornment">
                                                        Last Name
                                                    </InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <FaCheck size='20px' color='lightgreen' className='mr-1' />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className='container' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                aria-controls="panel2bh-content"
                                id="panel1bh-header"
                                onClick={() => setShow(!show)}
                            >
                                <Typography>
                                    <div className="form-check">
                                        <input type="radio" className='form-check-input' checked={show} />
                                        <label className="form-check-label">
                                            PayPal
                                        </label>
                                    </div>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <h2>PayPal</h2>
                                <div className='container'>
                                    <div className='container'>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, adipisci.
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Card>
            </Container>
            <NewFooter />
        </div>
    )
}

export default PaymentModal;
