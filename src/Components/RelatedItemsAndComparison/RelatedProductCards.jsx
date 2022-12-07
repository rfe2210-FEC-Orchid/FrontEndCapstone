import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductsList from './RelatedProductsList.jsx';

const RelatedProductCards = ({productID, setproductID, GetRelatedProductsList}) => {
  return (
    <div>

    </div>
  )
}

export default RelatedProductCards;

// GET request for products/:product_id/
  // is this necessary? Or is it already done in App.jsx?
  // include category, name, default_price
// include star rating