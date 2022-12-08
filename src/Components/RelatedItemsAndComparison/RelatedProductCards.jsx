import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';

const RelatedProductCards = ({product, setproductId}) => {
  console.log('product category: ', product.category);
  return (
    <div>
      <h4>{product.category}</h4>
      <h4>{product.name}</h4>
      <h5>{product.default_price}</h5>
      <p>★★★★★</p>
    </div>
  )
}

export default RelatedProductCards;

// GET request for products/:product_id/
  // is this necessary? Or is it already done in App.jsx?
  // include category, name, default_price
// include star rating