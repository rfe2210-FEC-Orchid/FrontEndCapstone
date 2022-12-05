import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductRating from './ProductRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductStyle from './ProductStyle.jsx';
import ProductShare from './ProductShare.jsx';
import ProductDescription from './ProductDescription.jsx';
import axios from 'axios';
import styled from 'styled-components';

const staticData = {product_id: 37311};

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
        // console.log('styles:', styles.data);
        // console.log('info:', info.data);
        setSelectedStyle(styles.data.results[0]);
        setAllStyles(styles.data.results);
        setProductInfo(info.data);
      }))
  }, []);

  // functions

  // pass to product style, allows a new style to be selected, updates selectedStyle
  const handleSelectStyle = () => {

  };

  return (
    <div>
      this is the overview widget!
      <div>
        <ImageGallery photos={selectedStyle.photos}/>
        <div>
          <ProductRating productID={staticData.product_id}/>
          <ProductInfo name={productInfo.name} category={productInfo.category}/>
          <ProductStyle selectedStyle={selectedStyle} allStyles={allStyles} handleSelectStyle={handleSelectStyle}/>
          <ProductShare />
        </div>
      </div>
      <ProductDescription slogan={productInfo.slogan} description={productInfo.description} features={productInfo.features}/>
    </div>
  );
};

export default Overview;