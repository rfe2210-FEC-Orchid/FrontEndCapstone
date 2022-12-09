import React, { useState, useEffect } from 'react';
import CharacteristicQuestion from './CharacteristicQuestion.jsx'
import styled from 'styled-components';
import MultiFileUpload from './MultiFileUpload.jsx';
import ClickableStars from './ClickableStars.jsx';
import axios from 'axios';

const Form = ({characteristics, productID}) => {
  const [overallRating, setOverallRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [ifRecommend, setIfRecommend] = useState(true);
  const [body, setBody] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [characteristicsChosen, setCharacteristicsChosen] = useState({});
  const [imageURLS, setImageURLS] = useState([]);

  const FormContainer = styled.section`
    background-color: white;
    width: 100%;
  `;

  const FormSubContainer = styled.form`
    background-color: white;
    width: 100%;
  `;

  const handleChoosingCharacteristics = (evt)=>  {
    const {name, value} = evt.target;
    setCharacteristicsChosen(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleImageUrls = (url) => {
    if (imageURLS.length < 5) {
      setImageURLS([...imageURLS, url])
    }
  }

  const handleSetOverallRating = (num) => {
    setOverallRating(num);
  }

  const handleSubmit = () => {
    axios.post(`http://localhost:3000/reviews`, {
      product_id : productID,
      rating : overallRating,
      summary: summary,
      body: body,
      recommend: ifRecommend,
      name: nickname

    })
  }

  return (
  <FormContainer>
  <header>
    <h2>Write a Review</h2>
    <h4>About the Product Name Here</h4>
  </header>

  <FormSubContainer>
    <div>
      <label>Overall Rating*</label><br/>
      <ClickableStars overallRating={overallRating} handleSetOverallRating={handleSetOverallRating}/>
    </div>

    <div>
      <label>Do you recommend this product?*</label><br/>
      <input required checked type="radio" value={true} name="ifRecommend" onChange={(evt) => setIfRecommend(evt.target.value)}/>Yes
      <input required type="radio" value={false} name="ifRecommend" onChange={(evt) => setIfRecommend(evt.target.value)}/> No
    </div>

    <div>
      <label>Characteristics*</label>
      {/* <label>{characteristicsChosen}</label> */}
      <div>
        {Object.keys(characteristics).map((key) => <CharacteristicQuestion key={key} characteristic={characteristics[key]} category={key}
        handleChoosingCharacteristics={handleChoosingCharacteristics} characteristicsChosen={characteristicsChosen}/> )}
      </div>
    </div>

    <div>
      <label>Review Summary</label><br/>
      <textarea required maxLength="60" rows="2" cols="50" placeholder="Example: Best purchase ever!" value={summary} onChange={(evt) => {
        evt.preventDefault();
        console.log(summary);
        setSummary(evt.target.value);
      }}/>
    </div>

    <label>Review Body*</label><br/>
      <textarea required minLength="50" maxLength="1000" rows="4" cols="50" placeholder="Why did you like the product or not?" autoComplete="off" value={body} onChange={(evt) => {
        evt.preventDefault();
        setBody(evt.target.value);
      }}/>
    <div>{body.length < 50 ? "Minimum required characters left: " + (50 - body.length) : "Minimum Reached"}</div>

    <label>Upload your photos</label>
    <div>
      <MultiFileUpload imageURLS={imageURLS} handleImageUrls={handleImageUrls}/>
    </div>

    <label>What is your nickname*</label>
    <div>
      <input required type="text" maxLength="60" placeholder="Example: jackson11!" value={nickname} onChange={(evt) => {
        evt.preventDefault();
        setNickname(evt.target.value);
      }} />
      <div>For privacy reasons, do not use your full name or email address</div>
    </div>

    <label>You email*</label>
    <div>
      <input required type="email" placeholder="Example: jackson11@email.com" value={email} onChange={(evt) => {
        evt.preventDefault();
        setEmail(evt.target.value);
      }} />
      <div>For authentication reasons, you will not be emailed</div>
    </div>
    <input type="submit" value="Submit" />
  </FormSubContainer>
  </FormContainer>
  )
}

export default Form;