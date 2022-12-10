import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Answers from './Answers.jsx';
import AnswerModal from './AnswerModal.jsx';
//var cl = new cloudinary.Cloudinary({cloud_name: CLOUD_NAME, secure: true});


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

return(
  <div>
  Q: {question.question_body}
  Helpful?
  <button onClick={handleHelpfulQ}>Yes ({helpful})</button>
  <button onClick={handleAddAnswer}>
  Add Answer
  </button>
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
  {(Object.values(question.answers).length>2 && moreAnswers)  && <button onClick={handleMoreAnswers}>LOAD MORE ANSWERS</button>}
  </p>
  </div>
)
};

export default QuestionList;