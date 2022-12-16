import React from 'react';
import styled from 'styled-components';
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

const Star = (props) => {

  return (
    <Container>
      <FullStars rating={props.rating}>
        <FaStar width="15" height="15"/>
      </FullStars>
      <EmptyStars>
        <FaRegStar width="15" height="15"/>
      </EmptyStars>
    </Container>
  )
}

export default Star;