import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const QuestionModal = ({modalFormQ,setModalFormQ,handleQFormSubmit,name,formError,handleAddQ}) => {
  const handleQuestionModalChange = (e) => {
    setModalFormQ({
      ...modalFormQ,
      [e.target.name] : e.target.value
    })
  }

  const Container = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top:0;
  left:0px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: 3px solid green;
  `
  const Modal = styled.div`
  width: 90%;
  height: 90%;
  background-color:rgb(255,255,255);
  position: relative;
  border: 3px solid green;
  `

  const Close =styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-image:url('https://upload.wikimedia.org/wikipedia/commons/0/00/Cross-image.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width:30px;
  height: 30px;
  cursor:pointer;
  `

  return(
    <Container>
      <Modal>
        <Close onClick= {handleAddQ}/>
      <h2>Ask Your Question</h2>
       <h3>About the {name}</h3>
       <p> Required fields are marked with *</p>

       {formError &&
        <p>You must enter the following:</p>}
       <form onSubmit ={handleQFormSubmit} onChange={handleQuestionModalChange}>
        <label>
          Question*
        <input type='text' maxLength='1000' name='question' placeholder='Example: How cozy is this?'/>
        </label>
        <label>
          Nickname*
          <input type='text' maxLength='60' name='nickname' placeholder='Example:jackson11!'/>
          <p>For privacy reasons, do not use your full name or email address</p>
        </label>
        <label>
          Email*
          <input type='email' maxLength='60' name='email' placeholder='Example: youremail@example.com'/>
          <p>For authentication reasons, you will not be emailed</p>
        </label>
        <input type='submit' value='Submit'/>
       </form>
       </Modal>
    </Container>
  )

}

export default QuestionModal