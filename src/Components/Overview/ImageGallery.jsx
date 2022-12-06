import React, { useState, useEffect } from 'react';
import SelectedImage from'./SelectedImage.jsx';
import ExpandedImage from './ExpandedImage.jsx';

const ImageGallery = (props) => {

  return (
    <div>
      <div>
        {props.photos.map((photo, index) =>
          <img
            src={photo.url}
            key={index}
            height={100}
            onClick={() => props.handleChangeIndex(index)}
          />
        )}
      </div>
      <SelectedImage photo={props.photos[props.index]}/>
    </div>
  );
};

export default ImageGallery;