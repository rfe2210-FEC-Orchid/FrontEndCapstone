import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Star from './Star.jsx';



const Stars = ({number}) => {
  const [starMap, setStarMap] = useState([0,0,0,0,0]);

  useEffect (() => {
    let fullStarNumber = Math.floor(number);
    let lastStarFill = (number * 100) % 100;
    let baseStarMap = [0, 0, 0, 0, 0];
    for (let i = 0; i < fullStarNumber; i++) {
      baseStarMap[i] = 100;
    }
    if (fullStarNumber !== 5) {
      baseStarMap[fullStarNumber] = lastStarFill;
    }
    setStarMap(baseStarMap);
  }, [number])

  const StarRatings = styled.span`
    display: inline-flex;
    position: relative;
    width: 50px;
  `;

  return (
    <StarRatings>
      {starMap.map((rating, index) => <Star key={" " + index} rating={rating}/>)}
    </StarRatings>
  )
}

export default Stars;