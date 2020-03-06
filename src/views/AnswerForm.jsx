import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MyAvatar from './Avatar';

const AnswerForm = (props) => {
    return (
      <div>
        <Grid container>
              <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}}>
                <MyAvatar/>
              </Grid>
              <Grid item xs={12} sm ={9}>
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
