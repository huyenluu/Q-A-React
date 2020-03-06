import React from 'react';
import Appbar from './views/AppBar';
import QuestionsHome from './views/QuestionsHome'
import QuestionPage from './views/QuestionPage'
import { Route, Switch, Redirect, } from "react-router-dom";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import theme from './theme.json'
import SignUp from './views/Signup';
import Login from './views/Login'
import * as ajax from './ajax';
import { withRouter } from "react-router-dom";

const {palette} = theme
const customTheme = createMuiTheme({
   palette
})

class App extends React.Component {

  state = {
    currentUser: {},
    loggedIn: false,
  }
  componentDidMount(){
    // TODO - get currentUser from local storage
    const currentUser = localStorage.getItem('user')
    if (currentUser !== undefined && currentUser !== null ) {
      this.setState({
      currentUser:JSON.parse(currentUser),
      loggedIn: true,
    })
    }
  }

  submitUser = (dataToSubmit) =>{
    
    ajax.signUp(dataToSubmit)
      .then( r => {
        if(r.error) {
          console.log(r.error)

          //TODO - display error to user

        }
        else{ 
          console.log('success')
          this.setState({
            currentUser: r,
            loggedIn: true
          })
          
          //TODO - sync with localstorage

          localStorage.setItem('user', JSON.stringify(r))

          console.log(this.state.currentUser)
        }
      })
      .catch(e => {
        console.error(e);
        })
  }

  signInUser = (dataToSubmit) =>{
    
    ajax.signIn(dataToSubmit)
      .then( r => {
        if(r.error) {
          console.log(r.error)
          //TODO - display error to user
        }
        else{ 
          console.log('sign in success')
          this.setState({
            currentUser: r,
            loggedIn: true
          })
          
          //TODO - sync with localstorage
          localStorage.setItem('user', JSON.stringify(r))
          console.log(this.state.currentUser)
        }
      })
      .catch(e => {
        console.error(e);
        })
  }

  handleSignOut = () => {
    this.setState({
      currentUser: {},
      loggedIn: false
    })
    localStorage.removeItem('user');
  }

  render(){
    
    return (
    
      <div className = "App">
        <MuiThemeProvider theme = {customTheme}>
          
          <Appbar currentUser ={this.state.currentUser} handleSignOut ={this.handleSignOut} />
          <Switch>

            <Route exact path="/questions">
              <QuestionsHome currentUser ={this.state.currentUser} loggedIn = {this.state.loggedIn}/>
            </Route>
           
            <Route path="/questions/:questionId" >
              <QuestionPage currentUser ={this.state.currentUser} loggedIn = {this.state.loggedIn}/>
            </Route>
  
            <Route path ="/sign-up">
              {!this.state.loggedIn ? <SignUp submitUser ={this.submitUser}/> : <Redirect to ='questions'/> }            
            </Route>

            <Route path ="/sign-in"> 
              {!this.state.loggedIn ? <Login signInUser ={this.signInUser}/> : <Redirect to ='questions'/> }
            </Route>
  
            <Redirect to="/questions" />
          </Switch>
          
        </MuiThemeProvider>
      </div>
    )
  }
  
  
}
export default withRouter(App);