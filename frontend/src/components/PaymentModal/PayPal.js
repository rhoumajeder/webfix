import React, { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material';
import { FaPaypal } from 'react-icons/fa';
import './PaymentModal.css';

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

function PayPal() {
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
                <FaPaypal size='40px' color='rgb(0, 47, 134)' id='pay' />
            </Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style }} className='shadowLg rounded text-center'>
                    <h2>Paypal</h2>
                    <p>
                        <TextField sx={{
                            width: 300,
                            marginTop: 3
                        }}
                            id="demo-helper-text-misaligned-no-helper" label="Name" />
                    </p>
                    <Button onClick={handleClose} variant="filled">Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default PayPal;
