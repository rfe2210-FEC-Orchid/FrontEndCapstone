import React, { useState, useEffect } from 'react';
import CharacteristicQuestion from './CharacteristicQuestion.jsx'
import MultiFileUpload from './MultiFileUpload.jsx';
import ClickableStars from './ClickableStars.jsx';
import axios from 'axios';

const Form = ({characteristics, productID, onClose}) => {
  const [overallRating, setOverallRating] = useState(0);
  const [summary, setSummary] = useState("");
  const [ifRecommend, setIfRecommend] = useState(true);
  const [body, setBody] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [characteristicsChosen, setCharacteristicsChosen] = useState({});
  const [imageURLS, setImageURLS] = useState([]);


  const handleChoosingCharacteristics = (evt)=>  {
    const {name, value} = evt.target;
    setCharacteristicsChosen(prev => ({
      ...prev,
      [name]: Number(value)
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`http://localhost:3001/reviews`, {
      product_id : productID,
      rating : overallRating,
      summary: summary,
      body: body,
      recommend: ifRecommend,
      name: nickname,
      email: email,
      photos: imageURLS,
      characteristics: characteristicsChosen
    })
    .then(()=>{
      console.log('success');
      onClose();
      setOverallRating(0);
      setSummary("");
      setIfRecommend(true);
      setBody("");
      setNickname("");
      setEmail("");
      setCharacteristicsChosen({});
      setImageURLS([]);
    })
    .catch((err) =>  {
      console.error(err.response.data);
    }, {
      headers: {
        "Content-Type": "text/plain"
      }
    })
  }

  return (
  <section>
  <header>
    <h2>Write a Review</h2>
    <h4>About the Product Name Here</h4>
  </header>

  <form onSubmit={handleSubmit}>
    <div>
      <label><span className="number">1</span>Overall Rating*</label><br/>
      <div className="clickable-stars">
        <ClickableStars overallRating={overallRating} handleSetOverallRating={handleSetOverallRating}/>
      </div>
    </div>

    <div>
      <label><span className="number">2</span>Do you recommend this product?*</label><br/>
      <input required defaultChecked type="radio" value={true} name="ifRecommend" onChange={(evt) => setIfRecommend(evt.target.value)}/>Yes
      <input required type="radio" value={false} name="ifRecommend" onChange={(evt) => setIfRecommend(evt.target.value)}/> No
    </div>

    <div>
      <label><span className="number">3</span>Characteristics*</label>
      {/* <label>{characteristicsChosen}</label> */}
      <div>
        {Object.keys(characteristics).map((key) => <CharacteristicQuestion key={key} characteristic={characteristics[key]} category={key}
        handleChoosingCharacteristics={handleChoosingCharacteristics} characteristicsChosen={characteristicsChosen}/> )}
      </div>
    </div>

    <div>
      <label><span className="number">4</span>Review Summary*</label><br/>
      <textarea className="text-input" required maxLength="60" rows="2" cols="50" placeholder="Example: Best purchase ever!" value={summary} onChange={(evt) => {

        console.log(summary);
        setSummary(evt.target.value);
      }}/>
    </div>

    <label><span className="number">5</span>Review Body*</label><br/>
      <textarea className="text-input" required minLength="50" maxLength="1000" rows="4" cols="50" placeholder="Why did you like the product or not?" autoComplete="off" value={body} onChange={(evt) => {
        setBody(evt.target.value);
      }}/>
    <div>{body.length < 50 ? "Minimum required characters left: " + (50 - body.length) : "Minimum Reached"}</div>

    <label><span className="number">6</span>Upload your photos</label>
    <div>
      <MultiFileUpload imageURLS={imageURLS} handleImageUrls={handleImageUrls}/>
    </div>

    <label><span className="number">7</span>What is your nickname*</label>
    <div>
      <input className="text-input" required type="text" maxLength="60" placeholder="Example: jackson11!" value={nickname} onChange={(evt) => {
        setNickname(evt.target.value);
      }} />
      <div>For privacy reasons, do not use your full name or email address</div>
    </div>

    <label><span className="number">8</span>You email*</label>
    <div>
      <input className="text-input" required type="email" placeholder="Example: jackson11@email.com" value={email} onChange={(evt) => {
        setEmail(evt.target.value);
      }} />
      <div>For authentication reasons, you will not be emailed</div>
    </div>
    <input type="submit" value="Submit" />
  </form>
  <div className="placeholder"></div>
  </section>
  )
}

export default Form;