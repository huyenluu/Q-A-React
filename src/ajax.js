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