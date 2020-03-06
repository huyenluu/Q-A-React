import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MyAvatar from './Avatar';


function AnswerSection({answers, currentUser, users}) {
    return (
        
        <div>
            <h3> Answers</h3>
            <Divider/>
            <List>
                {
                   answers.length !== 0 &&
                   answers.map(
                        (answer,index) => (

                            <Grid container key = {answer.id}>
                                <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}} >
                                    <MyAvatar/>
                                </Grid>
                                <Grid item xs={12} sm ={9}>
                                    <p>
                                    { users[index] !== undefined ? users[index].name : currentUser.name} 
                                    </p>
                                    <p>{answer.text}</p>
                                </Grid>
                                <Divider/>
                            </Grid>                               
                          
                        )
                    )
                }
            </List>
            <Divider/>
        </div>
    )
}

export default AnswerSection;