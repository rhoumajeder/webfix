import React from 'react';
import { MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './HelpButton.css';


function HelpButton() {
    return (
        <div>
            <Link to='/help'>
                <MdHelp size='50px' className='helpBtn' color='gray' />
            </Link>
        </div>
    );
}

export default HelpButton;
