import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyleSelector from './StyleSelector.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddToCart from './AddToCart.jsx';


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
      <div>
        {props.selectedStyle.sale_price
        ? <p>$<s>{props.selectedStyle.original_price}</s> {props.selectedStyle.sale_price}</p>
        : <p>${props.selectedStyle.original_price}</p>
        }
        <p><b>Style > </b>{props.selectedStyle.name}</p>
      </div>
      <StyleSelector styles={props.allStyles} handleChangeStyle={handleChangeStyle}/>
      <SizeSelector skus={props.selectedStyle.skus} handleSelectSize={handleSelectSize}/>
      <AddToCart options={options} handleChangeQuantity={handleChangeQuantity}/>
    </div>
  );
};

export default ProductStyle;