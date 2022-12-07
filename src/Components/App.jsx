import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './Overview/Overview.jsx';
import RnR from './RatingsAndReviews/RnR.jsx';
import RelatedItems from './RelatedItemsAndComparison/RelatedItems.jsx';
import QA from './QuestionsAndAnswers/QA.jsx';

const App = () => {
  const [productId, setproductId] = useState(37312);
  const [productInfo, setproductInfo] = useState({});

  // axios.get('/products/:product_id', {
  //   params: {
  //     product_id: productId
  //   }
  // })
  // .then((res) => {
  //   console.log('product info: ', res);
  //   setproductInfo(res.data);
  // })
  // .catch((err) => {
  //   console.log('failed to retrieve product info', err);
  // })

  return (
    <div>
      <Overview />
      {/* <RelatedItems productId={productId} productInfo={productInfo}/> */}
      <QA />
      <RnR />
    </div>
  );
};

export default App;
