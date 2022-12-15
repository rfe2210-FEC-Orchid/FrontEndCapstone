import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Answers from './Answers.jsx';
import AnswerModal from './AnswerModal.jsx';

const Question = styled.div`
display: inline-block;
vertical-align: middle;
width: 80%;
font-size: 20px;
`

const QuestionButton = styled.div`
 display: flex;  flex-wrap: wrap;  align-content: stretch;
`

const Container = styled.div`
width: 100%;
display: flex;  flex-wrap: wrap;  align-content: stretch;
`
const Helpful = styled.div`
font-size: 13px;
color:rgb(150, 141, 141);
`
const Button = styled.div`
font-size: 13px;
padding: 0;
border: none;
background: none;
color: rgb(150, 141, 141);
&:hover {
  color:#080707;
  cursor:pointer;
}
`

const Divider = styled.div`
width:5px;
height:auto;
display:inline-block;
`

const AButton = styled.div`
font-family: Nunito Sans, sans-serif, Daniel;
background-color:#fefef;
border: none;
outline: none;
color:#800F67;
font-size: 18px;
&:hover {
  color:#070101;
  cursor:pointer;
}
`

const QuestionList = ({name, question}) => {

  let sortedAnswers = Object.values(question.answers).sort((function(a,b){
    return b.helpfulness-a.helpfulness
  })).sort(function (a, b) {
    if (a.answerer_name ==="Seller") {
      return -1;
    }
    if (b.answerer_name == "Seller") {
      return 1;
    } else { return 0 }
  })

  const [qA, setQA] = useState(sortedAnswers);

  const [ url, setUrl ] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(true);
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [modalA, setModalA] = useState(false);
  const [modalFormA, setModalFormA] = useState({});
  const [formErrorA, setFormErrorA] = useState(false);
  const [numberOfA, setNumberOfA] = useState(2)
  const [questionList, setQuestionList] = useState([])

  useEffect(()=> {
    setQuestionList(qA.slice(0,numberOfA))
    },[question])


  const handleMoreAnswers = () => {
    setQuestionList(qA.slice(0,numberOfA+2))
    if (numberOfA+2 >= qA.length) {
      setMoreAnswers(false);
    }

    setNumberOfA(numberOfA+2)
  }

  const handleHelpfulQ = () => {
    axios.put(`http://localhost:3001/qa/questions/${question.question_id}/helpful`)
    .then(res => console.log(res))
    setHelpful(helpful+1)
  }

  const handleAddAnswer = () => {
    setModalA(!modalA)  }

  const handleAFormSubmit = (e) => {
    e.preventDefault()
    if (Object.values(modalFormA).length >= 3) {
      axios.post(`http://localhost:3001/qa/questions/${question.question_id}/answers`,
        {
          body:modalFormA.answer,
          name:modalFormA.nickname,
          email:modalFormA.email,
          photos: []
        }
      )
      .then(res => console.log(res))
      setQA([...qA, {
        body: modalFormA.answer,
        answerer_name: modalFormA.nickname,
        answers:{},
        helpfulness: 0,
        date: new Date(),
        photos: url
      }] )

      setModalA(false)
    }
    else {
      setFormErrorA(true)
   }
  }

return(
  <div>
    <p></p>
  <Container>
    <Question>
    <b>Q:{"  " + question.question_body}</b>
    </Question>
    <QuestionButton>
    <Helpful>
    Helpful?
    </Helpful>
    <Divider/>
    <Button onClick={handleHelpfulQ}> <u>Yes</u>({helpful})</Button>
    <Divider/>
    <Button onClick={handleAddAnswer}><u>Add Answer</u></Button>
    </QuestionButton>

  </Container>
  <p></p>
  {modalA &&
    <div>
      <AnswerModal handleAddAnswer ={handleAddAnswer} url={url} setUrl={setUrl} formErrorA={formErrorA} handleAFormSubmit={handleAFormSubmit} modalFormA={modalFormA} setModalFormA={setModalFormA} name={name} question={question.question_body}/>
    </div>
  }

  {
  questionList.map((answer,index) => {
    return(
      <div key={index}>
        <Answers answer = {answer}/>
      </div>
    )

  })}
    <p>
  {(qA.length>2 && moreAnswers)  && <AButton onClick={handleMoreAnswers}><b>LOAD MORE ANSWERS</b></AButton>}
  </p>
  </div>
)
};

export default QuestionList;