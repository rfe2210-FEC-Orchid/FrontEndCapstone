import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Overview from './Overview/Overview.jsx';
import RnR from './RatingsAndReviews/RnR.jsx';
import RelatedItems from './RelatedItemsAndComparison/RelatedItems.jsx';
import QA from './QuestionsAndAnswers/QA.jsx';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Nunito Sans, sans-serif, Daniel;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: white;
  z-index: 5;
  font-family: Daniel;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F2F2F2;

  h1 {
    margin-bottom: 0;
    font-size: 40px;
    display: block;
    background: -webkit-linear-gradient(45deg, #4F0B40, #cc5ca8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

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
      <GlobalStyle />
      <Header>
        <h1>Orchid</h1>
      </Header>
      <Overview product_id={productId}/>
      <RelatedItems productId={productId} setproductId={setproductId} productInfo={productInfo} setproductInfo={setproductInfo} />
      <QA />
      <RnR productID={productId} productName={productInfo.name} id=""/>
    </div>
  );
};

export default App;
