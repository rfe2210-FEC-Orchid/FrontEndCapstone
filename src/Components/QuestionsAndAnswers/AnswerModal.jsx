import React, {useState}  from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from './ImageUpload.jsx';
import styled from 'styled-components';
import './questions.css';

const AnswerModal = ({url, setUrl,modalFormA, setModalFormA, name,question,formErrorA, handleAFormSubmit, handleAddAnswer}) => {

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

  const [image, setImage ] = useState("");

  const handleAnswerModalChange = (e) => {
    setModalFormA({
      ...modalFormA,
      [e.target.name] : e.target.value
    })
  }

  return(
    <div className='modal'>
      <div className ='modal-content'>
      <Close onClick={handleAddAnswer}/>
      <h2>Submit Your Answer</h2>
       <h3>{name}: <span className ='divider'></span>{question}</h3>
       <p className='smallGrey'> Required fields are marked with *</p>

       {formErrorA &&
        <p className = 'red'>You must enter the following:</p>}
       <form onChange={handleAnswerModalChange} onSubmit ={handleAFormSubmit}>
        <label>
          Answer*
          <span className ='divider'></span>
        <input type='text' maxLength='1000' name='answer' placeholder='Example: it is extremely cozy'/>
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
        <label>
        Photos:
        <span className ='divider'></span>
        {
          <ImageUpload image={image} setImage={setImage} url={url}setUrl={setUrl}/>
        }
        </label>
        {/* <input type='submit' value ="Add Images"/> */}
        <input type='submit' value='Submit'/>
       </form>
       </div>
    </div>
  )

}

export default AnswerModal