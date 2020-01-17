import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyAvatar from './Avatar';

const AnswerForm = (props) => {
    return (
      <div>
        <h3>Add an Answer</h3>
        <Divider/>
        <Grid container>
              <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}}>
                <MyAvatar/>
              </Grid>
              <Grid item item xs={12} sm ={9}>
                <p> Posting by {props.userName}</p>
                <form onSubmit = {props.handleSubmit}>
                  <TextField
                        type = "text"
                        name="answer"
                        id="answer"
                        label="your answer ..."
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value ={props.answer}
                        onChange ={props.handleChange}
                      />
                  <button className = 'btn'>Submit</button>
                </form>
              </Grid>
          </Grid>  
      
      </div>
      

    )
}

export default AnswerForm;



{/* <ListItem>
          <ListItemAvatar >
            <Avatar alt="U" src="https://www.adherehealth.com/wp-content/uploads/2018/09/avatar.jpg" /> 
          </ListItemAvatar>
          <div>
          <Typography
              component="p"
              variant="body2"
              color="textPrimary"
          >
              {props.userName}
              
          </Typography>  
        <br/>
         <form onSubmit = {props.handleSubmit} style ={{ width: 830}}>
                <TextField
                      type = "text"
                      name="answer"
                      placeholder="your answer ..."
                      multiline
                      rows="4"
                      variant="outlined"
                      fullWidth
                      value ={props.answer}
                      onChange ={props.handleChange}
                    />
                
                <Button variant = 'outlined' secondary style ={{ marginTop: 10}}>Submit</Button>
              </form>
          </div>
        </ListItem> */}