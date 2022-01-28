import React, { useState } from 'react';
import {
    Box, Button, Modal, Grid,
    TextField, Select, InputLabel,
    MenuItem, FormControl, InputAdornment
} from '@mui/material';
import { FaRegCreditCard } from 'react-icons/fa';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function CreditCard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Button onClick={handleOpen}>
                <FaRegCreditCard size='40px' color='rgb(0, 47, 134)' id='pay' />
            </Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Grid container spacing={2}>
                    <Box sx={{ ...style }} className='shadowLg rounded'>
                        <h2>Credit Card</h2>
                        <p className='text-center'>
                            <TextField variant="filled" size="small" sx={{ width: 300, marginTop: 1 }} label="Card number" placeholder='Card number' />
                            <div className="row">
                                <div className="col-sm">
                                    <TextField variant="filled" size="small" sx={{ width: 125, marginTop: 1 }} label="Expires" placeholder='MM/YY' />
                                </div>
                                <div className="col-sm">
                                    <TextField variant="filled" size="small" sx={{ width: 125, marginTop: 1 }} label="CSC" placeholder='CSC' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <TextField variant="filled" size="small" sx={{ width: 125, marginTop: 1 }} label="First Name" placeholder='First Name' />
                                </div>
                                <div className="col-sm">
                                    <TextField variant="filled" size="small" sx={{ width: 125, marginTop: 1 }} label="Last Name" placeholder='Last Name' />
                                </div>
                            </div>
                            <TextField variant="filled" size="small" sx={{ width: 300, marginTop: 1 }} label="Street Address" placeholder='Street Address' />
                            <TextField variant="filled" size="small" sx={{ width: 300, marginTop: 1 }} label="City" placeholder='City' />
                            <FormControl variant="filled" size="small" sx={{ width: 300, marginTop: 1 }}>
                                <InputLabel>State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                >
                                    <MenuItem value='State 1'>State 1</MenuItem>
                                    <MenuItem value='State 2'>State 2</MenuItem>
                                    <MenuItem value='State 3'>State 3</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField variant="filled" size="small" sx={{ width: 300, marginTop: 1 }} label="ZIP Code" placeholder='ZIP Code' />
                            <TextField
                                variant="filled"
                                label="Mobile"
                                placeholder='Mobile'
                                sx={{ width: 300, marginTop: 1 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                                }}
                            />
                            <TextField variant="filled" size="small" sx={{ width: 300, marginTop: 1 }} label="Email" placeholder='Email' />
                            <Button variant="contained" sx={{ marginTop: 2 }}>Pay Now</Button>
                            <Button variant="contained" onClick={handleClose} sx={{ marginTop: 2, marginLeft: 2 }}>Close</Button>
                        </p>
                    </Box>
                </Grid>
            </Modal>
        </React.Fragment>
    )
}

export default CreditCard;
