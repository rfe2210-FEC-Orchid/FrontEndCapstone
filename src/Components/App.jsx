import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Overview from './Overview/Overview.jsx';
import RnR from './RatingsAndReviews/RnR.jsx';
import RelatedItems from './RelatedItemsAndComparison/RelatedItems.jsx';
import QA from './QuestionsAndAnswers/QA.jsx';
import {UserContext} from './UserContext.jsx';

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
  const [productId, setProductId] = useState(37319);
  const [productInfo, setProductInfo] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  const [allStyles, setAllStyles] = useState([]);
  const [trackData, setTrackData] = useState([]); //for user tracking
  const userTrackData = useMemo(() => ({trackData, setTrackData}), [trackData, setTrackData]); //for user tracking

  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:3001/products/${productId}/styles`),
      axios.get(`http://localhost:3001/products/${productId}`)
    ])
      .catch((err) => {
        console.log('error fetching data from API:', err);
      })
      .then(axios.spread((styles, info) => {
        setSelectedStyle(styles.data.results[0]);
        setAllStyles(styles.data.results);
        setProductInfo(info.data);
      }))
  }, [productId]);

  const handleTrack = (evt, moduleName) => { // for user tracking
      const newData = "Module: " + moduleName + " | Element: " + evt.target.dataset.name + " | " + Date().toString();
      setTrackData([...trackData, newData])
  }

  return (
    <UserContext.Provider value={userTrackData}>
      <GlobalStyle />
      <Header>
        <h1>Orchid</h1>
      </Header>
      <Overview allStyles={allStyles} selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} productInfo={productInfo} product_id={productId}/>
      <RelatedItems productId={productId} setproductId={setProductId} productInfo={productInfo} selectedStyle={selectedStyle} />
      <QA productId={productId} productName={productInfo.name} />
      <RnR productID={productId} productName={productInfo.name} handleTrack={handleTrack}/>
    </UserContext.Provider>
  );
};

export default App;
