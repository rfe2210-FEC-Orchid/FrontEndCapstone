import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CartContainer = styled.div`
  margin: 10px 5px;
`;

const QuantityDropdown = styled.select`
  display: inline-block;
  height: 40px;
  width: 30%;
  margin-right: 3px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const QuantityOption = styled.option`

`;

const CartButton = styled.button`
  height: 40px;
  width: 65%;
  border: 1px solid black;

  &:hover {
    cursor: pointer;
  }
`;


const AddToCart = (props) => {

  // functions
  const handleAddToCart = (e) => {
    e.preventDefault();
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
    <CartContainer>
      <QuantityDropdown onChange={(e) => props.handleChangeQuantity(e.target.value)}>
        {props.options.selectedSize
        ? quantityArray(props.options.availableQuantity).map((num) =>
            <QuantityOption key={num} value={num}>{num}</QuantityOption>
          )
        : <option> -- </option>
        }
      </QuantityDropdown>
      <CartButton onClick={handleAddToCart}>Add To Cart</CartButton>
    </CartContainer>
  );
};

export default AddToCart;