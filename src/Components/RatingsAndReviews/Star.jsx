import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const Star = ({rating}) => {

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
    <Container>
      <FullStars>
        <img src="../src/assets/fullStar.png" width="15" height="15"/>
      </FullStars>
      <EmptyStars>
      <img src="../src/assets/emptyStar.png" width="15" height="15"/>
      </EmptyStars>
    </Container>
  )
}

export default Star;
