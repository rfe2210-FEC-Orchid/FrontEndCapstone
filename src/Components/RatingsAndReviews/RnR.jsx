import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import Ratings from './Ratings.jsx';

const RnR = () => {
  const [productID, setProductID] = useState("37311");

  return (
    <div>
      <div>I MADE A CHANGE 🤪🤪🤪🤪</div>
      <Ratings productID={productID}/>
      <ReviewsList productID={productID}/>
    </div>
  )
}

export default RnR;