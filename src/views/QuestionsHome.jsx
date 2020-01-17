import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Snackbar from '@material-ui/core/Snackbar';
import * as ajax from '../ajax';
import AskQuestion from "./askQuestion";

import { makeStyles } from '@material-ui/core/styles';
import { CardContent, IconButton } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MyAvatar from "./Avatar";
import MySnackbarContentWrapper from './MySnackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: 50,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  }
}));

export default function QuestionsHome(){

  const classes = useStyles();

  const [questions, setQuestions] =useState()
  const [users, setUsers] = useState()
  const currentUser = {
    userId: 3,
    Name: 'Huyen Luu'
  }
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [variant, setVariant] = useState('info');

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSelected, setCurrentSelected] = useState()
  const [favoriteQuestions, setFavoriteQuestions] = useState([])
  const [openFavorite, setOpenFavorite]=useState(false)
  
  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  }
  const handleClickMenu = id => event => {
    setAnchorEl(event.currentTarget);
    setCurrentSelected(id);
  }


  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteItem = (e) => {
    const index = displayedQuestions.findIndex( el => el.id === currentSelected)
    displayedQuestions.splice(index,1)
    handleCloseMenu(e)
    fetch(`${ajax.QA_URl}questions/${currentSelected}`, {method: 'delete'})
  }

  const addToFavorite = (e) => {
    const index = displayedQuestions.findIndex( el => el.id === currentSelected)

    setFavoriteQuestions([
      displayedQuestions[index].id,
      ...favoriteQuestions
    ])
    handleCloseMenu(e)
  }
  
  const openFavoriteQuestions = () => {
    setOpenFavorite(!openFavorite)
  }

  useEffect(() => {
    ajax.getQuestion('')
      .then(questions => {

        setQuestions(questions)
        
        Promise.all(
          questions.map(
            question => {
              console.log(question.userId)
             return ajax.getUsers(question.userId)
            }
          )
        ).then(users => setUsers(users))
       
      })
      
    }
  , [])

  const handleSubmit = (dataToSubmit) =>{
    
    ajax.fetchPost(dataToSubmit, 'questions')
      .then( r => {
        if(r.error) {
          handleClickSnackBar()
          setVariant('error')
        }
        else{ 
          handleClickSnackBar()
          setVariant('success')

          setUsers([
           currentUser,
           ...users,
          ])

          setQuestions([
            dataToSubmit,
            ...questions
          ])
          
          console.log([
            dataToSubmit,
            ...questions
          ])
          
        }
      })
      .catch(e => {
        console.error(e);
        handleClickSnackBar()
        setVariant('error')
        })
  }

    

  if (users === undefined) {
    return <div>Loading ...</div>}
  else if(questions === undefined) return <div>Loading ...</div>

  let displayedQuestions = questions

  if (openFavorite) {
    console.log(favoriteQuestions)
    console.log(displayedQuestions.filter(el => favoriteQuestions.indexOf(el.id) !== -1))
    displayedQuestions = displayedQuestions.filter(el => favoriteQuestions.indexOf(el.id) !== -1)
  }
  else {
    displayedQuestions = questions
  }

  let questionCard = displayedQuestions.map( (question,index) => 
     (
        <Card className ={classes.card} key = {question.id}>
          <CardHeader
            style = {{paddingLeft: 30}}
            avatar= {
              <MyAvatar/>
            }
            action={
              <IconButton aria-label="settings" onClick={
                  handleClickMenu(question.id)
              }>
                <MoreVertIcon />
              </IconButton>
            }
            title= {`Posted by ${users.find(user => user.id === question.userId).name} on ${ new Date(question.createdAt).toDateString()}`}
          />
          <Link to={`/questions/${question.id}`} style ={ { textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}> 
           
            <CardContent style = {{paddingTop: 0, paddingLeft: 40}}>
            <h1 style ={{marginTop: 0}}>{question.question}</h1>
            <p>{question.description}</p>
            </CardContent>

          </Link>
          
        </Card>
    )
  )
  return(
        <Container>
        <AskQuestion userId ={currentUser.userId} handleSubmit={handleSubmit}/>
        <List style ={{
          width: '100%',
          paddingTop: 0
        }}>
          <ListItem divider style ={{ position: 'relative', height: 55, backgroundColor: '#f9fafa'}}>
            <Button 
            variant = 'outlined' 
            color = 'primary'
            style ={{ position: 'absolute',
                    right: 30}}
            onClick ={openFavoriteQuestions}
            > 
             {openFavorite? 'All Questions' : 'My favorite questions'} 
            </Button>
          </ListItem>
         {questionCard}
        </List>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <MySnackbarContentWrapper
              onClose={handleCloseSnackBar}
              variant={variant}
              message={ variant === 'success' ? "Your question have been succesful posted!" : "Sorry, error posting your question"}
            />
          </Snackbar>
          <Menu
            id="menuMoreVers"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={deleteItem}>Delete</MenuItem>
            <MenuItem onClick={addToFavorite}>Add to favorite</MenuItem>
          </Menu>
      </Container>
  )

}



