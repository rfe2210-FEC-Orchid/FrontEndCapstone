import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddToCart from './AddToCart.jsx';


const ProductStyle = (props) => {

  return (
    <div>
      Product Style
      <StyleSelector />
      <SizeSelector />
      <AddToCart />
    </div>
  );
};

export default ProductStyle;