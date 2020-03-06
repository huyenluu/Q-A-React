import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton';

import AnswerForm from './AnswerForm';
import QuestionSection from './questionSection'
import AnswerSection from './AnswerSection';

import { Link } from "react-router-dom"
import * as ajax from '../ajax'
import '../App.css';

function QuestionPage({ currentUser, loggedIn }) {

  const { questionId } = useParams();

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [userQuestion, setUserQuestion] = useState();
  const [usersAnswer, setUsersAnswer] = useState();
  const [postAnswer, setPostAnswer] = useState();

  const QA_URl = "https://desolate-woodland-95121.herokuapp.com/"


  useEffect(
    () => {
      ajax.getQuestion(questionId)
        .then(question => {

          setQuestion(question)

          ajax.getUsers(question.userId)
            .then(user => setUserQuestion(user))
        })
      return 
    } , [questionId]
  )

  useEffect(
    () => {
      ajax.getAnswers(questionId)
        .then(answers => {
          setAnswers(answers)
        })
    } ,[questionId]
  )
  useEffect(
    () => {
      if (answers !== undefined) {
        Promise.all(
          answers.map(
            answer =>
              ajax.getUsers(answer.userId)
          )
        ).then(users => setUsersAnswer(users))
      }
    }, [answers])

  const answerData = {
    userId: currentUser.id,
    questionId: questionId,
    text: postAnswer
  }

  function handleSubmit(e) {
    e.preventDefault()
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerData),
    };

    fetch(`${QA_URl}answers`, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {

          setUsersAnswer([
            ...usersAnswer,
            currentUser])

          setAnswers([
            ...answers,
            answerData
          ])
          setPostAnswer('')

        }
      })
      .catch(e => {
        console.error(e);
        alert('Error');
      })

  }
  function handleChange(e) {
    setPostAnswer(e.target.value)
  }

  let questionSection = (question && userQuestion)
    ? <QuestionSection
      user={userQuestion}
      question={question}
    />
    : <Skeleton variant="rect" width={600} height={100} />

  let answersSection = (answers && usersAnswer)
    ? (<AnswerSection answers={answers} users={usersAnswer} currentUser={currentUser} />)
    : null

  let postAnswerSection = !loggedIn
    ? (
      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <p>Please sign in in order to post a question</p>
        <Link to='sign-in'>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
          >
            Sign in
          </Button>
        </Link>
      </div>
    )
    : (<AnswerForm
      userName={currentUser.name}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      answer={postAnswer}
    />)

  return (

    <Container style={{ backgroundColor: '#f9fafa', marginTop: 50, paddingTop: '32px', paddingBottom: '32px', marginBottom: 50 }} >
      <List style={{
        width: '100%',
        padding: '0 30'
      }}>
        {questionSection}
        {answersSection}
        {postAnswerSection}
      </List>
    </Container>

  )

}

export default QuestionPage;