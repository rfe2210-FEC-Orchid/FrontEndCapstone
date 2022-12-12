import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './questions.css';

const QuestionModal = ({modalFormQ,setModalFormQ,handleQFormSubmit,name,formError,handleAddQ}) => {
  const handleQuestionModalChange = (e) => {
    setModalFormQ({
      ...modalFormQ,
      [e.target.name] : e.target.value
    })
  }
  const Close = styled.div`
    position: absolute;
    top:15% auto;
    right: 9%;
    background-image:url('https://upload.wikimedia.org/wikipedia/commons/0/00/Cross-image.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width:5%;
    height: 5%;
    cursor:pointer;
    `


  return(
    <div className='modal'>
      <div className='modal-content'>
        <Close onClick= {handleAddQ}></Close>
      <h2>Ask Your Question</h2>
       <h3>About the {name}</h3>
       <p className='smallGrey'>Required fields are marked with * </p>

       {formError &&
        <p className = 'red'>You must enter the following:</p>}
       <form onSubmit ={handleQFormSubmit} onChange={handleQuestionModalChange}>
        <label>
          Question*
          <span className ='divider'></span>
        <input type='text' maxLength='1000' name='question' placeholder='Example: How cozy is this?'/>
        </label>
        <label>
          <p>Nickname*
          <span className ='divider'></span>
          <input type='text' maxLength='60' name='nickname' placeholder='Example:jackson11!'/></p>
          <p className='smallGrey'>For privacy reasons, do not use your full name or email address</p>
        </label>
        <label>
          Email*
          <span className ='divider'></span>
          <input type='email' maxLength='60' name='email' placeholder='Example: youremail@example.com'/>
          <p className='smallGrey'>For authentication reasons, you will not be emailed</p>
        </label>
        <input type='submit' value='Submit'/>
       </form>
       </div>
    </div>
  )

}

export default QuestionModal