import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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

  export default function Login({submitUser}) {
    const classes = useStyles();

    const [inputValue, setInputValue] = useState({
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })

    const dataToSubmit ={
      email: inputValue.email,
      password: inputValue.password,
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      submitUser(dataToSubmit, 'signin')

      setInputValue({
        email: '',
        password: '',
      })

    };


    const handleChange =(e) => {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value
      })
    }

    return (

      <Container component="main" maxWidth="sm">

        <CssBaseline />

        <div className={classes.paper}>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit ={handleSubmit}>
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
              value= {inputValue.email}
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
              value= {inputValue.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to = '#' variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to ='/sign-up'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>

        </Box>
      </Container>
    );
  }
