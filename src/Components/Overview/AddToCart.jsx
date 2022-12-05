import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToCart = (props) => {

  // functions
  const handleAddToCart = () => {
    let quantity = props.options.selectedQuantity;
    let sku_id = props.options.sku_id;

    for (let i = 0; i < quantity; i++) {
      console.log('sending post to cart:', i);
      axios.post(`http://localhost:3001/cart`, { sku_id });
    }
  };

  const quantityArray = (quantity) => {
    let result = [];
    quantity = (quantity > 15) ? 15 : quantity;

    for (let i = 1; i <= quantity; i++) {
      result.push(i);
    }

    return result;
  }

  return (
    <div>
      <select onChange={(e) => props.handleChangeQuantity(e.target.value)}>
        {props.options.selectedSize
        ? quantityArray(props.options.availableQuantity).map((num) =>
            <option key={num} value={num}>{num}</option>
          )
        : <option> -- </option>
        }
      </select>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
};

export default AddToCart;