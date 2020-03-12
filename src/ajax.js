export const API_URl = "https://question-answer-forum.herokuapp.com"

export const auth = (dataToPost, authType) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToPost),
  };

  return fetch( `${API_URl}/${authType}`, config)
    .then(res => res.json())
}

export const getAllQuestions = () => {

  return fetch(`${API_URl}/questions`).then(res => res.json())

}

export const getQuestionById = (id) => {

  return fetch(`${API_URl}/questions/${id}`).then(r => r.json())

}

export const postAQuestion = (dataToPost, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var urlencoded = new URLSearchParams();
  urlencoded.append("title", dataToPost.title);
  urlencoded.append("description", dataToPost.description);
  urlencoded.append("userId", dataToPost.userId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch(`${API_URl}/questions`, requestOptions)
    .then(response => response.json())
}

export const deleteAnswerById = (id, token) => {

  return fetch(`${API_URl}/answers/${id}`, {
    method: "delete",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(r => r.json())

}

export const getAllUsers = () => {

  return fetch(`${API_URl}/users`).then(r => r.json())

}

export const getUserById = (id) => {

  return fetch(`${API_URl}/users/${id}`).then(r => r.json())

}

export const getAnswersByQuestionId = (id) => {

  return fetch(`${API_URl}/answers/search?questionId=${id}`).then(r => r.json())

}

export const postAnswer = (dataToPost, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var urlencoded = new URLSearchParams();
  urlencoded.append("text", dataToPost.text);
  urlencoded.append("questionId", dataToPost.questionId);
  urlencoded.append("userId", dataToPost.userId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch(`${API_URl}/answers`, requestOptions)
    .then(response => response.json())
}

export const deleteQuestionById = (id, token) => {

  return fetch(`${API_URl}/questions/${id}`, {
    method: "delete",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(r => r.json())

}

export const updateAnswerById = (id, dataToPost, token) => {

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(dataToPost),
  };

  return fetch(`${API_URl}/answers/${id}`, config)
    .then(res => res.json())

}