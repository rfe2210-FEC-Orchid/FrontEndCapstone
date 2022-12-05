import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageThumbnails from './ImageThumbnails.jsx';
import ExpandedImage from './ExpandedImage.jsx';

const ImageGallery = (props) => {

  return (
    <div>
      ImageGallery
      <ImageThumbnails />
    </div>
  );
};

export default ImageGallery;