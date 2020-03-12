import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MyAvatar from './Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: 16,
        outline: 'none'
    }
}));

function AnswerSection({ answers, users, loggedIn, handleEditBtn, handleDeleteBtn }) {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:750px)')
    const findMatchingUser = (answer) => {
        return users.find(el => el.id === answer.userId)
    }
    let matchingUser
    const [isDisabled, setdisabled] = useState(false)

    if (users.length === 0) {
        return (
            <div>
                <h3> Answers</h3>
                <Divider />
                <List>
                    <Grid container>
                        <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center' }} >
                            {loggedIn ? <MyAvatar/> : null}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <p> Be first to add a comment!</p>
                        </Grid>
                    </Grid>
                </List>
                <Divider />
            </div>
        )
    } else {
        return (
            <div>
                <h3> Answers</h3>
                <Divider />
                <List>
                    {answers.map(
                        (answer) => {
                            matchingUser = findMatchingUser(answer)
                            return (
                                <Grid container key={answer.id}>
                                    <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }} >
                                        <MyAvatar/>
                                    </Grid>
                                    <Grid item xs={7} sm={9} style={matches ? { paddingLeft: '20px' } : null}>
                                        <p style={{ fontWeight: 700 }}>
                                            {matchingUser.name}
                                        </p>
                                        <form>
                                            <input
                                                type="text"
                                                value={answer.text}
                                                className={classes.input}
                                                disabled={isDisabled ? "disabled" : ""}
                                            />
                                        </form>
                                    </Grid>
                                    <Button onClick={() => handleEditBtn(answer.id)}><EditIcon /></Button>
                                    <Button onClick={() => handleDeleteBtn(answer.id)}><DeleteOutlineIcon /></Button>
                                    <Divider />
                                </Grid>
                            )
                        }
                    )
                    }
                </List>
                <Divider />
            </div>
        )
    }
}

export default AnswerSection;