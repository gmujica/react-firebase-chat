import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InfoModal from '../InfoModal';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Chat App
          </Typography>
          {props.children}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <InfoModal />
          </IconButton>
          <IconButton edge="start" href="https://github.com/gmujica/react-firebase-chat" target="_blank" className={classes.menuButton} color="inherit" aria-label="menu">
            <GitHubIcon />
          </IconButton>
          <IconButton edge="start" href="https://www.linkedin.com/in/gregory-mujica-2a0400b6/" target="_blank" className={classes.menuButton} color="inherit" aria-label="menu">
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
