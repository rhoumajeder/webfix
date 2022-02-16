import React, { useState } from 'react';
import { MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import body from '../../assets/images/bodyref.png';


import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import './HelpButton.css';


function HelpButton() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <MdHelp size='40px' className='helpBtn' color='gray' />
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'top',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>
                    <p className='mt-3 p-3'>
                        Reference: Le corps humain
                    </p>
                    <img src={body} alt="" width='600px' height='500px' />
                </Typography>
            </Popover>
        </div>
    );
}

export default HelpButton;
