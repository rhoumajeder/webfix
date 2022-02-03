import React from 'react';
import {
    Box, CardActions, CardContent, Button, Typography
} from "@mui/material";
import fash from "../../assets/images/flash.png";
import img from '../../assets/images/database.png';
import './NewFeedback.css';
import { Card, Container } from '@material-ui/core';

function NewFeedback() {
    return (
        <div>
            <Container>
                <Card className="px-2 py-5 shadow mb-5">
                    <div className="row">
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    <img src={fash} alt="not found" width='25px' height='25px' />
                                    <Typography variant="h5" component="div">
                                        Lorem ipsum dolor sit amet.
                                    </Typography>
                                    <Typography variant="body2">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sequi et corporis ut nobis. Officia mollitia distinctio facere animi, earum commodi est nulla iste qui temporibus? Quis ipsam aliquam asperiores eligendi in deleniti eveniet amet perspiciatis dolore natus! Veritatis, deleniti enim! Magni maiores recusandae tenetur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum?
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    <img src={img} alt="not found" width='25px' height='25px' />
                                    <Typography variant="h5" component="div">
                                        Lorem ipsum dolor sit amet.
                                    </Typography>
                                    <Typography variant="body2">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sequi et corporis ut nobis. Officia mollitia distinctio facere animi, earum commodi est nulla iste qui temporibus? Quis ipsam aliquam asperiores eligendi in deleniti eveniet amet perspiciatis dolore natus! Veritatis, deleniti enim! Magni maiores recusandae tenetur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum?
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    <img src={fash} alt="not found" width='25px' height='25px' />
                                    <Typography variant="h5" component="div">
                                        Lorem ipsum dolor sit amet.
                                    </Typography>
                                    <Typography variant="body2">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sequi et corporis ut nobis. Officia mollitia distinctio facere animi, earum commodi est nulla iste qui temporibus? Quis ipsam aliquam asperiores eligendi in deleniti eveniet amet perspiciatis dolore natus! Veritatis, deleniti enim! Magni maiores recusandae tenetur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum?
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-6 p-3">
                            <Card className='cardShadow border border-2 p-2 mr-1 ml-1' sx={{ textAlign: 'justify' }}>
                                <CardContent>
                                    <img src={fash} alt="not found" width='25px' height='25px' />
                                    <Typography variant="h5" component="div">
                                        Lorem ipsum dolor sit amet.
                                    </Typography>
                                    <Typography variant="body2">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque sequi et corporis ut nobis. Officia mollitia distinctio facere animi, earum commodi est nulla iste qui temporibus? Quis ipsam aliquam asperiores eligendi in deleniti eveniet amet perspiciatis dolore natus! Veritatis, deleniti enim! Magni maiores recusandae tenetur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum? etur autem praesentium ipsam dolorum illum?
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default NewFeedback;
