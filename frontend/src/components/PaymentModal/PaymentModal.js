import React, { useState } from 'react';

import './PaymentModal.css';

import { Card, Container } from '@material-ui/core';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Input,
    Box, Button, Modal, Grid, TextField, Select, InputLabel, MenuItem, FormControl, InputAdornment,
    Accordion, Typography,
    AccordionDetails, AccordionSummary
} from "@mui/material";
import { FaCcMastercard, FaCcVisa, FaCheck, FaLock } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
// import AccountCircle from '@mui/icons-material/AccountCircle';

const style = {
    position: 'absolute',
    margin: '100px',
    bgcolor: 'background.paper',
    border: '2px solid gray'
};

function PaymentModal(props) {
    const [tog, setTog] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div>
            <Container className='container'>
                <Box sx={style}>
                    <Typography variant="h5" component="h2" className='mt-1'>
                        Add Payment Methods
                    </Typography>
                    <div className='container mx-3 mt-1' >
                        <div className='container mx-5 mt-1'>
                            <Accordion disabled className='container mx-5 w-75' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography>
                                        <div className="form-check">
                                            <input type="radio" className='form-check-input' />
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
                            <Accordion disabled className='container mx-5 w-75' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
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
                            <Accordion className='container mx-5 w-75' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                    onClick={() => setTog(!tog)}
                                >
                                    <Typography>
                                        <div className="form-check">
                                            <input type="radio" className='form-check-input' checked={tog} />
                                            <label className="form-check-label">
                                                Cash
                                            </label>
                                        </div>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='text-center'>
                                        <Button variant="contained" onClick={props.paymentOption}>Pay</Button>
                                    </div>
                                </AccordionDetails>
                                {/* <AccordionDetails>
                                    <h3>Credit Card</h3>
                                    <div className='container ml-5'>
                                        <div className='container m-1'>
                                            <FaCcMastercard size='50px' color='rgb(235, 0, 27)' className='mx-2' />
                                            <FaCcVisa size='50px' color='rgb(0, 87, 159)' className='mx-2' />
                                            <SiAmericanexpress size='38px' color='rgb(0, 111, 207)' className='rounded mx-2' /> <br />
                                            <div className="container row p-2">
                                                <div className="col">
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
                                                <div className="col">
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
                                            </div>
                                            <div className="container row p-2">
                                                <div className="col">
                                                    <FormControl variant="standard">
                                                        <InputLabel htmlFor="input-with-icon-adornment">
                                                            First Name
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
                                                <div className="col">
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
                                            <div className="container row p-2">
                                                <div className="col">
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
                                                <div className="col">
                                                    <FormControl variant="standard">
                                                        <InputLabel htmlFor="input-with-icon-adornment">
                                                            City
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
                                            <div className='text-center'>
                                                <Button variant="contained" onClick={props.paymentOption}>Pay</Button>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails> */}
                            </Accordion>
                        </div>
                    </div>
                </Box>

            </Container>
        </div>
    )
}

export default PaymentModal;
