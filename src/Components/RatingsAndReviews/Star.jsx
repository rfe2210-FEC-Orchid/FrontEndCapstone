import React from 'react';
import styled from 'styled-components';
import {FaRegStar, FaStar} from 'react-icons/fa';

  const Container = styled.div`
  position: relative;
  `;

  const EmptyStars = styled.div`
  `;

  const FullStars = styled.div`
  width: ${props => props.rating + "%"};
  overflow: hidden;
  position: absolute;
  `;

const Star = ({rating, value, handleSetOverallRating}) => {


  return (
    <Container onClick={()=> {handleSetOverallRating(value)}}>
      <FullStars rating={rating}>
        <FaStar />
      </FullStars>
      <EmptyStars>
        <FaRegStar />
      </EmptyStars>
    </Container>
  )
}

export default Star;
