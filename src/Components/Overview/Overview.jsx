import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductRating from './ProductRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductStyle from './ProductStyle.jsx';
import ProductShare from './ProductShare.jsx';
import ProductDescription from './ProductDescription.jsx';
import axios from 'axios';
import styled from 'styled-components';

const staticData = {product_id: 37315};

const UpperContentContainer = styled.div`
  position: relative;
  margin: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const UpperColumnContainerLeft = styled.div`
  margin: 10px;
`;

const UpperColumnContainerRight = styled.div`
  margin: 10px;
  width: 320px;
  min-width: 200px;
`;

const Overview = (props) => {

  // state
  const [selectedStyle, setSelectedStyle] = useState({});
  const [allStyles, setAllStyles] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:3001/products/${staticData.product_id}/styles`),
      axios.get(`http://localhost:3001/products/${staticData.product_id}`)
    ])
      .catch((err) => {
        console.log('error fetching data from API:', err);
      })
      .then(axios.spread((styles, info) => {
        console.log('received data from API');
        setSelectedStyle(styles.data.results[0]);
        setAllStyles(styles.data.results);
        setProductInfo(info.data);
      }))
  }, []);

  // functions
  const handleSelectStyle = (style) => {
    setSelectedStyle(style);
  };

  return (
    <div>
      <UpperContentContainer>
        <UpperColumnContainerLeft>{selectedStyle.photos && <ImageGallery photos={selectedStyle.photos}/>}</UpperColumnContainerLeft>
        <UpperColumnContainerRight>
          <ProductRating productID={staticData.product_id}/>
          <ProductInfo name={productInfo.name} category={productInfo.category}/>
          <ProductStyle selectedStyle={selectedStyle} allStyles={allStyles} handleSelectStyle={handleSelectStyle}/>
          <ProductShare />
        </UpperColumnContainerRight>
      </UpperContentContainer>
      <ProductDescription slogan={productInfo.slogan} description={productInfo.description} features={productInfo.features}/>
    </div>
  );
};

export default Overview;