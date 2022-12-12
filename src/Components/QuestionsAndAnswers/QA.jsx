import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';
import './questions.css';


const QA = ({productId,productName}) => {
  const prod = {};
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [originalData, setOriginalData] =  useState([]);
  const [openQModal, setOpenQModal] = useState(false);
  const [modalFormQ,setModalFormQ] = useState({});
  const [formError, setFormError] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(4);
  const [moreQs, setMoreQs] = useState(true);

  prod.name = productName


  //set static product id for testing
  prod.product_id = productId

  useEffect(()=> {
    axios({
      method: "get",
      url: "http://localhost:3001/qa/questions",
      params: {
        product_id: prod.product_id,
        count: 1000
      }
    })
    .then(res => {setQuestionData(res.data.results.slice(0,questionNumber))
    setOriginalData(res.data.results)}
    )
    .catch((err) => console.log(err))},[])

  const handleAddQ = () => {
    setOpenQModal(!openQModal )
  }

  const handleMoreQ = () => {
    setQuestionData(originalData.slice(0,questionNumber+2))
    if (questionNumber+2 >= originalData.length) {
      setMoreQs(false);
    }
    setQuestionNumber(questionNumber+2)
  }

  const handleChange = (e) => {
    const searchQs = questionData.filter(q => q.question_body.toLowerCase()
    .includes(e.target.value.toLowerCase()));
    var data = e.target.value.length < 3? originalData:searchQs;
    setQuestionData(data)
  }

  const handleQFormSubmit = () => {

    if (Object.values(modalFormQ).length === 3) {
      axios.post("http://localhost:3001/qa/questions",
        {
          body:modalFormQ.question,
          name:modalFormQ.nickname,
          email:modalFormQ.email,
          product_id: prod.product_id,
        }
        //post req
        //close modal window
      )
      .then(res =>console.log(res))
      setOpenQModal(false)
    }
    else {
      event.preventDefault();
      setFormError(true)
   }
  }


  const Button = styled.button`
  height: 50px ;
  width: 30%;
  color: #FFFFFF;
  font-size: 1em;
  //margin: 1em;
  padding: 0.25em 1em;
  border: 2px;
  border-style: solid;
  background-color:#4F0B40 ;
  border-color:#4F0B40;
  border-radius: 3px;
  cursor:pointer;
  font-family: Nunito Sans, sans-serif, Daniel;
  &:hover {
      color:#FFFFFF;
      background-color:#800F67;
      transition: 0.7s;
  }
`;
  const Divider = styled.div`
    width:5px;
    height:auto;
    display:inline-block;
  `
  const QAListContainer = styled.div`
  overflow-y: auto;
  height: auto;
  max-height: 450px;
  width: 82%;
`;

  return (
    <div className = "container">
      <h2>QUESTIONS & ANSWERS</h2>
      <form className = "topnav" onChange={handleChange}>
      <input
      // value= {questionSearch}
      // onInput ={(e)=> {setQuestionSearch(e.target.value)}}
      type ="text"
      id = 'question-search'
      placeholder = " HAVE A QUESTION? SEARCH FOR ANSWERS" />
      </form>
      <p></p>
      <QAListContainer>
      {questionData.map((question, index) => {
        return (
        <div key={index}>
        <QuestionList name ={prod.name} question={question}/>
        </div>
      )
    }
  )}
  </QAListContainer>
  <p></p>
    {(originalData.length >4 && moreQs)  && <Button onClick={handleMoreQ}>MORE ANSWERED QUESTIONS</Button>}
    <Divider></Divider>
    <Button onClick ={handleAddQ}>ADD A QUESTION +</Button>
    {openQModal &&
    <div>
      <QuestionModal handleAddQ={handleAddQ} formError={formError} name={prod.name}handleQFormSubmit={handleQFormSubmit} modalFormQ={modalFormQ} setModalFormQ={setModalFormQ}/>
    </div>}
    </div>

  );
};

export default QA;