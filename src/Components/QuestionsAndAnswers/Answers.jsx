import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Photo from './Photo.jsx'

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

  return(
    <div>
      A: {answer.body}
      by {answer.answerer_name},
      {new Date(answer.date).toLocaleString('en-US',{
        //january 1, 2019
        month:'long',
        day: 'numeric',
        year: 'numeric'
        })}
        {answer.photos.length > 0 &&
          answer.photos.map((photo,key) => {
          return(
            <div key={key}>
              <Photo photo={photo}/>
            </div>
          )})
        }
      | Helpful?
      <button onClick={handleHelpfulA}>Yes({helpfulA})</button>
      |
      <button onClick={handleAReport}>{reportA}</button>

    </div>
    )
};

export default Answers;