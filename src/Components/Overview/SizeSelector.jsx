import React, { useState, useEffect } from 'react';

const SizeSelector = (props) => {

  return (
    <div>
      {props.skus
      ? Object.keys(props.skus).filter((sku) => props.skus[sku].quantity > 0).map((sku) =>
        <button
          onClick={() => props.handleSelectSize(sku, props.skus[sku].size, props.skus[sku].quantity)}
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