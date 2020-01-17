import React, {useState} from 'react';
import Appbar from './views/AppBar';
import QuestionsHome from './views/QuestionsHome'
import QuestionPage from './views/QuestionPage'
import { BrowserRouter, Route, Switch, Redirect, } from "react-router-dom";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import theme from './theme.json'

const {palette} = theme
const customTheme = createMuiTheme({
   palette
})

function App() {
  
  
  return (
    
    <div className = "App">
      <MuiThemeProvider theme = {customTheme}>
        <BrowserRouter>
        <Appbar />
        <Switch>
         {/* <Route
            exact
            path="/"
            component={AuthenticationPage}
          />   */}
          <Route
            exact
            path="/questions"
            component={QuestionsHome}
          />

          <Route
            path="/questions/:questionId"
            component={QuestionPage}
          />

          <Redirect to="/questions" />
        </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  )
}
export default App;