import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MyAvatar from './Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function AnswerSection({answersAndUsers, currentUser, loggedIn, handleEditBtn, handleDeleteBtn}) {
    const matches = useMediaQuery('(max-width:750px)')
    return (

        <div>
            <h3> Answers</h3>
            <Divider/>
            <List>
                {
                answersAndUsers.length === 0
                ?(
                    <Grid container>
                        <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center'}} >
                            {loggedIn ? <MyAvatar/> : null}
                        </Grid>
                        <Grid item xs={12} sm ={9}>
                            <p> Be first to add a comment!</p>
                        </Grid>
                    </Grid>

                )
                : answersAndUsers.map(
                        (answer,index) => (

                            <Grid container key = {answer.id}>
                                <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}} >
                                    <MyAvatar/>
                                </Grid>
                                <Grid item xs={7} sm ={9}  style ={ matches ? { paddingLeft: '20px'} : null}>
                                    <p style ={{fontWeight: 700}}>
                                       {answer.name}
                                    </p>
                                    <p> {answer.text}</p>
                                </Grid>

                                    <Button onClick ={handleEditBtn(answer.id)}><EditIcon/></Button>
                                    <Button onClick ={handleDeleteBtn(answer.id)}><DeleteOutlineIcon/></Button>


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