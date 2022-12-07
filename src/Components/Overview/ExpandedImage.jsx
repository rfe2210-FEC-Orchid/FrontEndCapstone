import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ExpandedViewImage = styled.img`
  height: 90%;
  width: 90%;
  object-fit: contain;
`;

const ExpandedImage = (props) => {

  return (
    <>
      <ExpandedViewImage
        src={props.photo.url}
      />
    </>
  );
};

export default ExpandedImage;