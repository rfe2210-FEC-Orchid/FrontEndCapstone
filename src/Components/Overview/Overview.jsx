import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductRating from './ProductRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductStyle from './ProductStyle.jsx';
import ProductShare from './ProductShare.jsx';
import ProductDescription from './ProductDescription.jsx';
import axios from 'axios';
import styled from 'styled-components';

const UpperContentContainer = styled.div`
  position: relative;
  top: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const UpperColumnContainerLeft = styled.div`
  margin: 10px;
  width: 70%;
`;

const UpperColumnContainerRight = styled.div`
  margin: 10px;
  width: 320px;
  min-width: 200px;
`;

const Overview = (props) => {

  // state
  // const [selectedStyle, setSelectedStyle] = useState({});
  // const [allStyles, setAllStyles] = useState([]);
  // const [productInfo, setProductInfo] = useState({});

  // useEffect(() => {
  //   axios.all([
  //     axios.get(`http://localhost:3001/products/${props.product_id}/styles`),
  //     axios.get(`http://localhost:3001/products/${props.product_id}`)
  //   ])
  //     .catch((err) => {
  //       console.log('error fetching data from API:', err);
  //     })
  //     .then(axios.spread((styles, info) => {
  //       console.log('received data from API');
  //       props.setSelectedStyle(styles.data.results[0]);
  //       setAllStyles(styles.data.results);
  //       setProductInfo(info.data);
  //     }))
  // }, []);

  return (
    <div>
        <UpperContentContainer>
        <UpperColumnContainerLeft>{props.selectedStyle.photos && <ImageGallery photos={props.selectedStyle.photos}/>}</UpperColumnContainerLeft>
        <UpperColumnContainerRight>
          <ProductRating productID={props.product_id}/>
          <ProductInfo name={props.productInfo.name} category={props.productInfo.category}/>
          <ProductStyle selectedStyle={props.selectedStyle} allStyles={props.allStyles} handleSelectStyle={props.setSelectedStyle}/>
          <ProductShare />
        </UpperColumnContainerRight>
      </UpperContentContainer>
      <ProductDescription slogan={props.productInfo.slogan} description={props.productInfo.description} features={props.productInfo.features}/>
    </div>
  )}

export default Overview;