import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles }  from  '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        paddingTop: 15,
      paddingBottom: 20
    },
    message: {
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: '0 20px'
    },
    box: {
        height: '100%',
        paddingLeft: 20,
    }
}));

const NewMessage = () => {
    const classes = useState(); 
    const  [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const { currentUser } = firebase.auth();
        if (!currentUser) return;

        const NewMessage = {
            user: currentUser.uid,
            message,
            date: firebase.database.ServerValue.TIMESTAMP
        };
        firebase.database().ref('/chat').push(NewMessage)
        .then(res => {
            setMessage('');
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
            
        })
    };

    return (
        <Paper square className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={0} direction='row' className={classes.message}>
                    <Grid item xs={10}>
                        <TextField
                            margin="normal"
                            name="message"
                            required
                            fullWidth
                            id="message"
                            label="Mensaje"
                            autoFocus
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" alignItems="center" className={classes.box}>
                            <Button
                                variant='contained'
                                color='primary'
                                endIcon={<Icon>send</Icon>}
                                fullWidth
                                disabled={!message.length}  
                            >
                                Enviar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );

};

export default NewMessage;