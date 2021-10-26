import React, { useContext, useRef, useEffect } from 'react'

import { AuthContext } from '../../../context/auth';

import {
    Grid,
    ListItem,
    ListItemText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import moment from "moment"

const useStyles = makeStyles({
    message: {
        width: "70%",
        borderRadius: "4px",
        padding: "1rem",
    },
});

const Messages = ({ messages }) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null);
    const [user, setUser] = useContext(AuthContext);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <React.Fragment>
            {messages.map((message, index) => {
                const userIsOwner = user.email === message.user.email;

                return (
                    <ListItem key={index}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText
                                    align={userIsOwner ? "right" : "left"}
                                    style={{
                                        marginLeft: userIsOwner ? "auto" : "0px",
                                        backgroundColor: userIsOwner ? "#d9e6f7" : "#F4F6F7",
                                        color: userIsOwner ? "#537EAB" : "black",
                                        wordWrap: "break-word",
                                    }}
                                    primary={message.content}
                                    className={classes.message}
                                ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText
                                    align={
                                        user.email === message.user.email ? "right" : "left"
                                    }
                                    secondary={moment(message.timestamp).format("hh:mm")}
                                ></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                );
            })}
            <div ref={messagesEndRef} />
        </React.Fragment>
    )
}

export default Messages
