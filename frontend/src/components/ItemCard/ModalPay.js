import React from 'react';
import {
    Input, InputLabel, FormControl, InputAdornment
} from "@mui/material";
import { FaCcMastercard, FaCcVisa, FaCheck, FaLock } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import ModalForPayment from './ModalForPayment';


function ModalPay() {
    return (
        <div>
            <h2>Credit Card</h2>
            <ModalForPayment />
        </div>
    );
}

export default ModalPay;
