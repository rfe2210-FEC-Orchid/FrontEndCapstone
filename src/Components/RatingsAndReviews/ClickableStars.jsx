import React from 'react';
import styled from 'styled-components';
import Star from './Star.jsx';

const StarRatings = styled.div`
display: inline-flex;
position: relative;
cursor: pointer;
`;


const ClickableStars = ({overallRating, handleSetOverallRating}) => {

  return (
    <StarRatings>
      {[...Array(5)].map((rating, index) => <Star key={" " + index} rating={index < overallRating ? 100 : 0} value={index + 1} handleSetOverallRating={handleSetOverallRating}/>)}
    </StarRatings>
  )
}

export default ClickableStars;
