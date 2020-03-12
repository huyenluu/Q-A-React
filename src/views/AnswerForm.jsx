import React , {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MyAvatar from './Avatar';

const AnswerForm = (props) => {

  const {user, handleSubmit,questionId} = props
  const [answerInput, setAnswerInput] = useState();

  function handleChange(e) {
    setAnswerInput(e.target.value)
  }
  const answerData = {
    userId: user.id,
    questionId: questionId,
    text: answerInput
  }

  function handleFormSubmit(e){
    e.preventDefault()
    handleSubmit(answerData)
    setAnswerInput('')
  }
    return (
      <div>
        <Grid container>
              <Grid item xs={1} style ={ {display: 'flex', justifyContent: 'center', paddingTop: 16}}>
                <MyAvatar />
              </Grid>
              <Grid item xs={12} sm ={9}>
                <p> Posting by {user.name}</p>
                <form onSubmit = {handleFormSubmit}>
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
                        value ={answerInput}
                        onChange ={handleChange}
                      />
                  <button className = 'btn'>Submit</button>
                </form>
              </Grid>
          </Grid>

      </div>
    )
}

export default AnswerForm;
