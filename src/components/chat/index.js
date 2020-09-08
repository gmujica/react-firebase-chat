import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';   
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import NewMessaje from './NewMessage';

const useStyles = makeStyles(theme => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
      height: '70vh'
    },
    list: {
      marginBottom: theme.spacing(3),
      maxHeight: '100%',
      overflow: 'auto'
    }
}));

const Chat = ({ history }) => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);

    const chatDomRef = useRef();

    const addMessage = (message) => {
        messages.push(message);

        setMessages([...messages.sort((a, b) => a.date - b.date)]);

        if(chatDomRef.current) {
            chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const chatRef = firebase.database().ref('/chat');

        chatRef.on(
            'child_added',
            snapshot => {
                // nuevo mensaje
                const messageItem  = snapshot.val();
                // leer los datos  del usuario
                firebase.database().ref(`/users/${messageItem.user}`)
                .once('value')
                .then(userResp  => {
                    messageItem.user = userResp.val();
                    addMessage(messageItem);
                })
            },
            error => {
                //console.log(error);
                if(error.message.includes('permission_denied')){
                    history.push('/login');
                }
            }
        )
    }, [addMessage]);

    return (
        <Container>
            <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                Chat
                </Typography>
                <List className={classes.list} ref={chatDomRef}>
                    {messages.map(({ date, user, message }) => (
                        <ListItem button key={date}>
                            <ListItemAvatar>
                                <Avatar alt={user.name} src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={user ? user.name : 'anonymous'} secondary={message} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
                <NewMessaje />
        </Container>    
    );
};

export default withRouter(Chat);