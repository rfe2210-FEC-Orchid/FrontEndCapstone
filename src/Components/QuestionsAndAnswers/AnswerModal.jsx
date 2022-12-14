import React, {useState}  from 'react';
import ImageUpload from './ImageUpload.jsx';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const Close = styled.i`
position: absolute;
top:15% auto;
right: 9%;
width:5%;
height: 5%;
cursor:pointer;
`
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`

const AnswerModal = ({url, setUrl,modalFormA, setModalFormA, name,question,formErrorA, handleAFormSubmit, handleAddAnswer}) => {

  const [image, setImage ] = useState("");

  const handleImageUrls = (newUrl) => {
    if (url.length < 5) {
      setUrl([...url, newUrl])
    }
  }

  const handleAnswerModalChange = (e) => {
    setModalFormA({
      ...modalFormA,
      [e.target.name] : e.target.value
    })
  }

  return(
    <Modal>
      <ModalContent>
      <Close onClick={handleAddAnswer}><AiOutlineClose color={'black'} size={40}></AiOutlineClose></Close>
      <h2>Submit Your Answer</h2>
       <h3>{name}: <span className ='divider'></span>{question}</h3>
       <p className='smallGrey'> Required fields are marked with *</p>

       {formErrorA &&
        <p className = 'red'>You must enter the following:</p>}
       <form onChange={handleAnswerModalChange} onSubmit ={handleAFormSubmit}
       >
        <label>
        <span className="number">1</span>
          Answer*
          <p></p>
          <span className ='divider'></span>
        <textarea className="text-input-nik" maxLength="1000" rows="4" cols="50" name='answer' placeholder='Example: it is extremely cozy'/>
        </label>
        <label>
          <p><span className="number">2</span>Nickname*
          <p></p>
          <span className ='divider'></span>
          <input className="text-input-nik" type='text' maxLength='60' name='nickname' placeholder='Example:jackson11!'/></p>
          <p className='smallGrey'>For privacy reasons, do not use your full name or email address</p>
        </label>
        <label>
        <span className="number">3</span>
          Email*
          <p></p>
          <span className ='divider'></span>
          <input className="text-input-nik" type='email' maxLength='60' name='email' placeholder='Example: youremail@example.com'/>
          <p className='smallGrey'>For authentication reasons, you will not be emailed</p>
        </label>
        <label>
        <span className="number">4</span>
        Photos:
        <p></p>
        <span className ='divider'></span>
        {
          <ImageUpload handleurl = {handleImageUrls} image={image} setImage={setImage} url={url}setUrl={setUrl}/>
        }
        </label>
        {/* <input type='submit' value ="Add Images"/> */}
        <input type='submit' value='Submit'/>
       </form>
       </ModalContent>
    </Modal>
  )
}

export default AnswerModal