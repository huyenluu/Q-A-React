import React from 'react';
import Appbar from './views/AppBar';
import QuestionsHome from './views/QuestionsHome'
import QuestionPage from './views/QuestionPage'
import { Route, Switch, Redirect, } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import theme from './theme.json'
import SignUp from './views/Signup';
import Login from './views/Login'
import * as ajax from './ajax';
import { withRouter } from "react-router-dom";

const { palette } = theme
const customTheme = createMuiTheme({
  palette
})

class App extends React.Component {

  state = {
    currentUser: {},
    loggedIn: false,
    token: null,
    displayError: false,
  }
  componentDidMount() {

    // get currentUser & token from local storage
    const data = JSON.parse(localStorage.getItem('user'))
    if (data !== undefined && data !== null) {
      this.setState({
        currentUser: data.user,
        loggedIn: true,
        token: data.token
      })
    }
  }

  submitUser = (dataToSubmit, authType) => {

    ajax.auth(dataToSubmit, authType)
      .then(r => {
        if (r.error) {
          console.log(r.error)
          this.setState({
            displayError: true
          })

        }
        else {
          console.log('success')
          this.setState({
            currentUser: r.user,
            loggedIn: true,
            token: r.token
          })

          // sync with localstorage
          localStorage.setItem('user', JSON.stringify(r))
        }
      })
      .catch(e => {
        console.error(e);
        this.setState({
          displayError: true
        })
      })
  }

  handleSignOut = () => {
    this.setState({
      currentUser: {},
      loggedIn: false
    })
    localStorage.removeItem('user');
  }

  render() {

    return (

      <div className="App">
        <MuiThemeProvider theme={customTheme}>

          <Appbar currentUser={this.state.currentUser} handleSignOut={this.handleSignOut} loggedIn ={this.state.loggedIn} />
          <Switch>
            <Route exact path="/questions">
              <QuestionsHome {...this.state} />
            </Route>

            <Route path="/questions/:questionId" >
              <QuestionPage {...this.state} />
            </Route>

            <Route path="/sign-up">
              {!this.state.loggedIn ? <SignUp submitUser={this.submitUser} /> : <Redirect to='questions' />}
            </Route>

            <Route path="/sign-in">
              {!this.state.loggedIn ? <Login submitUser={this.submitUser} /> : <Redirect to='questions' />}
            </Route>

            <Redirect to="/questions" />
          </Switch>

        </MuiThemeProvider>
      </div>
    )
  }


}
export default withRouter(App);