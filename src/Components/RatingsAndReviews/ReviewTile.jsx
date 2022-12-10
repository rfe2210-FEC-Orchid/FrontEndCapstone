import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Stars from './Stars.jsx';

const ReviewTile = ({review}) => {
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

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
    border-bottom: 1px solid black;
  `;

  const NameBlock = styled.span`
    position: absolute;
    right: 0px;
  `;

  const ReviewSummaryBlock = styled.div`
     font-size: 24px;
     margin: 8px 0px;
  `;

  const ReviewBodyBlock = styled.div`
     margin: 25px 0px;
  `;

  const RecommendBlock = styled.div`
     margin: 25px 0px;
     color:#BE0A00;
  `;

  const ResponseBlock = styled.div`
     background-color: #CFCFCF;
  `;

  const ShowMoreBtn = styled.button`
    cursor: pointer;
    border: 0px;
    color: #0d98ba;
    background-color: white;
    :hover {
      color: red;
      text-decoration: underline;
    }
  `;

  const HelpfulBtn = styled.button`
    cursor: ${isHelpful ? null : "pointer"};
    border: 0px;
    color: ${isHelpful ? "green" : "grey"};
    background-color: white;
    :hover {
      color: ${isHelpful ? "green" : "red"};
      text-decoration: ${isHelpful ? "null" : "underline"};
    }
  `;

  const ReportBtn = styled.button`
    cursor: pointer;
    background-color: white;
    :hover {
      color: red;
      text-decoration: underline;
    }
  `;


  const handleHelpfulClick = () => {
    if (!isHelpful) {
      axios.put(`http://localhost:3000/reviews/${review.review_id}/helpful`, {header: {'Access-Control-Allow-Origin': '*'}})
        .then(() => {
          console.log("added helpful")
        })
        .catch((err) => {
          console.error(err);
        })
    }
    setIsHelpful(true);
  }

  const handleReportClick = () => {
    axios.put(`http://localhost:3000/reviews/${review.review_id}/report`, {header: {'Access-Control-Allow-Origin': '*'}})
        .then(() => {
          console.log("reported")
        })
        .catch((err) => {
          console.error(err);
        })
  }
  return (
    <Container>
      <Stars number={review.rating}/>
      <NameBlock>
        <span>{review.reviewer_name + ", "}</span>
        <span>{dateFormatted.month + " " + dateFormatted.day + ", " + dateFormatted.year}</span>
      </NameBlock>
      <ReviewSummaryBlock>{review.summary}</ReviewSummaryBlock>
      <ReviewBodyBlock>
        {isShowingMore ? review.body : (review.body.substring(0, 251) + (review.body.length > 250 ? "..." : ""))}
        <div> {review.body.length > 250 &&
          <ShowMoreBtn onClick={handleShowMore}>{isShowingMore ? "^ Show Less" : "v Show More"}</ShowMoreBtn>
        }</div>
      </ReviewBodyBlock>
      {review.recommend && <RecommendBlock>✓ I recommend this product</RecommendBlock>}
      {review.response &&
      <ResponseBlock>
        <div>Response:</div>
        <div>{review.response}</div>
      </ResponseBlock>}
      <div>{"Helpful? "}
      <HelpfulBtn onClick={handleHelpfulClick}>Yes ({isHelpful ? review.helpfulness + 1 : review.helpfulness}) </HelpfulBtn>
      <span>  |  </span>
      <ReportBtn onClick={handleReportClick}>Report</ReportBtn>
      </div>
    </Container>
  )
}

export default ReviewTile;