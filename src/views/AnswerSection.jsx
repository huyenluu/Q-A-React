import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MyAvatar from './Avatar';

const useStyles = makeStyles(theme => ({
answer_header: {
display: 'flex',
flexDirection: 'row',
}
   
  }));

function AnswerSection(props) {
    const classes = useStyles();
    return (
        
        <div>
            <h3> Answers</h3>
            <Divider/>
            <List>
                {
                    props.answers.length !== 0 &&
                    props.answers.map(
                        (answer,index) => (

                            <Grid container>
                                <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}} >
                                    <MyAvatar/>
                                </Grid>
                                <Grid item xs={12} sm ={9}>
                                    <p>{props.users[index].name} </p>
                                    <p>{answer.text}</p>
                                </Grid>
                                <Divider/>
                            </Grid>                               
                          
                        )
                    )
                }
            </List>
            
        </div>
    )
}

export default AnswerSection;