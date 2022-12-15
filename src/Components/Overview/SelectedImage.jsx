import React from 'react';
import styled from 'styled-components';

const MainImage = styled.img`
  width: 100%;
  height: 814px;
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
        data-testid='main-image'
        src={props.photo.url}
        onClick={(e) => {
          props.setShowExpandedImage(true);
          props.handleTrack(e, 'SelectedImage');
        }}
      />
      }
    </>
  );
};

export default SelectedImage;