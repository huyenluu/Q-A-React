import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyAvatar from './Avatar';

function QuestionSection(props) {
    return (
        <Grid container>
          <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}} >
            <MyAvatar/>
          </Grid>
          <Grid item xs={12} sm ={9}>
            <p> Posted by {props.user.name} at {new Date(props.question.createdAt).toLocaleDateString("en-US")}</p>
            <h1>{props.question.title}</h1>
            <p>{props.question.description}</p>
          </Grid>
        </Grid>
    )
}

export default QuestionSection;
