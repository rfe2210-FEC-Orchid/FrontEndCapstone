import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './QuestionModal.jsx';

const QA = (props) => {
  const prod = {};

  const [questionSearch, setQuestionSearch] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [originalData, setOriginalData] =  useState([]);
  const [openQModal, setOpenQModal] = useState(false);
  const [modalFormQ,setModalFormQ] = useState({});
  const [formError, setFormError] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(4);
  const [moreQs, setMoreQs] = useState(true);

  prod.name = "Camo Onesie",

  //set static product id for testing
  prod.product_id = 37314

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

  const Container = styled.div`
    width: 600px;
    padding: 10px;
    border: 3px solid black;
    margin: 0;
    `
  const Search = styled.div`
    input{
    background: transparent;
    outline: none;
    width: 500px;
    border-radius: 3px;
    border: 1px solid black;
    margin: auto;
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg");
    background-size: 13px;
    padding: 0.25em 1em;
    background-repeat: no-repeat;
    background-position: 467px center;
    }
    `


  return (
    <Container>
      <h2>QUESTIONS & ANSWERS</h2>
      <Search >
      <form onChange={handleChange}>
      <input
      value= {questionSearch}
      onInput ={(e)=> {setQuestionSearch(e.target.value)}}
      type ="text"
      autoFocus ="autoFocus"
      id = 'question-search'
      placeholder = " HAVE A QUESTION? SEARCH FOR ANSWERS" />
      </form>
      </Search>

      {questionData.map((question, index) => {
        return (
        <div key={index}>
        <QuestionList name ={prod.name} question={question}/>
        </div>
      )
    }
  )}
    {(originalData.length >4 && moreQs)  && <button onClick={handleMoreQ}>MORE ANSWERED QUESTIONS</button>}
    <button onClick ={handleAddQ}>ADD A QUESTION</button>
    {openQModal &&
    <div>
      <QuestionModal handleAddQ={handleAddQ} formError={formError} name={prod.name}handleQFormSubmit={handleQFormSubmit} modalFormQ={modalFormQ} setModalFormQ={setModalFormQ}/>
    </div>}
    </Container>

  );
};

export default QA;