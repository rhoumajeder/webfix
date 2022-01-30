import React from 'react';
import Header from "../Header/Header";
import NewFooter from "../NewFooter/NewFooter";

import body from '../../assets/images/bodyref.png';

function HelpPage() {
    return (
        <div>
            <Header />
            <div className='text-center'>
                <p className='mt-3 p-3'>
                    Human Body size as reference
                </p>
                <img src={body} alt="" />
            </div>
            <NewFooter />
        </div>
    );
}

export default HelpPage;
