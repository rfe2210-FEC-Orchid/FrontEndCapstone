import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Answers from './Answers.jsx';
import AnswerModal from './AnswerModal.jsx';

const QuestionList = ({name, question}) => {
  const [ url, setUrl ] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(true);
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [modalA, setModalA] = useState(false);
  const [modalFormA, setModalFormA] = useState({});
  const [formErrorA, setFormErrorA] = useState(false);
  const [numberOfA, setNumberOfA] = useState(2)
  const [questionList, setQuestionList] = useState(Object.values(question.answers).slice(0,numberOfA))



  const handleMoreAnswers = () => {
    setQuestionList(Object.values(question.answers).slice(0,numberOfA+2))
    if (numberOfA+2 >= Object.values(question.answers).length) {
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

  const handleAFormSubmit = () => {
    event.preventDefault();
    if (Object.values(modalFormA).length >= 3) {
      axios.post(`http://localhost:3001/qa/questions/${question.question_id}/answers`,
        {
          body:modalFormA.answer,
          name:modalFormA.nickname,
          email:modalFormA.email,
          photos: url
        }
      )
      .then(res =>console.log(res))
      setModalA(false)
    }
    else {
      setFormErrorA(true)
   }
  }

  const Question = styled.div`
    display: inline-block;
    //border: 1px solid red;
    //padding: 1rem 1rem;
    vertical-align: middle;
    width: 70%;
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
    cursor:pointer;
    &:hover {
      color:#080707;
      transition: 0.7s;
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
cursor:pointer;
&:hover {
      color:#070101;
      transition: 0.7s;
  }
`


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
  {(Object.values(question.answers).length>2 && moreAnswers)  && <AButton onClick={handleMoreAnswers}><b>LOAD MORE ANSWERS</b></AButton>}
  </p>
  </div>
)
};

export default QuestionList;