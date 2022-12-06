import React, { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';

const WriteAReview = ({isWritingReview, onClose}) => {
  const [summary, setSummary] = useState("");

  const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0px;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.8);
    transition: opacity 0.8s visibility 0.8s transform 0.8s;

    ${props => props.isWritingReview && css`
       opacity: 1;
       visibility: visible;
       transform: scale(1);
       transition: opacity 0.8s visibility 0.8s transform 0.8s;
    ` }
  `;

  // const OverlayHidden = styled(Overlay)`
  //   opacity: 0;
  //   visibility: hidden;
  // `;

  const Container = styled.div`
     width: 75%;
     height:  80%;
     top: 15px;
     background: yellow;
     position: relative;
  `;

  const Closebtn = styled.div`
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
  `;

  // const ReviewForm = styled.form`
  //   /* display: block; */
  // `;

  // if (!isWritingReview) return <OverlayHidden>Write a Review</OverlayHidden>;
  return (
    <Overlay isWritingReview={isWritingReview}>
      <Container >
        <div>Write Your Review!</div>
        <Closebtn onClick={onClose}>X</Closebtn>
        <form>
          <label>Overall Rating*</label>
          <div>
            <label>Do you recommend this product?*</label><br/>
            <input type="radio" value="yes"/>
            <label for="yes">Yes</label>
            <input type="radio" value="no"/>
            <label for="no">No</label>
          </div>
          <div>
            <label>Characteristics*</label>
            <div>
              <label>Size</label><br/>
              <input type="radio" value="1"/>
              <label for="1">1 - A size too small</label>
              <input type="radio" value="2"/>
              <label for="2">2 - 1/2 a size too small</label>
              <input type="radio" value="3"/>
              <label for="3">3 - PERFECT!</label>
              <input type="radio" value="4"/>
              <label for="4">4 - 1/2 a size too big</label>
              <input type="radio" value="5"/>
              <label for="5">5 - A size too wide</label>
            </div>
          </div>
          <div>
            <label>Review Summary</label><br/>
            <textarea maxlength="60" rows="2"/>
          </div>
          <div>
            <label>Review Body*</label><br/>
            <textarea minlength="50" maxlength="1000" rows="4" placeholder="Why did you like the product or not?" onChange={(evt) => {
              evt.preventDefault();
              console.log(evt.target.value);
              setSummary(evt.target.value);
            }}/>
            {/* <div>{summary.length < 50 ? "Minimum Characters required left:" + (50 - summary.length) : "Requirement met"}</div> */}
          </div>

        </form>
      </Container>
    </Overlay>
  )
};

export default WriteAReview;