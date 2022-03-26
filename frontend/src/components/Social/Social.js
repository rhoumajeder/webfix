import React, { useState } from "react";
import { Card, Container } from '@material-ui/core';
import {
    Instagram,
    YouTube,
    WhatsApp,
    Facebook,
    Twitter
} from "@material-ui/icons";
import {
    Button,
  } from "@material-ui/core";
import { Link } from 'react-router-dom';
import './Social.css';
import apple from './apple.png';
import google from './google.png';
import arrow from './arrow.png';

function Social() {

    const [visible, setVisible] = useState(false);  // visibility state
    return (
        <div>
            <Container>
                <Card className="px-2 bg-lightgray py-5 shadow mb-5">
                    <Container>
                        <div className="row">
                            <div className="col-8">
                                <ul className='list mt-4 text-center'>
                                    {/* <Link to="/aa">
                                        <Instagram
                                            className='instagram'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link> */}
                                     <Button variant="text" onClick={() => setVisible(!visible)}> <WhatsApp
                            className='whatsapp'
                            style={{ fontSize: "120px", margin: 2 }}

                        />{visible && <div>+44 115 791 0834</div>}</Button> 
                                    {/* <Link to="/aa">
                                        <Twitter
                                            className='twitter'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link> */}
                                      <Link to={{ pathname: "https://www.facebook.com/LelBled" }} target="_blank" >
                                        <Facebook
                                            className='facebook'
                                            style={{ fontSize: "120px", margin: 2 }}
                                        />
                                    </Link>
                                    <Link to={{ pathname: "https://www.youtube.com/channel/UCrFphTIvEwjKdVBMbrTAvEQ" }} target="_blank" >
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
                                        <a href="https://play.google.com/store/apps/details?id=com.lelbled">
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
