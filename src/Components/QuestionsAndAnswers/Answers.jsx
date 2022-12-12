import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Photo from './Photo.jsx'
import './questions.css';


const Answers = ({answer}) => {
  const [helpfulA, setHelpfulA] = useState(answer.helpfulness)
  const [reportA, setReportA] = useState('Report');

  const handleAReport = () => {
    axios.put(`http://localhost:3001/qa/answers/${answer.id}/report`)
    .then(res => console.log(res))
    setReportA('Reported')
  }

  const handleHelpfulA = () => {
    axios.put(`http://localhost:3001/qa/answers/${answer.id}/helpful`)
    .then(res => console.log(res))
    setHelpfulA(helpfulA+1)
  }

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
   const Container = styled.div`
   width: 100%;
   display: flex;  flex-wrap: wrap;  align-content: stretch;
  `



  return(
    <div>
      <b className ='fonttwo'>A: </b>
      <span className='divider'></span>
      {answer.body}
      {answer.photos.length > 0 &&
          answer.photos.map((photo,key) => {
          return(
            <div key={key}>
              <Photo photo={photo}/>
            </div>
          )})
        }
      <Container>
      <p className ='smallGrey'>by {answer.answerer_name},
      <span className='divider'></span>
      {new Date(answer.date).toLocaleString('en-US',{
        //january 1, 2019
        month:'long',
        day: 'numeric',
        year: 'numeric'
        })}
        <span className='divider'></span>
          | Helpful?
        <span className='divider'></span>
      <button className ='smallbtn' onClick={handleHelpfulA}><u>Yes</u>({helpfulA})</button>
      <span className='divider'></span>
      |
      <span className='divider'></span>
      <button className ='smallbtn' onClick={handleAReport}><u>{reportA}</u></button>
      </p>
      </Container>



    </div>
    )
};

export default Answers;