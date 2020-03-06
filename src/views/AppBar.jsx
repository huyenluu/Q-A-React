import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

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
  title_a: {
    textDecoration: 'none',
    color: 'white'
  }
}));

export default function MyAppBar({ currentUser,handleSignOut }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" className={classes.title} >
            <a href="/" className={classes.title_a}>WCS Forum</a>
          </Typography>
          {
            Object.keys(currentUser).length === 0 && currentUser.constructor === Object
              ? (
                <div>
                  <Button color="inherit">
                    <Link to="/sign-up">
                      Sign up
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link to="/sign-in">
                      Sign in
                    </Link>
                  </Button>
                </div>
              )
              : (
                  
                  <p>welcome, {currentUser.name}
                    <Button color="inherit" onClick ={handleSignOut}>
                        Sign Out
                    </Button>
                  </p>
                  
                )
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}