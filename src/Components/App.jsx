import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './Overview/Overview.jsx';
import RnR from './RatingsAndReviews/RnR.jsx';
import RelatedItems from './RelatedItemsAndComparison/RelatedItems.jsx';
import QA from './QuestionsAndAnswers/QA.jsx';

const App = () => {
  const [productId, setproductId] = useState(37313);
  const [productInfo, setproductInfo] = useState({});

  useEffect(() => {
    getProductInfo();
  }, [])

  let getProductInfo = () => {
    axios.get(`http://localhost:3001/products/${productId}`)
    .then((res) => {
      console.log('product info: ', res.data);
      setproductInfo(res.data);
    })
    .catch((err) => {
      console.log('failed to retrieve product info', err);
    })
  }

  return (
    <div>
      <Overview />
      <RelatedItems productId={productId} setproductId={setproductId} productInfo={productInfo} setproductInfo={setproductInfo} />
      <QA />
      <RnR />
    </div>
  );
};

export default App;
