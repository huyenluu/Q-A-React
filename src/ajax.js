export const QA_URl = "https://desolate-woodland-95121.herokuapp.com/"

export const getQuestion = (questionId) => {
  return fetch(`${QA_URl}questions/${questionId}`).then(r => r.json())
        
}

export const getUsers = (userId) => {
  return fetch(`${QA_URl}users/${userId}`).then(r => r.json())
}

export const getAnswers = (questionId) => {
  return fetch(`${QA_URl}answers?questionId=${questionId}`).then(r => r.json())
}

export const fetchPost = (dataToPost, param) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToPost),
  };

  return fetch(`${QA_URl+param}`, config)
    .then(res => res.json())
}

export const signUp = (dataToPost) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToPost),
  };

  return fetch("http://localhost:8081/signup", config)
    .then(res => res.json())
}
export const signIn = (dataToPost) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToPost),
  };

  return fetch("http://localhost:8081/signin", config)
    .then(res => res.json())
}