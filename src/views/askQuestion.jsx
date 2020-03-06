import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
  card: {
    minWidth: 275,
    height: 30,
    padding: "20px 30px",
  },
  cardBox: {
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  dialogContent: {
    textAlign: 'center',
    paddingBottom: '40px'
  }
}));

export default function AskQuestion({ userId, handleSubmit, loggedIn }) {
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState({
    title: '',
    description: ''
  })

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataToSubmit = {
    question: inputValue.title,
    description: inputValue.description,
    createdAt: Date.now(),
    userId: userId
  }

  const handleSubmitForm = (e) => {
    setOpen(false);
    e.preventDefault()

    handleSubmit(dataToSubmit)

    setInputValue({
      title: '',
      description: ''
    })
  };

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div className={classes.cardBox}>
        <CardActionArea>
          <Card onClick={handleClickOpen} className={classes.card}>

            <Typography className={classes.title} >
              Ask a question...
            </Typography>

          </Card>
        </CardActionArea>
      </div>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >Ask question</DialogTitle>
        <DialogContent>
          {
            loggedIn
              ? (<form className={classes.container}>
                <TextField
                  name='title'
                  placeholder='Title of your question'
                  value={inputValue.title}
                  onChange={handleChange}
                  className={classes.textField}
                  variant="outlined"
                />
                <br />
    
                <TextField
                  name='description'
                  placeholder='Add question details...'
                  value={inputValue.description}
                  onChange={handleChange}
                  multiline
                  rows="4"
                  variant="outlined"
                  className={classes.textField}
                />
              </form>) 
              : (<div className = {classes.dialogContent}>
                <h3>Please sign in in order to post a question</h3>
                <Link to='sign-in'>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Sign in
                  </Button>
                </Link>
                </div>
              )
      }
        </DialogContent>
      {
        loggedIn ?(
          <>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSubmitForm} color="primary">
            submit
            </Button>
        </DialogActions>
          </>
        ):null
      }
      </Dialog>
    </div>
  );
}
