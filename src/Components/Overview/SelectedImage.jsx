import React, { useState, useEffect } from 'react';
import ExpandedImage from './ExpandedImage.jsx';
import styled from 'styled-components';

const MainImage = styled.img`
  height: 600px;
  width: 600px;
  object-fit: contain;

  &:hover {
    cursor: zoom-in;
  }
`;

const SelectedImage = (props) => {

  return (
    <div>
      {props.photo &&
      <MainImage
        src={props.photo.url}
        onClick={() => props.setShowExpandedImage(true)}
      />}

    </div>
  );
};

export default SelectedImage;