import React from 'react';
import './NewFooter.css';
import apple from './apple.png';
import google from './google.png';

import {
    Instagram,
    YouTube,
    WhatsApp,
    Facebook,
    Twitter
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

function NewFooter() {
    return (
        <Container>
            <section className="px-2 py-5 shadow footer bg-lightgray">
                <div className='social'>
                    <Link to="/aa">
                        <Instagram
                            className='instagram'
                            style={{ fontSize: "40px", margin: 2 }}
                        />
                    </Link>
                    <Link to="/aa">
                        <WhatsApp
                            className='whatsapp'
                            style={{ fontSize: "40px", margin: 2 }}
                        />
                    </Link>
                    <Link to="/aa">
                        <Twitter
                            className='twitter'
                            style={{ fontSize: "40px", margin: 2 }}
                        />
                    </Link>
                    <Link to="/aa">
                        <Facebook
                            className='facebook'
                            style={{ fontSize: "40px", margin: 2 }}
                        />
                    </Link>
                    <Link to="/aa">
                        <YouTube
                            className='youtube'
                            style={{ fontSize: "40px", margin: 2 }}
                        />
                    </Link>
                </div>
                <ul className='list'>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/Commentcamarche">Comment ca marche</a>
                    </li>
                    <li>
                        <a href="/Quisommesnous">Qui sommes-nous?</a>
                    </li>
                    <li>
                        <a href="/Centreaide">Centre d'aide</a>
                    </li>
                    <li>
                        <a href="/Contactnous">Contact nous</a>
                    </li>
                    <li>
                        <a href="/cgu">CGU</a>
                    </li>
                    {/* <li>
                        <a href="/Payment">Payments </a>
                    </li> */}
                </ul>
                <div className='row text-center'>
                    <div className='col-sm d-flex justify-content-end'>
                        <a href="#" id='bannerS'>
                            <img src={apple} className='mt-2 rounded-3' alt="" />
                        </a>
                    </div>
                    <div className='col-sm d-flex justify-content-start'>
                        <a href="#" id='bannerS'>
                            <img src={google} className='mt-2 rounded-3' alt="" />
                        </a>
                    </div>
                </div>
                <p className="copyright">
                    &copy;LelBled 2022
                </p>
            </section>
        </Container>
    )
}

export default NewFooter;
