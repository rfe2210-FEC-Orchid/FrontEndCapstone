import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SizeOption = styled.div`
  display: inline-block;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  margin: 5px;
  padding: 2px;
  background-color: #f2f2f2;
  border: ${props => props.selected ? '1.5px solid #4F0B40' : '1.5px solid white'};

  &:hover {
    cursor: pointer;
    border: 1.5px solid #4F0B40;
    background-color: #f2f2f2;
  }
`;


const SizeSelector = (props) => {


  return (
    <div>
      {props.skus
      ? Object.keys(props.skus).filter((sku) => props.skus[sku].quantity > 0).map((sku) =>
        <SizeOption
          data-testid='size-option'
          onClick={(e) => {
            props.handleSelectSize(sku, props.skus[sku].size, props.skus[sku].quantity);
            props.handleTrack(e, 'SizeSelector');
          }}
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