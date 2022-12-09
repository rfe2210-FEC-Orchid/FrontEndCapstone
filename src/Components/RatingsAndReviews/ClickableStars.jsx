import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Star from './Star.jsx';



const ClickableStars = ({overallRating, handleSetOverallRating}) => {


  const StarRatings = styled.div`
    display: inline-flex;
    position: relative;
    cursor: pointer;
  `;

  return (
    <StarRatings>
      {[...Array(5)].map((rating, index) => <Star key={" " + index} rating={index < overallRating ? 100 : 0} value={index + 1} handleSetOverallRating={handleSetOverallRating}/>)}
    </StarRatings>
  )
}

export default ClickableStars;
