import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SizeOption = styled.div`
  display: inline-block;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border: 2px solid black;
  margin: 5px;
  background-color: ${props => props.selected ? 'black' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};

  &:hover {
    cursor: pointer;
  }
`;

const SizeSelector = (props) => {

  return (
    <div>
      {props.skus
      ? Object.keys(props.skus).filter((sku) => props.skus[sku].quantity > 0).map((sku) =>
        <SizeOption
          onClick={() => props.handleSelectSize(sku, props.skus[sku].size, props.skus[sku].quantity)}
          selected={props.options.sku_id === sku}
          key={sku}
        >
          {props.skus[sku].size}
        </SizeOption>)
      : <p>OUT OF STOCK</p>
      }
    </div>
  );
};

export default SizeSelector;