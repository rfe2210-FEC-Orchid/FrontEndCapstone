import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddToCart from './AddToCart.jsx';
import styled from 'styled-components';

const PriceContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid black;
`;

const ProductStyle = (props) => {

  // state
  const [options, setOptions] = useState({
    sku_id: null,
    selectedSize: null,
    selectedQuantity: null,
    availableQuantity: null
  });

  useEffect(() => {
    console.log('options updated:', options);
  }, [options]);

  // functions
  const handleSelectSize = (sku_id, selectedSize, availableQuantity) => {
    setOptions({
      sku_id,
      selectedSize,
      availableQuantity,
      selectedQuantity: options.selectedQuantity || 1
    });
  };

  const handleChangeQuantity = (selectedQuantity) => {
    console.log('changing quantity');
    setOptions({
      ...options,
      selectedQuantity
    });
  };

  const handleChangeStyle = (style) => {
    // console.log('new style:', style);
    // // find a way to update sku when style is changed after size is selected (i.e. retain size/qty selection)
    // let currentSelectedSize = options.selectedSize;
    // let newSku;

    // if (currentSelectedSize) {
    //   // iterate through the style object, looking for the same size
    // }

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
        ? <p>$<s>{props.selectedStyle.original_price}</s> {props.selectedStyle.sale_price}</p>
        : <p>${props.selectedStyle.original_price}</p>
        }
      </PriceContainer>
      <p><b>Style > </b>{props.selectedStyle.name}</p>
      <StyleSelector styles={props.allStyles} selectedStyleID={props.selectedStyle.style_id} handleChangeStyle={handleChangeStyle}/>
      <SizeSelector skus={props.selectedStyle.skus} options={options} handleSelectSize={handleSelectSize}/>
      <AddToCart options={options} handleChangeQuantity={handleChangeQuantity}/>
    </div>
  );
};

export default ProductStyle;