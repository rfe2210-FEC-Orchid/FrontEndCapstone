import React from 'react';
import styled from 'styled-components';

const Column = styled.div`
  float: left;
  width: 25%;
  padding: 2px;
`
const Photo = ({photo}) => {
  return(
    <Column>
      <img src={photo} width= '200px' height = '200px' />
    </Column>
  )
}

export default Photo