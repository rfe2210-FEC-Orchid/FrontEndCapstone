import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductRating from './ProductRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductStyle from './ProductStyle.jsx';
import ProductShare from './ProductShare.jsx';
import ProductDescription from './ProductDescription.jsx';
import axios from 'axios';
import styled from 'styled-components';

const Overview = (props) => {
  return (
    <div>
      this is the overview widget!
      <div>
        <ImageGallery />
        <div>
          <ProductRating />
          <ProductInfo />
          <ProductStyle />
          <ProductShare />
        </div>
      </div>
      <ProductDescription />
    </div>
  );
};

export default Overview;