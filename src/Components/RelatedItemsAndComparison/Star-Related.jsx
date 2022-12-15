import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import fullStar from './stars/fullStar.png';
// import emptyStar from './stars/emptyStar.png';

import { IoStarOutline, IoStar } from 'react-icons/io5';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Container = styled.div`
position: relative;
`;

const FullStars = styled.div`
width: ${props => props.rating + "%"};
overflow: hidden;
position: absolute;
`;

const EmptyStars = styled.div`
`;

const Star = ({rating}) => {

  return (
    <Container>
      <FullStars>
        <FaStar rating={rating} width="15" height="15"/>
      </FullStars>
      <EmptyStars>
        <FaRegStar width="15" height="15"/>
      </EmptyStars>
    </Container>
  )
}

export default Star;