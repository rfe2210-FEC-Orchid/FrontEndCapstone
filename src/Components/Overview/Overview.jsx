import React, { useState } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductRating from './ProductRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductStyle from './ProductStyle.jsx';
import ProductShare from './ProductShare.jsx';
import ProductDescription from './ProductDescription.jsx';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  position: relative;
  top: 130px;
  display: flex;
  flex-direction: column;
`;

const UpperContentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const UpperColumnContainerLeft = styled.div`
  margin: 10px;
  width: ${props => props.showExpandedImage ? 'calc(70% + 340px)' : '70%'};
`;

const UpperColumnContainerRight = styled.div`
  margin: 10px;
  width: 320px;
  min-width: 200px;
`;

const LowerContentContainer = styled.div`
  position: relative;
  width:100%;
`;

const Overview = (props) => {

  const [showExpandedImage, setShowExpandedImage] = useState(false);

  return (
    <OverviewContainer id="overview">
      <UpperContentContainer>
        <UpperColumnContainerLeft showExpandedImage={showExpandedImage}>
          {props.selectedStyle.photos && <ImageGallery
            photos={props.selectedStyle.photos}
            showExpandedImage={showExpandedImage}
            setShowExpandedImage={setShowExpandedImage}/>}
        </UpperColumnContainerLeft>
        {!showExpandedImage && <UpperColumnContainerRight>
          <ProductRating productID={props.product_id}/>
          <ProductInfo name={props.productInfo.name} category={props.productInfo.category}/>
          <ProductStyle selectedStyle={props.selectedStyle} allStyles={props.allStyles} handleSelectStyle={props.setSelectedStyle}/>
          <ProductShare />
        </UpperColumnContainerRight>}
      </UpperContentContainer>
      <LowerContentContainer>
        <ProductDescription slogan={props.productInfo.slogan} description={props.productInfo.description} features={props.productInfo.features}/>
      </LowerContentContainer>
    </OverviewContainer>
  )}

export default Overview;