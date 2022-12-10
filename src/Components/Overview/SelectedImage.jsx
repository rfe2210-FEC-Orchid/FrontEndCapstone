import React, { useState, useEffect } from 'react';
import ExpandedImage from './ExpandedImage.jsx';
import styled from 'styled-components';

const MainImage = styled.img`
  width: 100%;
  height: 645px;
  object-fit: cover;
  // object-fit: contain;
  &:hover {
    cursor: zoom-in;
  }
`;

const SelectedImage = (props) => {

  return (
    <>
      {props.photo &&
      <MainImage
        src={props.photo.url}
        onClick={() => props.setShowExpandedImage(true)}
      />
      }
    </>
  );
};

export default SelectedImage;