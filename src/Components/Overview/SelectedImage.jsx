import React, { useState, useEffect } from 'react';
import ExpandedImage from './ExpandedImage.jsx';

const SelectedImage = (props) => {

  return (
    <div>
      {props.photo &&
      <img
        src={props.photo.url}
        height={400}
      />}
    </div>
  );
};

export default SelectedImage;