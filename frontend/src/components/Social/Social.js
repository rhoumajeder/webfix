import React from 'react'
import { Card, Container } from '@material-ui/core';
import {
    Instagram,
    YouTube,
    WhatsApp,
    Facebook,
    Twitter
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import './Social.css';
import apple from './apple.png';
import google from './google.png';
import arrow from './arrow.png';

function Social() {
    return (
        <div>
            <Container>
                <Card className="px-2 bg-lightgray py-5 shadow mb-5">
                    <Container>
                        <div className="row">
                            <div className="col-8">
                                <ul className='list mt-4 text-center'>
                                    <Link to="/aa">
                                        <Instagram
                                            className='instagram'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                    <Link to="/aa">
                                        <WhatsApp
                                            className='whatsapp'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                    <Link to="/aa">
                                        <Twitter
                                            className='twitter'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                    <Link to="/aa">
                                        <Facebook
                                            className='facebook'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                    <Link to="/aa">
                                        <YouTube
                                            className='youtube'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                </ul>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <div className="col">
                                        <a href="#">
                                            <img src={google} id='google' className='mt-1' alt="" />
                                        </a>
                                        <img src={arrow} className='mb-5' alt="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <a href="#">
                                            <img src={apple} id='apple' className='mt-1' alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Card>
            </Container>
        </div>
    )
}

export default Social
