import React from 'react';
import styled from 'styled-components';
import {FaRegStar, FaStar} from 'react-icons/fa'



const Star = ({rating, value, handleSetOverallRating}) => {

  const Container = styled.div`
    position: relative;
  `;

  const FullStars = styled.div`
    width: ${rating + "%"};
    overflow: hidden;
    position: absolute;
  `;

  const EmptyStars = styled.div`
  `;

  return (
    <Container onClick={()=> {handleSetOverallRating(value)}}>
      <FullStars>
        <FaStar style={{color: "#FFD31A"}}/>
      </FullStars>
      <EmptyStars>
        <FaRegStar />
      </EmptyStars>
    </Container>
  )
}

export default Star;
