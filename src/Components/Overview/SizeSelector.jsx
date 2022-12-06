import React, { useState, useEffect } from 'react';

const SizeSelector = (props) => {



  return (
    <div>
      {props.skus
      ? Object.keys(props.skus).filter((sku) => props.skus[sku].quantity > 0).map((sku) =>
        <button
          onClick={() => props.handleSelectSize(sku, props.skus[sku].size, props.skus[sku].quantity)}
          style={{backgroundColor: sku === props.options.sku_id ? 'grey' : '#f0f0f0'}}
          key={sku}
        >
          {props.skus[sku].size}
        </button>)
      : <p>OUT OF STOCK</p>
      }
    </div>
  );
};

export default SizeSelector;