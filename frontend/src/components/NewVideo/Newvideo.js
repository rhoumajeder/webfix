import React from 'react';
import YouTube from 'react-youtube';

import './NewVideo.css';

import { Container, Card } from "@material-ui/core";


function Newvideo() {
    const onReady = (event) => {
        event.target.pauseVideo();
    }
    const opts = {
        height: '409',
        width: '1100',
    };
    return (
        <div>
            <Container>
                <Card className="px-2 py-5 shadow mb-5 bg-lightgray">
                    <div className='text-center'>
                        <h4 className='display-5'>Lelbled</h4>
                        <YouTube videoId="-ynJ8HBZj1XE" opts={opts} onReady={onReady} />
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Newvideo;
