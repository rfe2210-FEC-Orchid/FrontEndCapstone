import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  height: 60px;
  width: 60px;
  padding: 2px;
  margin: 5px;
  object-fit: cover;
  border: ${props => props.selected ? '2px solid black' : '2px solid white'};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

const StyleSelector = (props) => {

  return (
    <div>
      {props.styles && props.styles.map((style) =>
      <StyleImage
        key={style.style_id}
        selected={props.selectedStyleID === style.style_id}
        src={style.photos[0].thumbnail_url}
        onClick={() => props.handleChangeStyle(style)}
      />
      )}
    </div>
  );
};

export default StyleSelector;