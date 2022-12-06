import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Stars from './Stars.jsx';

const ReviewTile = ({review}) => {
  const [isShowingMore, setIsShowingMore] = useState(false);

  //for date
  let date = new Date(review.date);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let dateFormatted = {
    month: monthNames[date.getMonth()],
    day: date.getDay(),
    year: date.getFullYear()
  }

  //Show More in Body
  const handleShowMore = () => {
    setIsShowingMore(!isShowingMore);
  };

  //styled components
  const Container = styled.div`
    padding: 10px;
    position: relative;
  `;

  return (
    <Container>
      <Stars number={review.rating}/>
      <div>{review.reviewer_name}</div>
      <div>{dateFormatted.month + " " + dateFormatted.day + ", " + dateFormatted.year}</div>
      <div>{review.summary}</div>
      <div>
        {isShowingMore ? review.body : (review.body.substring(0, 251) + (review.body.length > 250 ? "..." : ""))}
        <div> {review.body.length > 250 &&
          <button onClick={handleShowMore}>Show More</button>
        }</div>
      </div>
      {review.recommend && <div>✔️ I recommend this product</div>}
      <div>{"Helpful? "}
      <button onClick={() => {
        console.log("I'm clicked");
      }}>Yes ({review.helpfulness}) </button>
      </div>
    </Container>
  )
}

export default ReviewTile;