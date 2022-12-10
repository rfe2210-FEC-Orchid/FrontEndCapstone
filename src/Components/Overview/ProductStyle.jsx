import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddToCart from './AddToCart.jsx';
import styled from 'styled-components';

const PriceContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid #4F0B40;
`;

const ProductStyle = (props) => {

  // state
  const [options, setOptions] = useState({
    sku_id: null,
    selectedSize: null,
    selectedQuantity: null,
    availableQuantity: null
  });

  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
  }, [options]);

  // functions
  const handleSelectSize = (sku_id, selectedSize, availableQuantity) => {
    if (displayError) {
      setDisplayError(false);
    }

    setOptions({
      sku_id,
      selectedSize,
      availableQuantity,
      selectedQuantity: options.selectedQuantity || 1
    });
  };

  const handleChangeQuantity = (selectedQuantity) => {
    setOptions({
      ...options,
      selectedQuantity
    });
  };

  const handleChangeStyle = (style) => {

    props.handleSelectStyle(style);
    setOptions({
      sku_id: null,
      selectedSize: null,
      availableQuantity: null,
      selectedQuantity: null
    });
  };

  return (
    <div>
      <PriceContainer>
        {props.selectedStyle.sale_price
        ? <p><s style={{color: '#9c0303'}}>${props.selectedStyle.original_price}</s> ${props.selectedStyle.sale_price}</p>
        : <p>${props.selectedStyle.original_price}</p>
        }
      </PriceContainer>
      <p><b>Style > </b>{props.selectedStyle.name}</p>
      <StyleSelector styles={props.allStyles} selectedStyleID={props.selectedStyle.style_id} handleChangeStyle={handleChangeStyle}/>
      <SizeSelector skus={props.selectedStyle.skus} options={options} handleSelectSize={handleSelectSize}/>
      <AddToCart options={options} handleChangeQuantity={handleChangeQuantity} displayError={displayError} setDisplayError={setDisplayError}/>
    </div>
  );
};

export default ProductStyle;