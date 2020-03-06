import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MySnackbarContentWrapper from './MySnackbar';
import Snackbar from '@material-ui/core/Snackbar';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ submitUser }) {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [openAlert, setOpenAlert] = useState(false)

  const dataToSubmit = {
    name: inputValue.name,
    email: inputValue.email,
    password: inputValue.password,
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.password !== inputValue.passwordConfirmation) {
      setOpenAlert(true)

      setInputValue({
        ...inputValue,
        password: '',
        passwordConfirmation: ''
      })
    } else {
      submitUser(dataToSubmit) 
      setInputValue({
      name:'',
      email:'',
      password: '',
      passwordConfirmation: ''
    })
    }
  };

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (

    <Container component="main" maxWidth="sm">

      <CssBaseline />
      <div className={classes.paper}>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={openAlert}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant = 'error'
            message = 'The password confirmation does not match!'
          />
        </Snackbar>

        <Typography component="h1" variant="h5">
          Sign up
          </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your name"
            name="name"
            autoComplete="name"
            autoFocus
            value={inputValue.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputValue.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm your password"
            type="password"
            id="passwordConfirmation"
            value={inputValue.passwordConfirmation}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign up
            </Button>
        </form>
      </div>
      <Box mt={8}>

      </Box>
    </Container>
  );
}
