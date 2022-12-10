import React, {useState}  from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from './ImageUpload.jsx';
import styled from 'styled-components';

//var cl = new cloudinary.Cloudinary({cloud_name: "dvzmvxypr", secure: true});

const AnswerModal = ({url, setUrl,modalFormA, setModalFormA, name,question,formErrorA, handleAFormSubmit, handleAddAnswer}) => {
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
  const [image, setImage ] = useState("");
  const handleAnswerModalChange = (e) => {
    setModalFormA({
      ...modalFormA,
      [e.target.name] : e.target.value
    })
  }

  return(
    <Container>
      <Modal>
      <Close onClick={handleAddAnswer}/>
      <h2>Submit Your Answer</h2>
       <h3>{name}:{question}</h3>
       <p> Required fields are marked with *</p>

       {formErrorA &&
        <p>You must enter the following:</p>}
       <form onChange={handleAnswerModalChange} onSubmit ={handleAFormSubmit}>
        <label>
          Answer*
        <input type='text' maxLength='1000' name='answer' placeholder='Example: it is extremely cozy'/>
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
        <label>
        Photos:
        {
          <ImageUpload image={image} setImage={setImage} url={url}setUrl={setUrl}/>
        }
        </label>
        {/* <input type='submit' value ="Add Images"/> */}
        <input type='submit' value='Submit'/>
       </form>
       </Modal>
    </Container>
  )

}

export default AnswerModal