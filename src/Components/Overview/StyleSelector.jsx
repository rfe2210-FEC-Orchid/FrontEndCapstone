import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyleImage = styled.img`
  height: 60px;
  width: 60px;
  padding: 2px;
  margin: 5px;
  object-fit: cover;
  border: ${props => props.selected ? '2px solid #4F0B40' : '2px solid white'};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    border: 2px solid #4F0B40;
  }
`;

const defualt_url = 'https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const StyleSelector = (props) => {

  return (
    <div>
      {props.styles && props.styles.map((style) =>
      <StyleImage
        key={style.style_id}
        selected={props.selectedStyleID === style.style_id}
        src={style.photos[0].thumbnail_url || defualt_url}
        onClick={() => props.handleChangeStyle(style)}
      />
      )}
    </div>
  );
};

export default StyleSelector;