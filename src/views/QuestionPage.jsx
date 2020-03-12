import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import AnswerForm from './AnswerForm';
import QuestionSection from './questionSection'
import AnswerSection from './AnswerSection';
import { Link } from "react-router-dom"
import * as ajax from '../ajax'
import '../App.css';
function QuestionPage(props) {

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [userQuestion, setUserQuestion] = useState();
  const [usersAnswer, setUsersAnswer] = useState([]);
  const { questionId } = useParams();
  const { currentUser, loggedIn, token } = props;

  const getData = useCallback(
    () => {

        ajax.getAnswersByQuestionId(questionId)
          .then(answers => {
            console.log(answers)
            setAnswers(answers)
            Promise.all(
              answers.map(
                answer =>
                  ajax.getUserById(answer.userId)
              )
            ).then(users => {
              console.log(users)
              setUsersAnswer(users)
            })

          })
    },
    [questionId],
  );

  useEffect(
    () => {

      ajax.getQuestionById(questionId)
        .then(question => {
          setQuestion(question)
          ajax.getUserById(question.userId)
            .then(user => setUserQuestion(user))
        })
      getData()
    }, [questionId, getData]
  )


  const handleSubmit = answerData => {

    ajax.postAnswer(answerData, token)
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          getData()
        }
      })
      .catch(e => {
        console.error(e);
        alert('Error');
      })

  }

  const handleEditBtn = id => {


  }

  const handleDeleteBtn = (id) => {
debugger
console.log('cliked')
    const index = answers.findIndex(el => el.id === id)
    const copyArr = [...answers]
    copyArr.splice(index, 1)
    setAnswers(copyArr)
    ajax.deleteAnswerById(id, token)
  }


  return (

    <Container style={{ backgroundColor: '#f9fafa', marginTop: 50, paddingTop: '32px', paddingBottom: '32px', marginBottom: 50 }} >
      <List style={{ width: '100%', padding: '0 30' }}>

        {(question && userQuestion) ? <QuestionSection user={userQuestion} question={question} /> : <div>Loading...</div>}

        {(answers && usersAnswer) ? (
          <AnswerSection
            answers={answers}
            users={usersAnswer}
            {...props}
            handleDeleteBtn={handleDeleteBtn}
            handleEditBtn={handleEditBtn}
          />

        ) : null}

        {!loggedIn
          ? (
            <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
              <p>Please sign in in order to post a answer</p>
              <Link to='/sign-in'>
                <Button variant="contained" color="secondary">
                  Sign in
                </Button>
              </Link>
            </div>
          )
          : (<AnswerForm
            user={currentUser}
            handleSubmit={handleSubmit}
            questionId={questionId}
          />)}
      </List>
    </Container>

  )

}

export default QuestionPage;