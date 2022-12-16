import React, { useState } from 'react';
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
  border: 1.5px solid black;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const QuantityOption = styled.option`

`;

const CartButton = styled.button`
  height: 40px;
  width: 65%;
  border: none;
  background-color: #4f0b40;
  color: white;
  border: 1.5px solid black;

  &:hover {
    background-color: #800f67;
    cursor: pointer;
  }
`;

const ErrorContainer = styled.div`
  display: inline-block;
  height: 40px;
  margin: 0;
  width: 100%;
  color: white;
  background-color: #9c0303;
  line-height: 40px;
  text-align: center;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
`;

const ConfirmationContainer = styled.div`
  display: inline-block;
  min-height: 40px;
  margin: 0;
  width: 100%;
  color: white;
  background-color: #014A04;
  line-height: 40px;
  text-align: center;

  visibility: ${props => props.active ? 'visible' : 'hidden'};

`;

const MessageContainer = styled.div`
  height: 40px;
  margin: 5px 0;
  width: calc(95% + 3px);
`;

const AddToCart = (props) => {

  const [confirmation, setConfirmation] = useState(false);

  // functions
  const handleAddToCart = (e) => {
    if (!props.options.sku_id) {
      props.setDisplayError(true);
    } else {
      setConfirmation(true);
      setTimeout(() => {setConfirmation(false)}, 2500);
      let quantity = props.options.selectedQuantity;
      let sku_id = props.options.sku_id;

      for (let i = 0; i < quantity; i++) {
        axios.post(`http://localhost:3001/cart`, { sku_id });
    }
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
      <MessageContainer>
        {props.displayError && <ErrorContainer active={props.displayError}>please select a size</ErrorContainer>}
        {confirmation && <ConfirmationContainer active={confirmation}>Item added to cart!</ConfirmationContainer>}
      </MessageContainer>
      <QuantityDropdown data-testid='quantity-dropdown' onChange={(e) => {
        props.handleChangeQuantity(e.target.value);
        props.handleTrack(e, 'AddToCart')
      }}>
        {props.options.selectedSize
        ? quantityArray(props.options.availableQuantity).map((num) =>
            <QuantityOption key={num} value={num}>{num}</QuantityOption>
          )
        : <option> -- </option>
        }
      </QuantityDropdown>
      <CartButton data-testid='cart-button' onClick={(e) => {
        handleAddToCart();
        props.handleTrack(e, 'AddToCart');
      }}>Add To Cart</CartButton>
    </CartContainer>
  );
};

export default AddToCart;