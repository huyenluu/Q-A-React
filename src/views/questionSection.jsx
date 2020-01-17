import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import MyAvatar from './Avatar';

function QuestionSection(props) {
    return (
        <Grid container>
          <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}} >
            <MyAvatar/>
          </Grid>
          <Grid item xs={12} sm ={9}>
            <p> Posted by {props.user.name} at {new Date(props.question.createdAt).toLocaleDateString("en-US")}</p>
            <h1>{props.question.question}</h1>
            <p>{props.question.description}</p>
          </Grid>
        </Grid>
    )
}

export default QuestionSection;
