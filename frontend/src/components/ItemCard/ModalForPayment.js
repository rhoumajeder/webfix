import React from 'react';
import {
    Input, InputLabel, FormControl,
    InputAdornment, Box, Button, Modal
} from "@mui/material";
import { FaCcMastercard, FaCcVisa, FaCheck, FaLock } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import { BsPersonCircle } from 'react-icons/bs';
import { FcExpired } from 'react-icons/fc';
import './ModalForPayment.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalForPayment() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Credit Card</h2>
                    <Modal />
                    <div className='container text-center'>
                        <div className='container p-2'>
                            <FaCcMastercard size='50px' color='rgb(235, 0, 27)' className='m-2' />
                            <FaCcVisa size='50px' color='rgb(0, 87, 159)' className='m-2' />
                            <SiAmericanexpress size='40px' color='rgb(0, 111, 207)' className='m-2 rounded' /> <br />
                            <div className="container">
                                <div className="width-250">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Card Number
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <FaCheck size='20px' color='lightgreen' className='m-2' />
                                                    <FaCcVisa size='20px' color='rgb(0, 87, 159)' className='m-2' />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="width-250">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Date Expiration
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <FaCheck size='20px' color='lightgreen' className='m-2' />
                                                    <FcExpired size='20px' className='m-2' />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="width-250">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Code CVV
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="end">
                                                    <FaLock size='20px' color='gray' className='m-2' />
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <FaCheck size='20px' color='lightgreen' className='m-2' />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="container">
                                <div className="width-250">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Last Name
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="end">
                                                    <BsPersonCircle size='20px' color='gray' className='m-2' />
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <FaCheck size='20px' color='lightgreen' className='m-2' />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="width-250">
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Last Name
                                        </InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="end">
                                                    <BsPersonCircle size='20px' color='gray' className='m-2' />
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <FaCheck size='20px' color='lightgreen' className='m-2' />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalForPayment;
