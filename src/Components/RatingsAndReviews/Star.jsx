import React from 'react';
import styled from 'styled-components';
import {FaRegStar, FaStar} from 'react-icons/fa';

  const Container = styled.div`
  position: relative;
  `;

  const EmptyStars = styled.div`
  `;

const Star = ({rating, value, handleSetOverallRating}) => {
  const FullStars = styled.div`
  width: ${rating + "%"};
  overflow: hidden;
  position: absolute;
  `;

  return (
    <Container onClick={()=> {handleSetOverallRating(value)}}>
      <FullStars>
        <FaStar />
      </FullStars>
      <EmptyStars>
        <FaRegStar />
      </EmptyStars>
    </Container>
  )
}

export default Star;
