
function getQuestion(id){
    fetch(
        `https://desolate-woodland-95121.herokuapp.com/questions?"id=${id}`
      )
      .then(r => r.json())
}

export default getQuestion;
